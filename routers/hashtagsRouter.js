import { getTrendingHashtags } from "../controllers/hashtagController.js";
import Router from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import { getPostsByHashtag } from "../controllers/timelineController.js"; 

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtags/:hashtag", validateToken, getPostsByHashtag);
hashtagsRouter.get("/hashtags", getTrendingHashtags);

export default hashtagsRouter;