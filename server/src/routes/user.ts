import express from "express";

import {
    getAuthenticatedUser,
    getUsers,
    login,
    logout,
    setUserAccess,
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
router.get("/all", requiresAuth(true), getUsers);
router.post("/enable/:id", requiresAuth(true), setUserAccess(true));
router.post("/disable/:id", requiresAuth(true), setUserAccess(false));

export default router;
