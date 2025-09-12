import { signUpService } from "../services/auth.service.js";

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