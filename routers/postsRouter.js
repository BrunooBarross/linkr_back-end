import { Router } from "express";
import { verifyPost, verifyDeletePost } from "../middlewares/postMiddleware.js";
import { deletePost, publishPost } from "../controllers/timelineController.js";
import { timeline } from "../controllers/timelineController.js";
import { validateToken } from "../middlewares/authMiddleware.js";


const posts = Router();

posts.get("/timeline", validateToken, timeline);
posts.post("/post", validateToken, verifyPost, publishPost)
posts.delete("/post", validateToken, verifyDeletePost, deletePost)

export default posts;