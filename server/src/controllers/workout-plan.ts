import { RequestHandler } from "express";

import WorkoutPlan from "../models/workout-plan";

export const getPlan: RequestHandler = async (req, res, next) => {
    try {
        const plan = await WorkoutPlan.findOne({ userId: req.user!.id });
        res.status(200).send(plan);
    } catch (error) {
        next(error);
    }
};

interface UpdatePlan {
    name: string;
    description: string;
    exercises: string[];
}

export const updatePlan: RequestHandler<
    unknown,
    unknown,
    UpdatePlan,
    unknown
> = async (req, res, next) => {
    try {
        const plan = await WorkoutPlan.findOneAndUpdate(
            { userId: req.user!.id },
            req.body,
            {
                returnDocument: "after",
            }
        );

        res.status(200).send(plan);
    } catch (error) {
        next(error);
    }
};
