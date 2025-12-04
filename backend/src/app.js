import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(
    express({
        limit: "16kb",
    })
);
app.use(cookieParser());

app.use("/api/auth", userRouter);

export { app };
