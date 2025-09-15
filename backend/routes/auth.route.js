import { Router } from "express";
import { googleSignIn, signIn, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

// MANUAL AUTH
authRouter.post('/sign-up', signUp)
authRouter.post('/sign-in',signIn)
// authRouter.post('/sign-out',(req,res) => {res.json({purpose: "logout of account"})})

// GOOGLE AUTH
authRouter.post('/google',googleSignIn)

export default authRouter;