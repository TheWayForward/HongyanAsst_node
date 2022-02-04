let generate_digit_captcha = () => {
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += Math.floor(Math.random() * 10);
    }
    return captcha;
};

module.exports = {
    generate_digit_captcha
}