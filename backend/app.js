import express from "express";
import course from "./Routes/CourseRouter.js";
import lecture from "./Routes/lectureRouter.js";
import doubt from "./Routes/DoubtRouter.js";
import ErrorMiddleware from "./Middlewares/Error.js";
import { config } from "dotenv";
import users from "./Routes/userRouter.js";
import others from "./Routes/OtherRouters.js";
import cookieParser from "cookie-parser";
import payment from "./Routes/paymentRouter.js";
import cors from "cors";
dotenv.config();
config({
  path: "./config/config.env",
});

import { connectDB } from "./config/Database.js";

connectDB();

const app = express();
// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  }),
);

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use("/api", course);
app.use("/api", lecture);
app.use("/api", doubt);
app.use("/api", users);
app.use("/api", payment);
app.use("/api", others);

export default app;

app.use(ErrorMiddleware);
