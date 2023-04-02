import express from "express";

import { requiresAuth } from "../middleware/auth";
import { endSession, getSession, startSession } from "../controllers/session";

const router = express.Router();

router.get("/", requiresAuth(), getSession);
router.post("/start", requiresAuth(), startSession);
router.post("/end", requiresAuth(), endSession);

export default router;
