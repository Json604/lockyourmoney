import { JWT_SECRET } from "../config/env.js";
import user from "../models/user.model.js";
import jwt from 'jsonwebtoken'

export const authorize = async(req,res,next) => {
    try {
        let token

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }
        if(!token) return res.status(401).json({message: "Unauthorised"});

        const decoded = jwt.verify(token, JWT_SECRET)

        const findUser = await user.findById(decoded.userID)
        if(!findUser) return res.status(401).json({message: "Unauthorised"});

        req.user = findUser
        next()
    } catch (error) {
        res.status(401).json({message: "Unauthorised", error: error.message})
    }
}