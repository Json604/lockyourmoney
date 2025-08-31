import { Router } from "express";

const authRouter = Router();

authRouter.post('/login',(req,res) => {
    res.json({"purpose": "login to account"})
})
// authRouter.post('/logout', res.json({"purpose": "logout of account"}))

export default authRouter;