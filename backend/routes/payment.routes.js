import { Router } from "express";

const paymentRouter = Router();

paymentRouter.post('/create-order', () => {
    res.json({"purpose" : "it will create an order and send to razorpay"})
})
paymentRouter.post('/webhook' , ()=> {
    res.json({"purpose" : "it will be used by razorpay to send the status"})
})

export default paymentRouter;