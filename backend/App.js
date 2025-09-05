import express from 'express';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.route.js';
import connectToDB from './database/mongodb.js';
import paymentRouter from './routes/payment.routes.js';


const app = express();


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/app/v1/payment', paymentRouter)

app.get('/', (req,res) => {
    res.json({ "status": "ok", "message": "LockYourMoney API is running" })
})

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    await connectToDB();
});

export default app;