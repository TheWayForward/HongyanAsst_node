const Core = require('@alicloud/pop-core');

module.exports = {
    host: "127.0.0.1",
    port: 8000,
    mail_account: "951947409@qq.com",
    protocol: "http://",
    user: "root",
    password: "",
    database: "hongyanasst",
    secret: "123456",
    // 1 minute
    max_age: 1000 * 60,
    auth_token: "ZmEtMjAyMS0wNC0xMiAyMToyMjoyMC1mYQ==fa",
    app_flag: "hy",
    ali_access_key: "LTAI4GDDJ9d8PSMJ1xsV3HQF",
    ali_access_secret: "WhyuhEltyQHDi1HnGnbuioktjzLmOm",

    // node mailer
    mailer_host: "smtp.qq.com",
    mailer_service: "qq",
    mailer_secure: true,
    mailer_auth: {
        user: "951947409@qq.com",
        pass: "vjzofxnmtkxrbccb"
    },

    // ali service
    ali_core_params: {
        accessKeyId: 'LTAI4GDDJ9d8PSMJ1xsV3HQF',
        accessKeySecret: 'WhyuhEltyQHDi1HnGnbuioktjzLmOm',
        endpoint: 'https://dysmsapi.aliyuncs.com',
        apiVersion: '2017-05-25'
    },

    tel_vcode_params: (tel, vcode) => {
        return {
            "RegionId": "cn-hangzhou",
            "PhoneNumbers": tel,
            "SignName": "北邮鸿雁车协",
            "TemplateCode": "SMS_209815001",
            "TemplateParam": vcode
        }
    }
}