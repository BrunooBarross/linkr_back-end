import Router from "express";

import userRouter from "./userRouter.js";
import posts from "./postsRouter.js";
import toggleLikesRouter from "./toggleLikeRouter.js";
import hashtagsRouter from "./hashtagsRouter.js";
import followerRouter from "./followerRouter.js";
import commentRouter from "./commentRouter.js";

const router = Router();

router.use(userRouter);
router.use(posts);
router.use(toggleLikesRouter);
router.use(hashtagsRouter);
router.use(followerRouter);
router.use(commentRouter);

export default router;