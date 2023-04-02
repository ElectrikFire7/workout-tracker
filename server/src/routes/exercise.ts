import express from "express";

import { requiresAuth } from "../middleware/auth";
import { createExercise, getExercises } from "../controllers/exercise";

const router = express.Router();

router.get("/", requiresAuth(), getExercises);
router.post("/", requiresAuth(true), createExercise);

export default router;
