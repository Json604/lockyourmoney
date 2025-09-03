import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, `User Name is required`],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    phone:{
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        trim: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    },
},{timestamps: true})

const user = mongoose.model('user', userSchema)

export default user;