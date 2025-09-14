import { Router } from "express";
import { authorize } from "../middlewares/authorization.middleware.js";
import { getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/:id', authorize, getUser)
// userRouter.patch('/:id', res.json({"purpose": "update user info"}))
// userRouter.post('/:id/lock', res.json({"purpose": "create new lock"}))
// userRouter.get('/:id/lock', res.json({"purpose": "get lock info"}))

export default userRouter;