const express = require("express");
const router = express.Router();
const db = require("../../database/database");
const fs = require("fs");
const path = require("path");
const message_helper = require("../../utils/message_helper");
const Jwt = require('../../utils/jwt');

router.get("/test", (req, res) => {
    res.json({
        code: 200,
        msg: "response from node_hongyanasst"
    });
});

router.post('/login',(req,res) => {

    let username = req.body.user;
    let password = req.body.password;
    // mock userid
    let user_id = 2;

    let jwt = new Jwt(user_id.toString());

    let token = jwt.generateToken();

    console.log(token);
    res.send({
        code: 200,
        msg: "Login succeed.",
        token: token,
        user: {}
    });
});


module.exports = router;