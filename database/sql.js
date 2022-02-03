let sql_username_login = (username, password) => `SELECT * FROM user WHERE username = "${username}" AND password = "${password}"`;
let sql_tel_login = (tel, password) => `SELECT * FROM user WHERE tel = "${tel}" AND password = "${password}"`;
let sql_email_login = (email, password) => `SELECT * FROM user WHERE email = "${email}" AND password = "${password}"`;

module.exports = {
    sql_username_login,
    sql_tel_login,
    sql_email_login
};