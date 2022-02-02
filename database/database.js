var mysql = require("mysql");
var config = require("../config");

const db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true
})

db.connect();

module.exports = db;
