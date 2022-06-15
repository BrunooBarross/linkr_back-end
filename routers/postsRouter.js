import { Router } from "express";

import { timeline } from "../controllers/timelineController.js";


const posts = Router();

posts.get("/timeline", timeline);

export default posts;