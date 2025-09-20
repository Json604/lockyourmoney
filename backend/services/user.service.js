import User from "../models/user.model.js";

export const getUserService = async(user_id) => {
     const findUser = await User.findById(user_id).select('-password');

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

    const updatedUser = await User.findByIdAndUpdate(user_id, updateFields,{
        new:true,
        runValidators: true,
        strict: "throw"
    }).select('-password');

    return updatedUser
}

export const deleteUserService = async(user_id) => {
    const deletedUser = await User.findByIdAndUpdate(user_id, {deleted: true},{
        new: true,
        runValidators: true,
    })
    return deletedUser
}


export const getLockService = async(user_id) => {
    const user = await User.findById(user_id).populate('lockId')

    if(!user){
        const error = new Error("User not found")
        error.statusCode = 404
        throw error
    }

    if(!user.lockId){
        const error = new Error("No Lock Info not found")
        error.statusCode = 404
        throw error
    }

    const lockInfo = user.lockId

    return lockInfo
}