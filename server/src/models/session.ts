import { InferSchemaType, model, Schema } from "mongoose";

const sessionSchema = new Schema({
    start: { type: Date, required: true },
    end: { type: Date },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    score: { type: Number },
});

type Session = InferSchemaType<typeof sessionSchema>;

export default model<Session>("Session", sessionSchema);
