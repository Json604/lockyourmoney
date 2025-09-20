import { createOrderService, verifyPaymentService } from "../services/payment.service.js"

export const createOrder = async(req,res,next) => {
    try {
        const {amount, currency, unlockDate} = req.body
        const user_id = req.user._id.toString()

        const response = await createOrderService(amount, currency, unlockDate, user_id)

        res.status(201).json({success: true, message: "Razorpay order created successfully", data: response})
    } catch (error) {
        next(error)
    }
}

export const verifyPayment = async(req,res,next) => {
    try {
        const data = req.body;

        const result = await verifyPaymentService(data)

        if (result.verified) {
            res.status(200).json({ success: true, message: result.message , payment: result.payment, lock: result.lock});
        } else {
            res.status(400).json({ success: false, message: result.message, payment: result.payment, lock: result.lock });
        }
        
    } catch (error) {
        next(error)
    }
}