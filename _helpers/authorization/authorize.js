const jwt = require('express-jwt')
const secret = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function checkToken(req,res,next) {
    return jwt({ secret: secret, algorithms: ['HS256'] }),next()
}
module.exports=checkToken
