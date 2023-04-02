import { RequestHandler } from "express";
import { HydratedDocument } from "mongoose";

import Session from "../models/session";
import Progress, { Progress as ProgressType } from "../models/progress";
import WorkoutPlan from "../models/workout-plan";
import Exercise from "../models/exercise";

type P = HydratedDocument<ProgressType>;

export const getSession: RequestHandler = async (req, res, next) => {
    try {
        const session = await Session.findOne({
            userId: req.user!.id,
            end: null,
        });
        const plan = await WorkoutPlan.findOne({
            userId: req.user!.id,
        });
        const exercises = await Exercise.find({
            _id: { $in: plan!.exercises },
        });
        let progresses: ProgressType[] = [];
        if (session)
            progresses = await Progress.find({ sessionId: session.id });

        return res.status(200).send({ session, plan, exercises, progresses });
    } catch (error) {
        next(error);
    }
};

export const startSession: RequestHandler = async (req, res, next) => {
    try {
        const ongoingSession = await Session.findOne({
            userId: req.user!.id,
            end: null,
        });
        if (ongoingSession)
            return res.status(400).send("Session already in progress");

        const session = await Session.create({
            start: new Date(),
            end: null,
            userId: req.user!.id,
        });
        const plan = await WorkoutPlan.findOne({ userId: req.user!.id });
        if (!plan) throw Error("Plan does not exist");

        const progresses = await Progress.insertMany(
            plan.exercises.map((id) => ({
                sets: 0,
                reps: 0,
                weight: 0,
                exerciseId: id,
                sessionId: session.id,
                isComplete: false,
            }))
        );
        res.status(200).send({ session, progresses });
    } catch (error) {
        next(error);
    }
};

export const endSession: RequestHandler = async (req, res, next) => {
    try {
        const session = await Session.findOne({
            userId: req.user!.id,
            end: null,
        });
        if (!session) return res.status(400).send("No active session");

        await Progress.updateMany(
            { sessionId: session.id },
            { $set: { isComplete: true } }
        );
        const progresses = (
            await Progress.find({ sessionId: session.id })
        ).reduce((acc, p) => {
            acc[p.exerciseId.toString()] = p;
            return acc;
        }, {} as Record<string, P>);

        const plan = await WorkoutPlan.findOne({ userId: req.user!.id });
        if (!plan) throw Error("Plan does not exist");
        const exercises = await Exercise.find({ _id: { $in: plan.exercises } });

        const points = exercises.reduce((total, e) => {
            const o = e.sets * e.reps * e.weight;
            const pro = progresses[e.id];
            const s = pro.sets * pro.reps * pro.weight;
            let f = s / o;
            return total + (f > 1 ? 1 : f);
        }, 0);
        const score = ((points * 100) / exercises.length).toFixed(2);

        const sess = await Session.findOneAndUpdate(
            { userId: req.user!.id, end: null },
            { end: new Date(), score },
            { returnDocument: "after" }
        );

        res.status(200).send({
            session: sess,
            progresses: Object.values(progresses),
        });
    } catch (error) {
        next(error);
    }
};
