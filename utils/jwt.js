const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const secret = "TrWyFowrd";
const expire_time = 60 * 60 * 24 * 10;

class Jwt {
    constructor(data) {
        this.data = data;
    }

    generateToken() {
        let token = jwt.sign(this.data, secret);
        return token;
    }

    verifyToken(req, res, next) {
        let token = req.headers.token;
        if (token) {
            jwt.verify(token, secret, (err, decode) => {
                if (err) return false;
                else return true;
            })
        }
    }
}

module.exports = Jwt;