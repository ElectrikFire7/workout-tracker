import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    name: { type: String },
    age: { type: Number },
    height: { type: Number },
    weight: { type: Number },
    isActive: { type: Boolean },
    isAdmin: { type: Boolean },
});

export type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
