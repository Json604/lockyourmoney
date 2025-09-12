import user from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUpService = async(name,email,password) => {
    // CHECK IF USER EXISTS
    const existingUser = await user.findOne({email})

    if(existingUser){
        const error = new Error("User already exists")
        error.statusCode = 409
        throw error;
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // CREATE USER
    const newUser = await user.create([{name, email, password:hash}])

    // GENERATE JWT TOKEN
    const token = jwt.sign({userID: newUser[0]._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return {newUser, token}
}