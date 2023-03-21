const jwt= require('jsonwebtoken')
const config = require('../config/custom-environment-variables.json')

const verifyToken=(req,res,next)=>{
    const token = req.headers['x-auth-token']

    if(!token) {
        return res.status(401).send({
            message: "Access denied!!No token provided",
        })
    }

    try{
        const decoded= jwt.verify(token,config.jwtPrivateKey)
        req.organiser= decoded
        next()
    } catch(ex){
        return res.status(500).send({message: "Failed to authenticate token"})
    }
}

module.exports = verifyToken
    

/*
    jwt.verify(token, config.jwtPrivateKey, (err, decoded) => {
        if(err) return res.status(500).send({message: "Failed to authenticate token"})

        req.userId = decoded.id
        next()
    })
    */
