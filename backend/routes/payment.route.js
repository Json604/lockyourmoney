import { Router } from "express";
import { authorize } from "../middlewares/authorization.middleware.js";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post('/order', authorize, createOrder)
paymentRouter.post('/verify' , verifyPayment)

export default paymentRouter;