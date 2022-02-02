const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const secret = "TrWyFowrd";

class Jwt {
    constructor(data) {
        this.data = data;
    }

    generateToken() {
        let token = jwt.sign(this.data, secret);
        return token;
    }

    verifyToken(req, res, next) {
        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            req.token = bearerHeader.split(' ')[1]
            next();
        } else {
            res.status(401).send({
                message: '请先登录'
            });
        }
    }
}

module.exports = Jwt;