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

export const updateUserService = async(updateFields, user_id) => {
    if('password' in updateFields || 'googleUid' in updateFields || 'lockId' in updateFields){
        const error = new Error ("Sensitive fields cannot be Updated")
        error.statusCode = 400
        throw error
    }

    const updatedUser = await user.findByIdAndUpdate(user_id, updateFields,{
        new:true,
        runValidators: true,
        strict: "throw"
    }).select('-password');

    return updatedUser
}

export const deleteUserService = async(user_id) => {
    const deletedUser = await user.findByIdAndUpdate(user_id, {deleted: true},{
        new: true,
        runValidators: true,
    })
    return deletedUser
}