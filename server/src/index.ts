import mongoose from "mongoose";

import app from "./app";

const PORT = 8080;

mongoose
    .connect("mongodb://localhost:27017/workout-tracker", {
        family: 4,
    })
    .then(() => {
        console.log("DB connected");

        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    })
    .catch(console.error);
