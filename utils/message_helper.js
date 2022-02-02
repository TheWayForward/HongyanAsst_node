// server
const internal_error = "操作失敗，內部錯誤！";
const timeout = "請求超時，請刷新重試！";
const success = "操作成功！";
const duplication = "內容重複！";
const type_undefined = "未指定內容類型！";

// login
const login_success_username = "登录成功！（类型：用户名）";
const login_success_tel = "登录成功！（类型：手机号码）";
const login_success_email = "登录成功！（类型：email）";
const login_failed = "您输入的信息有误，登录失败！";
const login_unauthorized = "非校验登录方式！";
const log_out_success = "登出成功！";
const log_out_unauthorized = "非法登出操作！"

// upload
const image_url_upload_success = "图片链接上传成功！";
const image_upload_success = "图片上传成功！";

// user register
const user_register_duplication = "用户名、手机或email不可重复注册，请重试！";
const user_register_success = "注册成功！";

// device
const device_unauthorized = "非法获取设备信息！";
const device_empty = "尚无设备！";

// verification
const image_url_duplication = "图片链接已存在！";


module.exports = {
    internal_error: internal_error,
    timeout: timeout,
    success: success,
    duplication: duplication,
    type_undefined: type_undefined,
    
    login_success_username: login_success_username,
    login_success_tel: login_success_tel,
    login_success_email: login_success_email,
    login_failed: login_failed,
    login_unauthorized: login_unauthorized,
    log_out_success: log_out_success,
    log_out_unauthorized: log_out_unauthorized,

    image_url_upload_success: image_url_upload_success,
    image_upload_success: image_upload_success,

    user_register_duplication: user_register_duplication,
    user_register_success: user_register_success,

    device_unauthorized: device_unauthorized,
    device_empty: device_empty,

    image_url_duplication: image_url_duplication
}