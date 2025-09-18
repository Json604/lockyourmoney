import mongoose, { Schema } from "mongoose";

const paymentSchema = new mongoose.Schema({
    amount:{
        type: String,
        required: true
    },
    staus:{
        type:String,
        enum: ["Pending","Success","Failed"],
        default: 'Pending',
    },
    lockId:{
        type: Schema.Types.ObjectId,
        ref: 'Lock',
        unique: true,
        sparse: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        sparse: true
    },
}, {timestamps: true})

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment;