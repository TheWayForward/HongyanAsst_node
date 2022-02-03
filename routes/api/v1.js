const express = require("express");
const router = express.Router();
const db = require("../../database/database");
const fs = require("fs");
const path = require("path");
const MessageHelper = require("../../utils/message_helper");
const Jwt = require('../../utils/jwt');
const SQL = require("../../database/sql");

router.get("/test", (req, res) => {
    res.json({
        code: 200,
        msg: "response from node_hongyanasst"
    });
});

router.post('/login', (req, res) => {

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
                        msg: MessageHelper.internal_error
                    });
                } else if (!result.length) {
                    res.status(204).send({
                        msg: MessageHelper.login_failed,
                        info: result[0]
                    });
                } else {
                    let jwt = new Jwt(result[0].id);
                    res.status(200).send({
                        code: 200,
                        token: jwt.generateToken(),
                        msg: MessageHelper.login_success_username,
                        info: result[0]
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
                        msg: MessageHelper.internal_error
                    });
                } else if (!result.length) {
                    res.status(204).send({
                        msg: MessageHelper.login_failed,
                        info: result[0]
                    });
                } else {
                    let jwt = new Jwt(result[0].id);
                    res.status(200).send({
                        code: 200,
                        token: jwt.generateToken(),
                        msg: MessageHelper.login_success_tel,
                        info: result[0]
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
                        msg: MessageHelper.internal_error
                    });
                } else if (!result.length) {
                    res.status(204).send({
                        msg: MessageHelper.login_failed,
                        info: result[0]
                    });
                } else {
                    let jwt = new Jwt(result[0].id);
                    res.status(200).send({
                        code: 200,
                        token: jwt.generateToken(),
                        msg: MessageHelper.login_success_tel,
                        info: result[0]
                    });
                }
            });
            break;
    }


});


module.exports = router;