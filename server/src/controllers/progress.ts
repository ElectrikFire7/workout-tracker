import { RequestHandler } from "express";

import Progress from "../models/progress";

export const completeProgress: RequestHandler<
    { id: string },
    unknown,
    {
        sets: number;
        reps: number;
        weight: number;
    },
    unknown
> = async (req, res, next) => {
    try {
        const progress = await Progress.findByIdAndUpdate(
            req.params.id,
            {
                sets: req.body.sets,
                reps: req.body.reps,
                weight: req.body.weight,
                isComplete: true,
            },
            { returnDocument: "after" }
        );
        res.status(200).send(progress);
    } catch (error) {
        next(error);
    }
};
