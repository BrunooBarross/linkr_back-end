import { Router } from "express";
import validateHashtagsRegex, { verifyPost, verifyDelPutPost } from "../middlewares/postMiddleware.js";
import { deletePost, publishPost, updatePost } from "../controllers/timelineController.js";
import { timeline } from "../controllers/timelineController.js";
import { validateToken } from "../middlewares/authMiddleware.js";


const posts = Router();

posts.get("/timeline", validateToken, timeline);
posts.post("/post", validateToken, verifyPost, validateHashtagsRegex, publishPost)
posts.delete("/post", validateToken, verifyDelPutPost, deletePost)
posts.put("/post", validateToken, verifyDelPutPost, updatePost)

export default posts;