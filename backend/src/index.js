import express from "express";
import connectDB from "./db/index.js";

import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({
    path: "./env",
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on the port ${PORT}`);
        });
        app.on("error", (error) => {
            console.log("Error", error);
            throw error;
        });
    })
    .catch((error) => {
        console.error("ERROR", error);
        throw error;
    });
