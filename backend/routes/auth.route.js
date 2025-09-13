import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/sign-up', signUp)
authRouter.post('/sign-in',signIn)
authRouter.post('/sign-out',(req,res) => {res.json({purpose: "logout of account"})})

authRouter.post('/google', (req,res) => {res.json({purpose: "google Oauth initiating route"})})


export default authRouter;