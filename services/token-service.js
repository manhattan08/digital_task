const jwt = require('jsonwebtoken');

class TokenService {
    generateToken(payload){
        return jwt.sign(payload,"SECRET-KEY",{
            expiresIn: "7d"
        });
    }
}

module.exports = new TokenService();