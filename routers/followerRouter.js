import Router from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import { verifyDeleteFollow, verifyPostFollow } from "../middlewares/followerMiddleware.js";
import { postFollow, unfollow } from "../controllers/followerController.js";

const followerRouter = Router();

followerRouter.post("/follow", validateToken, verifyPostFollow, postFollow);
followerRouter.post("/unfollow", validateToken, verifyDeleteFollow, unfollow );

export default followerRouter;