import { InferSchemaType, model, Schema } from "mongoose";

const exerciseSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
});

export type Exercise = InferSchemaType<typeof exerciseSchema>;

export default model<Exercise>("Exercise", exerciseSchema);
