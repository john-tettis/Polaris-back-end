

const ExpressError = require('../ExpressError')

const JWT = require('../Helpers/JWT')

module.exports = async function isCorrectUser(req,res,next){
    const user= req.user;
    req.user = user;
    if(user.id!==req.params.id) throw new ExpressError('Not authorized to view this account',403)
    return next()
}