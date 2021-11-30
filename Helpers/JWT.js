const jwt = require("jsonwebtoken");

const SECRET_KEY = "absoultely a wonDrfully complex KeY";
const JWT_OPTIONS = { expiresIn: 60 * 60 };  // 1 hour


class JWT{
    static async getToken(payload){
        let token = await jwt.sign(payload, SECRET_KEY, JWT_OPTIONS)
        return token
    }
    static async verifyToken(token){
        return jwt.verify(token, SECRET_KEY); 
    }
}

module.exports = JWT