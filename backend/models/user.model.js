import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, `User Name is required`],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    email:{
        type: String,
        required: [true, 'Email adress is required'],
        unique: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid 10-digit phone number'],
        lowercase: true,
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minLength:8,
    },
    googleUid:{
        type: String,
        unique: true,
        sparse: true
    },
    lockId:{
        type: Schema.Types.ObjectId,
        ref: 'Lock',
        unique: true,
        sparse: true
    },
    deleted:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

const User = mongoose.model('User', userSchema)

export default User;