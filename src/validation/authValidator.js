const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/serverConfig')

async function isLoggedIn(req, res, next){
    const token = req.cookies['authToken']
    if(!token){
        return res.status(401).json({
            success : true,
            error : "no authentication",
            message : 'no auth token provided',
            data : {}
        })
    }
    const decoded = await jwt.verify(token, JWT_SECRET)
    if(!decoded){
         return res.status(401).json({
            success : true,
            error : "no authentication",
            message : 'invalid token provided',
            data : {}
        })
    }

    // if user is here so he is authenticated 
    req.user ={
        email : decoded.email,
        id : decoded.id
    }

    next()

}

module.exports = {
    isLoggedIn
}