import Router from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import { checkComment } from "../middlewares/commentMiddleware.js";
import { postComment } from "../controllers/commentController.js";

const commentRouter = Router();

commentRouter.post("/comment", validateToken, checkComment, postComment);

export default commentRouter;