import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "../config/env.js"
import Razorpay from 'razorpay'
import crypto from 'crypto'
import Payment from "../models/payment.model.js"
import User from "../models/user.model.js"
import Lock from "../models/lock.model.js"

export const createOrderService = async(amount, currency, unlockDate, user_id) => {

    // checking lock existence
    const user = await User.findById(user_id)

    if(!user){
        const error = new Error("User not found")
        error.statusCode = 404
        throw error
    }

    if(user.lockId){
        const error = new Error("Lock already exists")
        error.statusCode = 409
        throw error
    }

    // creating razorpay order
    var instance = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET })

    const order = await instance.orders.create({
    amount: amount*100,
    currency: currency,
    })

    if (!order || !order.id) {
        throw new Error("Failed to create Razorpay order");
    }
    
    // creating lockDB with status pending [checking user and userLock till multiLock feature is not provided]
    const lock = await Lock.create({lockAmount:amount, unlockDate})
    user.lockId = lock._id
    await user.save()

    // payment status shows pending here, change to success/failure in the verify route
    const payment = await Payment.create({amount, lockId: lock._id, userId: user_id, razorpay_order_id: order.id})

    return order
}

export const verifyPaymentService = async(data) => {

    const generatedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(data.razorpay_order_id + '|' + data.razorpay_payment_id)
    .digest('hex')

    const payment = await Payment.findOne({razorpay_order_id})
    if(!payment) throw new Error('No Payment Record Found for this Order');

    const lock = await Lock.findById(payment.lockId)
    if(!lock) throw new Error('No Lock Associated with this order')

    if (generatedSignature === data.razorpay_signature) {
        payment.status = 'Success'
        await payment.save()

        lock.status = 'Success'
        await lock.save()

        return { verified: true, message: "Payment verified successfully", payment, lock };
    } else {
        payment.status = 'Failed'
        await payment.save()

        lock.status = 'Failed'
        await lock.save()
        return { verified: false, message: "Payment verification failed", payment, lock };
    }
}