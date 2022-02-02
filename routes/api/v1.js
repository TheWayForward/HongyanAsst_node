var express = require("express");
var router = express.Router();
var db = require("../../database/database");
var fs = require("fs");
var path = require("path");
var message_helper = require("../../utils/message_helper");

router.get("/test", (req, res) => {
    res.json({
        code: 200,
        "msg": "response from node_hongyanasst"
    });
});

// test


module.exports = router;