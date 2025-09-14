import user from "../models/user.model.js";

export const getUser = async(req,res,next) => {
    try {
        const findUser = await user.findById(req.params.id).select('-password');

        if(!findUser){
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }

        res.status(200).json({success: true, data: findUser})
    } catch (error) {
        next(error)
    }
}