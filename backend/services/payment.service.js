import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "../config/env.js"
import Razorpay from 'razorpay'

export const createOrderService = async(amount, currency) => {
    var instance = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET })

    const order = await instance.orders.create({
    amount: amount*100,
    currency: currency,
    })

    return order
}