import { getTrendingHashtags } from "../controllers/hashtagController.js";
import Router from "express";

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtags", getTrendingHashtags);

export default hashtagsRouter;