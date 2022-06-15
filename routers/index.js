import Router from "express";

import userRouter from "./userRouter.js";
import posts from "./postsRouter.js";
import toggleLikesRouter from "./toggleLikeRouter.js";

const router = Router();

router.use(userRouter);
router.use(posts);
router.use(toggleLikesRouter)

export default router;