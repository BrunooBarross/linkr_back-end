import { Router } from "express";
import { checkSignUp } from "../middlewares/userMiddleware.js";
import { checkSignIn } from "../middlewares/authMiddleware.js"
import { createUser } from "../controllers/userController.js";
import { login } from "../controllers/authController.js";

const userRouter = Router();

userRouter.post('/signup', checkSignUp, createUser);
userRouter.post('/signin', checkSignIn, login);

export default userRouter;