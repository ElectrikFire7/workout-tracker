import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { HydratedDocument } from "mongoose";

import { COOKIE_NAME, TOKEN_SECRET_KEY } from "../controllers/user";
import User, { User as UserType } from "../models/user";

declare global {
    namespace Express {
        interface Request {
            user: HydratedDocument<UserType> | null;
        }
    }
}

export const requiresAuth: (adminRole?: boolean) => RequestHandler =
    (adminRole = false) =>
    async (req, res, next) => {
        const token = req.cookies[COOKIE_NAME];
        if (!token) return res.status(401).send("Unauthorized");

        const { userId } = verify(token, TOKEN_SECRET_KEY) as {
            userId: string;
        };

        const user = await User.findById(userId);
        if (!user || !user.isActive || (adminRole && !user.isAdmin))
            return res.status(401).send("Unauthorized");

        req.user = user;
        next();
    };
