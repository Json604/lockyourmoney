import user from "../models/user.model.js";

export const getUserService = async(user_id) => {
     const findUser = await user.findById(user_id).select('-password');

        if(!findUser){
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }
        return findUser
}