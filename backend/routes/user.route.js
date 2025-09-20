import { Router } from "express";
import { authorize } from "../middlewares/authorization.middleware.js";
import {deleteUser, getLock, getUser, updateUser } from "../controllers/user.controller.js";

const userRouter = Router();

// USER ROUTES
userRouter.get('/:id', authorize, getUser)
userRouter.patch('/:id', authorize, updateUser)
userRouter.patch('/:id', authorize, deleteUser)

// LOCK ROUTE
userRouter.get('/:id/lock', authorize, getLock)

export default userRouter;