const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req,res,next) {
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next()
    }catch(err){
        return res.status(401).json({message:"wrong token"})
    }
}

module.exports = authMiddleware;