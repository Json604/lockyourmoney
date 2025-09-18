import { config } from "dotenv";

config({path: `.env.${process.env.NODE_ENV || `development`}.local`})

export const{
    PORT,
    NODE_ENV,
    SERVER_URL,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    RAZORPAY_KEY_SECRET,
    RAZORPAY_KEY_ID
} = process.env;