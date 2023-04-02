import { InferSchemaType, model, Schema } from "mongoose";

const exerciseSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    sets: { type: Number },
    reps: { type: Number },
    weight: { type: Number },
});

export type Exercise = InferSchemaType<typeof exerciseSchema>;

export default model<Exercise>("Exercise", exerciseSchema);
