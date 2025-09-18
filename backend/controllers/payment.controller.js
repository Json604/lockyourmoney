import { createOrderService } from "../services/payment.service.js"

export const createOrder = async(req,res,next) => {
    try {
        const {amount, currency} = req.body

        const response = await createOrderService(amount, currency)

        res.status(201).json({success: true, message: "Razorpay order created successfully", data: response})
    } catch (error) {
        next(error)
    }
}