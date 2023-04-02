import express from "express";

import { requiresAuth } from "../middleware/auth";
import { completeProgress } from "../controllers/progress";

const router = express.Router();

router.post("/complete/:id", requiresAuth(), completeProgress);

export default router;
