import { getUserService } from "../services/user.service.js"

export const getUser = async(req,res,next) => {
    try {
        const user_id = req.params.id
        const user = await getUserService(user_id)

        res.status(200).json({success: true, data: user})
    } catch (error) {
        next(error)
    }
}