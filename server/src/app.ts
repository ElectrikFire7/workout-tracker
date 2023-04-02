import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user";

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

export default app;
