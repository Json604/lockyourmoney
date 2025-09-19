import { googleSignInService, signInService, signUpService } from "../services/auth.service.js";

export const signUp = async(req,res,next) => {
    try{
        const {name,email,password} = req.body

        const {newUser,token} = await signUpService(name,email,password)

        res.status(201).json({
            success: true,
            message: "User Created Succesfully",
            data:{
                user: newUser,
                token
            }
        })
    }
    catch(error){
        next(error)
    }
}

export const signIn = async(req,res,next) => {
    try {
        const {email,password} = req.body

        const {user,token} = await signInService(email,password)

        res.status(200).json({
            success: true,
            message: "User Signed-in succesfuly",
            data:{
                user,
                token
            }
        })

    } catch (error) {
        next(error)
    }
}

export const googleSignIn = async(req,res,next) => {
    try {
        const {firebaseToken} = req.body

        const {user,token} = await googleSignInService(firebaseToken)

        res.status(200).json({
            success: true,
            message: "User Signed-in succesfuly through Google",
            data:{
                user,
                token
            }
        })
        
    } catch (error) {
        next(error)
    }
}