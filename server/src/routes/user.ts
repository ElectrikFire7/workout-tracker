import express from "express";

import {
    getAuthenticatedUser,
    login,
    logout,
    signUp,
    updateProfile,
} from "../controllers/user";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth(), getAuthenticatedUser);
router.put("/", requiresAuth(), updateProfile);
router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);

export default router;
