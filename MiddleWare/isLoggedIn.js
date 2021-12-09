

const ExpressError = require('../ExpressError')

const JWT = require('../Helpers/JWT')

module.exports = async function isLoggedIn(req,res,next){
    const token = req.headers.authorization||null
    console.log(token)
    if(!token) throw new ExpressError('Not authorized. set header authorization.', 401)
    const user= JWT.verifyToken(token)
    req.user = user;
    return next()
}