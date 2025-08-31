import { Router } from "express";

const userRouter = Router();

userRouter.get('/:id', (req,res) => {
    res.json({"purpose": "get user info"})
})
// userRouter.post('/', res.json({"purpose": "create new user"}))
// userRouter.patch('/:id', res.json({"purpose": "update user info"}))
// userRouter.post('/:id/lock', res.json({"purpose": "create new lock"}))
// userRouter.get('/:id/lock', res.json({"purpose": "get lock info"}))

export default userRouter;