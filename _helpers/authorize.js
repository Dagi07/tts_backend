const jwt = require('jsonwebtoken');
const secret = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const authorize = (req, res, next, feature, index) => {
    const bearerHeader = req.headers['authorization']
    // console.log(bearerHeader)
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1]
        //verify the token
        jwt.verify(token, secret, async (err, authData) => {
            if (err) {
                res.status(400).send({
                    status: false,
                    message: err
                })
            } else {
                next();
            }
        })
    } else {
        res.status(400).send({
            status: false,
            message: "Invalid token"
        })
    }
}


const getUser = (req) => {
    const bearerHeader = req.headers['authorization']
    const bearer = bearerHeader.split(' ');
    const token = bearer[1]
    var decode = jwt.decode(token)
    // console.log(token);
    return decode
}


const validateToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    // console.log(bearerHeader)
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const token = bearer[1]
        jwt.verify(token, secret, async (err, authData) => {
            if (err) {
                // console.log("Invalid Token 1")

                res.status(403).send({
                    status: false,
                    message: err
                })
            } else {
                // console.log("Token Valid")
                next()
            }
        })
    } else {
        console.log("Invalid Token")
        res.status(400).send({
            status: false,
            message: "Authorization Token is Required"
        })
    }
}
//check if token is valid
const isTokenValid = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const token = bearer[1]
        jwt.verify(token, secret, async (err, authData) => {
            if (err) {
                res.status(403).send({
                    status: false,
                    message: "Token Expired"
                })
            } else {

                res.status(200).send({
                    status: true,
                    message: "Valid Token"
                })
            }
        })
    } else {
        res.status(400).send({
            status: false,
            message: "Invalid Token"
        })
    }
}
const check_token_with_fcm = (req, res, next) => {
    console.log(req.body)
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const token = bearer[1]
        jwt.verify(token, secret, async (err, authData) => {
            if (err) {
                res.status(200).send({
                    status: false,
                    message: "Token Expired"
                })
            } else {
                var user = getUser(req).user
                console.log(user)
                return res.status(200).send({
                    status: true,
                    message: "Valid Token"
                })
            }
        })
    } else {
        res.status(200).send({
            status: false,
            message: "Invalid Token"
        })
    }

}

module.exports = { authorize, getUser, validateToken, isTokenValid, check_token_with_fcm }