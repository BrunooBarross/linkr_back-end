import Router from "express";

import userRouter from "./userRouter.js";
import posts from "./postsRouter.js";

const router = Router();

router.use(userRouter);
router.use(posts);

export default router;