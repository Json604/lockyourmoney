import { createLockService, deleteUserService, getLockService, getUserService, updateUserService } from "../services/user.service.js"

export const getUser = async(req,res,next) => {
    try {
        const user_id = req.params.id

        const user = await getUserService(user_id)

        res.status(200).json({success: true, message: "User Found",data: user})
    } catch (error) {
        next(error)
    }
}

export const updateUser = async(req,res,next) => {
    try {
        const updateFields = req.body
        const user_id = req.params.id

        const updatedUser = await updateUserService(updateFields, user_id)

        res.status(200).json({success: true, message: "User Information updated succesfully", data: updatedUser})

    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req,res,next) => {
    try {
        const user_id = req.params.id

        const deletedUser = await deleteUserService(user_id)

        res.status(200).json({success: true, message: 'User delted successfully', data: deletedUser})
    } catch (error) {
        next(error)
    }
}

export const createLock = async(req,res,next) => {
    try {
        const user_id = req.params.id
        const {lockAmount, unlockDate} = req.body

        const lockInfo = await createLockService(lockAmount, unlockDate, user_id)
        
        res.status(201).json({success: true, message: 'Lock created successfully', data: lockInfo})
    } catch (error) {
        next(error)
    }

}

export const getLock = async(req,res,next) => {
    try {
        const user_id = req.params.id

        const lockInfo = await getLockService(user_id)

        res.status(200).json({success: true, message: 'Lock info found', data: lockInfo})

    } catch (error) {
        next(error)
    }
}