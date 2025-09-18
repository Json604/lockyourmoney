import { Router } from "express";
import { authorize } from "../middlewares/authorization.middleware.js";
import { createOrder } from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post('/order', authorize, createOrder)
paymentRouter.post('/verify' , ()=> {
    res.json({"purpose" : "it will be used by razorpay to send the status"})
})

export default paymentRouter;