import { Router } from "express";

import { timeline } from "../controllers/timelineController.js";
import { validateToken } from "../middlewares/authMiddleware.js";


const posts = Router();

posts.get("/timeline", validateToken, timeline);

export default posts;