import express from "express";
import { config } from "dotenv";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import nodeCron from "node-cron";
import { connectDB } from "./config/Database.js";
import { Stats } from "./Models/Stats.js";

// Load environment variables from .env file
config({
  path: "./config/config.env",
});

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

// Initialize Razorpay instance
export const instance = new Razorpay({
  key_id: "rzp_test_BIgASo2xD1fQYZ",
  key_secret: "afnTvWJhGSZQhxh7Mdpj45LC",
});

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Example route to handle GET request
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Schedule a task using node-cron
nodeCron.schedule("0 0 0 1 * *", async () => {
  try {
    await Stats.create({});
    console.log("Stats entry created successfully.");
  } catch (error) {
    console.error("Error creating stats entry:", error);
  }
});

// Function to start the server
function startServer(port) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Start server on PORT or find an available one
const initialPort = 5000;
let port = initialPort;
const maxAttempts = 10; // Maximum attempts to find an available port

function tryPort(port) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use.`);
      if (port === initialPort + maxAttempts - 1) {
        console.error(`Max attempts (${maxAttempts}) reached. Could not find an available port.`);
        process.exit(1);
      }
      tryPort(port + 1);
    } else {
      console.error('Server error:', err.message);
    }
  });
}

tryPort(port);
