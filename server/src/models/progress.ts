import { InferSchemaType, model, Schema } from "mongoose";

const progressSchema = new Schema({
    exerciseId: {
        type: Schema.Types.ObjectId,
        ref: "Exercise",
        required: true,
    },
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: "Session",
        required: true,
        index: true,
    },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    isComplete: { type: Boolean, required: true },
});

export type Progress = InferSchemaType<typeof progressSchema>;

export default model<Progress>("Progress", progressSchema);
