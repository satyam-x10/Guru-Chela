import app from "./app.js";
import express from "express";
import { config } from "dotenv";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import nodeCron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

config({
  path: "./config/config.env",
});

import { connectDB } from "./config/Database.js";
import { Stats } from "./Models/Stats.js";

connectDB();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const PORT = 5000

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  }),
);

nodeCron.schedule("0 0 0 1 * *", async () => {
  try {
    await Stats.create({});
  } catch (error) {
    console.log(error);
  }
});


app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});