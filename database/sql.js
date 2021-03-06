let sql_username_login = (username, password) => `SELECT * FROM user WHERE username = "${username}" AND password = "${password}" AND valid = 1`;
let sql_tel_login = (tel, password) => `SELECT * FROM user WHERE tel = "${tel}" AND password = "${password}" AND valid = 1`;
let sql_email_login = (email, password) => `SELECT * FROM user WHERE email = "${email}" AND password = "${password}" AND valid = 1`;

let sql_select_phone_captcha = (tel, content) => {
    return `SELECT * FROM captcha WHERE send_to = "phone" AND tel = "${tel}" AND content = "${content}" ORDER BY timestamp DESC`;
};
let sql_select_email_captcha = (email, content) => {
    return `SELECT * FROM captcha WHERE send_to = "email" AND email = "${email}" AND content = "${content}" ORDER BY timestamp DESC`;
};

let sql_get_by_id = (id, table_name) => `SELECT * FROM ${table_name} WHERE id = ${id} AND valid = 1`;

let sql_get_table_count = (table_name) => `SELECT COUNT(*) as count FROM ${table_name}`;

let sql_insert_captcha = `INSERT INTO captcha (id, send_to, content, tel, email) VALUES (?,?,?,?,?)`;
let sql_insert_user = `INSERT INTO user (id, username, nickname, email, tel, password) VALUES (?,?,?,?,?,?)`;

let sql_update_user_avatar = (path, id) => `UPDATE user SET avatar = "${path}" WHERE user.id = ${id}`;

module.exports = {
    sql_username_login,
    sql_tel_login,
    sql_email_login,

    sql_select_phone_captcha,
    sql_select_email_captcha,

    sql_get_by_id,

    sql_get_table_count,

    sql_insert_captcha,
    sql_insert_user,

    sql_update_user_avatar
};