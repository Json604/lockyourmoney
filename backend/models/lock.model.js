import mongoose from "mongoose";

const lockSchema = new mongoose.Schema({
    lockAmount:{
        type: Number,
        required: [true, 'Amount is required'],
        min: 1
    },
    unlockDate:{
        type: Date,
        required: [true, 'Unlock date is required'],
        validate:{
            validator: function(value){
                return value > new Date();
            },
            message: `Unlock date must be in future.`
        },
    }
},{timestamps: true})

const Lock = mongoose.model('Lock', lockSchema)

export default Lock;