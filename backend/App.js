import express from 'express';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import connectToDB from './database/mongodb.js';
import paymentRouter from './routes/payment.route.js';
import errorMiddleware from './middlewares/error.middleware.js';


const app = express();

app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/app/v1/payment', paymentRouter)

app.use(errorMiddleware)

app.get('/', (req,res) => {
    res.json({ "status": "ok", "message": "LockYourMoney API is running" })
})

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    await connectToDB();
});

export default app;