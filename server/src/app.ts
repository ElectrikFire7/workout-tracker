import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user";
import workoutPlanRoutes from "./routes/workout-plan";
import exerciseRoutes from "./routes/exercise";
import sessionRoutes from "./routes/session";
import progressRoutes from "./routes/progress";

const app = express();

app.use(
    cors({
        origin: (_, callback) => {
            callback(null, true);
        },
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/plans", workoutPlanRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/progress", progressRoutes);

export default app;
