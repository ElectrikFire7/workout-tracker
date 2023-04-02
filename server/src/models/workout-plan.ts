import { InferSchemaType, model, Schema } from "mongoose";

const workoutPlanSchema = new Schema({
    name: { type: String },
    description: { type: String },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
});

type WorkoutPlan = InferSchemaType<typeof workoutPlanSchema>;

export default model<WorkoutPlan>("WorkoutPlan", workoutPlanSchema);
