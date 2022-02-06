const express = require("express");
const router = express.Router();
const db = require("../../database/database");
const fs = require("fs");
const path = require("path");
const multiparty = require("multiparty");

const Config = require("../../config");
const Jwt = require('../../utils/jwt_helper');
const SQL = require("../../database/sql");
const Core = require("@alicloud/pop-core");

const MessageHelper = require("../../utils/message_helper");
const VerificationHelper = require("../../utils/verification_helper");
const TimeHelper = require("../../utils/time_helper");
const StringHelper = require("../../utils/string_helper");
const EmailHelper = require("../../utils/email_helper");

router.get("/test", (req, res) => {
    if (Jwt.verifyToken(req)) {
        res.status(200).json({
            code: 200,
            message: "response from node_hongyanasst"
        });
    } else {
        res.status(401).json({
            code: 401,
            message: MessageHelper.login_unauthorized
        });
    }
});

router.post("/send_phone_captcha", async (req, res) => {
    if (req.headers["auth-token"] !== Config.auth_token || req.headers["app-flag"] !== Config.app_flag) {
        res.status(401).send({
            code: 401,
            message: MessageHelper.login_unauthorized
        });
    }
    let tel = req.body.tel;
    let code = VerificationHelper.generate_digit_captcha();
    let vcode = `{"code":"${code}"}`;
    let client = new Core({
        accessKeyId: 'LTAI4GDDJ9d8PSMJ1xsV3HQF',
        accessKeySecret: 'WhyuhEltyQHDi1HnGnbuioktjzLmOm',
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
    });

    let vcode_params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers": tel,
        "SignName": "北邮鸿雁车协",
        "TemplateCode": "SMS_209815001",
        "TemplateParam": vcode
    };

    let response = await client.request('SendSms', vcode_params, {
        method: 'POST'
    }).then((result) => {
        // successfully sent
        db.query(SQL.sql_get_table_count("captcha"), (err, result, fields) => {
            if (err) {
                console.log("/send_phone_captcha error");
                res.status(500).send({
                    code: 500,
                    message: MessageHelper.internal_error
                });
            } else {
                console.log(result);
                let id = result[0]["count"] + 1;
                let send_to = "phone";
                let content = code;
                let email = "";
                let sql_params = [id, send_to, content, tel, email];
                db.query(SQL.sql_insert_captcha, sql_params, (err, result, fields) => {
                    if (err) {
                        console.log("/send_phone_captcha error");
                        console.log(err);
                        res.status(500).send({
                            code: 500,
                            message: MessageHelper.internal_error
                        });
                    } else {
                        res.status(200).send({
                            code: 200,
                            message: MessageHelper.captcha_sent
                        });
                    }
                });
            }
        })
    }, (e) => {
        res.status(502).send({
            code: 502,
            message: MessageHelper.captcha_send_exception
        });
    })

});

router.post('/verify_phone_captcha', (req, res) => {
    if (req.headers["auth-token"] !== Config.auth_token || req.headers["app-flag"] !== Config.app_flag) {
        res.status(401).send({
            code: 401,
            message: MessageHelper.login_unauthorized
        });
    }

    let send_to = req.body.send_to;
    let tel = req.body.tel;
    let content = req.body.content;

    let sql = `SELECT * FROM captcha WHERE send_to = "${send_to}" AND tel = "${tel}" AND content = "${content}" ORDER BY timestamp DESC`;
    db.query(sql, (err, result, fields) => {
        if (err) {
            console.log("vefify_phone_captcha error");
            console.log(err);
            res.status(500).send({
                code: 500,
                message: MessageHelper.internal_error
            });
        } else if (!result.length) {
            res.status(200).send({
                code: 204,
                message: MessageHelper.captcha_illegal
            });
        } else {
            if (TimeHelper.captcha_expire(result[0].timestamp)) {
                // captcha expired
                res.status(200).send({
                    code: 204,
                    message: MessageHelper.captcha_illegal
                });
            } else {
                // verified
                res.status(200).send({
                    code: 200,
                    message: MessageHelper.captcha_verified,
                });
            }
        }
    });
});

router.post("/register", (req, res) => {
    if (req.headers["auth-token"] !== Config.auth_token || req.headers["app-flag"] !== Config.app_flag) {
        res.status(401).send({
            code: 401,
            message: MessageHelper.login_unauthorized
        });
    }

    let nickname = req.body.nickname;
    let password = req.body.password;
    let tel = req.body.tel;
    let email = req.body.email;
    let from_client = req.body.from_client;

    db.query(SQL.sql_get_table_count("user"), (err, result, fields) => {
        if (err) {
            console.log("/register error");
            res.send({
                code: 500,
                message: MessageHelper.internal_error
            });
        } else {
            let id = result[0]["count"] + 1;
            let username = from_client + id;
            let sql_params = [id, username, nickname, email, tel, password];
            db.query(SQL.sql_insert_user, sql_params, (err, result, fields) => {
                if (err) {
                    console.log("/register error");
                    console.log(err);
                    res.status(200).send({
                        code: 204,
                        message: MessageHelper.user_register_duplication
                    });
                } else {
                    res.status(200).send({
                        code: 200,
                        message: MessageHelper.user_register_success
                    })
                }
            });
        }
    });
});

