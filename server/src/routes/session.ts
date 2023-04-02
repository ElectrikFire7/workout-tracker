import express from "express";

import { requiresAuth } from "../middleware/auth";
import {
    endSession,
    getSession,
    startSession,
    getSessions,
} from "../controllers/session";

const router = express.Router();

router.get("/", requiresAuth(), getSession);
router.get("/all", requiresAuth(), getSessions);
router.post("/start", requiresAuth(), startSession);
router.post("/end", requiresAuth(), endSession);

export default router;
