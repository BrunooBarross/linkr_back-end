import { Router } from "express";
import { verifyPost } from "../middlewares/postMiddleware.js";
import { publishPost } from "../controllers/timelineController.js";
import { timeline } from "../controllers/timelineController.js";
import { validateToken } from "../middlewares/authMiddleware.js";


const posts = Router();

posts.get("/timeline", validateToken, timeline);
posts.post("/post", validateToken, verifyPost, publishPost)

export default posts;