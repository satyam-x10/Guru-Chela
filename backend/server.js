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
import http from "http";
import { Server as SocketIOServer } from "socket.io";

config({
  path: "./config/config.env",
});

import { connectDB } from "./config/Database.js";
connectDB();

const app = express();

// Creating HTTP server and integrating Socket.IO
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware configuration
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Routes
app.use("/api", course);
app.use("/api", lecture);
app.use("/api", doubt);
app.use("/api", users);
app.use("/api", payment);
app.use("/api", others);
app.use(ErrorMiddleware);

// Socket.IO setup
io.on("connection", (socket) => {
  //console.log("A user connected");

  socket.on("disconnect", () => {
    //console.log("A user disconnected");
  });

  // Handle new comment added event
  socket.on("commentAdded", async ({ userId, ticketID, message }) => {
    try {
      // Save the comment to the database or perform necessary actions
      // For demonstration purposes, we'll log it and emit it back to clients
      //console.log(`New comment added by user ${userId} to ticket ${ticketID}: ${message}`);

      // Emit the comment to all clients in the same room
      io.to(ticketID).emit("newComment", { userId, ticketID,message });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  });

  // Join the specific doubt room
  socket.on("joinRoom", (ticketID) => {
    socket.join(ticketID);
    //console.log(`User joined room ${ticketID}`);
  });

  // Leave the specific doubt room
  socket.on("leaveRoom", (ticketID) => {
    socket.leave(ticketID);
    //console.log(`User left room ${ticketID}`);
  });
});

// Cloudinary configuration
import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

// Razorpay configuration
import Razorpay from "razorpay";
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Node-Cron setup
import nodeCron from "node-cron";
import { Stats } from "./Models/Stats.js";

nodeCron.schedule("0 0 0 1 * *", async () => {
  try {
    await Stats.create({});
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
