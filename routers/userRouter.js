import { Router } from "express";
import { checkSignUp } from "../middlewares/userMiddleware.js";
import { createUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post('/signup', checkSignUp, createUser);

export default userRouter;