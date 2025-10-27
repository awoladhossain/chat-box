import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import connectDB from "./database/db.js";
import userRouter from "./routes/user.routes.js";
import useMessageRouter from "./routes/message.routes.js";

config({ path: "./config/config.env" });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

connectDB();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/messages", useMessageRouter);

export default app;
