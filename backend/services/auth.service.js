import user from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import admin from "../firebaseAdmin.js";

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

export const signInService = async(email,password) => {
    // CHECK EMAIL
    const verifyUser = await user.findOne({email})
    if(!verifyUser){
        const error = new Error("Email not found")
        error.statusCode = 404
        throw error;
    }

    // CHECK PASSWORD
    const verifyPassword = await bcrypt.compare(password, verifyUser.password)
    if(!verifyPassword){
        const error = new Error("Invalid Password")
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign({userID: verifyUser._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return {user:verifyUser, token}
}

export const googleSignInService = async(idToken,name,email) => {
    // Verify the ID token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    // decodedToken.uid is the unique Google user ID
    // Check if user exists in DB, create if not
    let existingUser = await user.findOne({email})
    
    if(!existingUser){
        existingUser = await user.create({name,email,googleUid:decodedToken.uid})
    }
    if(existingUser && !existingUser.googleUid){
        existingUser.googleUid = decodedToken.uid;
        await existingUser.save();
    }
    const token = jwt.sign({userID: existingUser._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return {user: existingUser, token}

}