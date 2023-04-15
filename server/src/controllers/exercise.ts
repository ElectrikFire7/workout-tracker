import { RequestHandler } from "express";

import Exercise from "../models/exercise";

interface CreateExercise {
    name: string;
    description: string;
    sets: number;
    reps: number;
    weight: number;
}

export const createExercise: RequestHandler<
    unknown,
    unknown,
    CreateExercise,
    unknown
> = async (req, res, next) => {
    try {
        const { sets, reps, weight } = req.body;
        if (sets <= 0 || reps <= 0 || weight < 0)
            return res.status(400).send("Invalid values!");
        const exercise = await Exercise.create(req.body);
        res.status(200).send(exercise);
    } catch (error) {
        next(error);
    }
};

export const getExercises: RequestHandler = async (_req, res, next) => {
    try {
        const exercises = await Exercise.find({});
        res.status(200).send(exercises);
    } catch (error) {
        next(error);
    }
};
