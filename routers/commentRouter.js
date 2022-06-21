import Router from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import { checkComment, verifyExistingPost } from "../middlewares/commentMiddleware.js";
import { getComments, postComment } from "../controllers/commentController.js";

const commentRouter = Router();

commentRouter.post("/comments", validateToken, checkComment, postComment);
commentRouter.get("/comments", validateToken, verifyExistingPost, getComments);

export default commentRouter;