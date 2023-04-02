import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

import User from "../models/user";

export const COOKIE_NAME = "authToken";
export const TOKEN_SECRET_KEY = "abscueyvabfd";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        res.status(200).send(req.user);
    } catch (error) {
        next(error);
    }
};

interface SignUpBody {
    email?: string;
    password?: string;
}

export const signUp: RequestHandler<
    unknown,
    unknown,
    SignUpBody,
    unknown
> = async (req, res, next) => {
    try {
        const { email, password: passwordRaw } = req.body;
        if (!email || !passwordRaw) {
            return res.status(400).send("Parameters missing");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const password = await bcrypt.hash(passwordRaw, 10);
        const newUser = await User.create({
            email,
            password,
            isActive: true,
            isAdmin: false,
        });

        const token = sign({ userId: newUser.id }, TOKEN_SECRET_KEY, {
            expiresIn: "1d",
        });

        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
        })
            .status(201)
            .send();
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    email?: string;
    password?: string;
}

export const login: RequestHandler<
    unknown,
    unknown,
    LoginBody,
    unknown
> = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Missing creds");
        }

        const user = await User.findOne({ email }).select("+password").exec();
        if (!user) {
            return res.status(400).send("Invalid creds");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).send("Invalid creds");
        }

        const token = sign({ userId: user.id }, TOKEN_SECRET_KEY, {
            expiresIn: "1d",
        });

        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
        })
            .status(200)
            .send();
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (_req, res, next) => {
    try {
        res.clearCookie(COOKIE_NAME).send();
    } catch (error) {
        next(error);
    }
};

interface ProfileBody {
    name: string | null;
    age: number | null;
    height: number | null;
    weight: number | null;
}

export const updateProfile: RequestHandler<
    unknown,
    unknown,
    ProfileBody,
    unknown
> = async (req, res, next) => {
    try {
        if (!req.body.name) return res.status(400).send("Name cannot be empty");

        const updateBody = {
            name: req.body.name,
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,
        };
        const user = await User.findByIdAndUpdate(req.user!.id, updateBody, {
            returnDocument: "after",
        });

        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
};
