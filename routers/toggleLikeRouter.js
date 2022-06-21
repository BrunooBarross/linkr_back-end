import { Router } from "express";

import { deleteUserLike, postLike } from "../controllers/likeController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import verifyLikeMiddleware from "../middlewares/verifyLikeMiddleware.js";

const toggleLikesRouter = Router();

toggleLikesRouter.post("/like", validateToken, verifyLikeMiddleware, postLike);
toggleLikesRouter.delete("/like/:postId", validateToken, deleteUserLike);

export default toggleLikesRouter;