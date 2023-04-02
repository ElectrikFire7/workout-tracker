import express from "express";

import { requiresAuth } from "../middleware/auth";
import { getPlan, updatePlan } from "../controllers/workout-plan";

const router = express.Router();

router.get("/", requiresAuth(), getPlan);
router.put("/", requiresAuth(), updatePlan);

export default router;
