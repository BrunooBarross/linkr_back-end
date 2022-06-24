import { Router } from "express";

import { deleteUserLike, getNameLikes, postLike } from "../controllers/likeController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import verifyLikeMiddleware from "../middlewares/verifyLikeMiddleware.js";

const toggleLikesRouter = Router();

toggleLikesRouter.get('/like/names', validateToken, getNameLikes);
toggleLikesRouter.post("/like", validateToken, verifyLikeMiddleware, postLike);
toggleLikesRouter.delete("/like/:postId", validateToken, deleteUserLike);

export default toggleLikesRouter;