router.post("/login", (req, res) => {
    if (req.headers["auth-token"] !== Config.auth_token || req.headers["app-flag"] !== Config.app_flag) {
        res.status(401).send({
            code: 401,
            message: MessageHelper.login_unauthorized
        });
    }

    let username = req.body.username;
    let password = req.body.password;
    let type = req.body.type;

    switch (type) {
        case "username":
            db.query(SQL.sql_username_login(username, password), (err, result, fields) => {
                if (err) {
                    console.log(err);
                    console.log("/login error");
                    res.status(500).send({
                        code: 500,
                        message: MessageHelper.internal_error
                    });
                } else if (!result.length) {
                    res.status(204).send({
                        message: MessageHelper.login_failed,
                        data: result[0]
                    });
                } else {
                    let jwt = new Jwt(result[0].id);
                    res.status(200).send({
                        code: 200,
                        token: jwt.generateToken(),
                        message: MessageHelper.login_success_username,
                        data: result[0]
                    });
                }
            });
            break;
        case "tel":
            db.query(SQL.sql_tel_login(username, password), (err, result, fields) => {
                if (err) {
                    console.log(err);
                    console.log("/login error");
                    res.status(500).send({
                        code: 500,
                        message: MessageHelper.internal_error
                    });
                } else if (!result.length) {
                    res.status(204).send({
                        message: MessageHelper.login_failed,
                        data: result[0]
                    });
                } else {
                    let jwt = new Jwt(result[0].id);
                    console.log(result[0]);
                    res.status(200).send({
                        code: 200,
                        token: jwt.generateToken(),
                        message: MessageHelper.login_success_tel,
                        data: result[0]
                    });
                }
            });
            break;
        case "email":
            db.query(SQL.sql_email_login(username, password), (err, result, fields) => {
                if (err) {
                    console.log(err);
                    console.log("/login error");
                    res.status(500).send({
                        code: 500,
                        message: MessageHelper.internal_error
                    });
                } else if (!result.length) {
                    res.status(204).send({
                        message: MessageHelper.login_failed,
                        data: result[0]
                    });
                } else {
                    let jwt = new Jwt(result[0].id);
                    res.status(200).send({
                        code: 200,
                        token: jwt.generateToken(),
                        message: MessageHelper.login_success_tel,
                        data: result[0]
                    });
                }
            });
            break;
    }
});

router.post("/upload_avatar", (req, res) => {
    if (Jwt.verifyToken(req)) {
        let form = new multiparty.Form();
        let URL = "images/avatar";
        form.uploadDir = `public/${URL}`;
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.status(500).send({
                    code: 500,
                    message: MessageHelper.internal_error
                });
            }
            let path = StringHelper.directory_revision("/" + files.file[0].path);
            // save path to database
            let id = fields.id[0];
            db.query(SQL.sql_update_user_avatar(path, id), (err, result, fields) => {
                if (err) {
                    console.log("/upload_avatar error");
                    res.status(500).send({
                        code: 500,
                        message: MessageHelper.internal_error
                    });
                } else {
                    res.status(200).send({code: 200, message: MessageHelper.image_upload_success, path: path});
                }
            });
        });
    } else {
        res.status(401).json({
            code: 401,
            message: MessageHelper.login_unauthorized
        });
    }
});

router.post("/get_homepage_data", (req, res) => {
    if (Jwt.verifyToken(req)) {
        let sql = `SELECT * FROM banner WHERE valid = 1; SELECT * FROM banner WHERE valid = 1;`;
        db.query(sql, (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    code: 500,
                    message: MessageHelper.internal_error
                });
            } else {
                console.log(result[0]);
                res.status(200).send({code: 200, message: "success"});
            }
        });
    } else {
        res.status(401).json({
            code: 401,
            message: MessageHelper.login_unauthorized
        });
    }
});

router.post("/get_user_data_by_id", (req, res) => {
    if (Jwt.verifyToken(req)) {
        let id = req.body.id;
        db.query(SQL.sql_get_by_id(id, "user"), (err, result, fields) => {
            if (err) {
                console.log("/get_user_data_by_id error");
                res.status(500).send({
                    code: 500,
                    message: MessageHelper.internal_error
                });
            } else {
                res.status(200).send({
                    code: 200,
                    data: result[0]
                });
            }
        });
    } else {
        res.status(401).json({
            code: 401,
            message: MessageHelper.login_unauthorized
        });
    }
});

router.post("/get_")

module.exports = router;