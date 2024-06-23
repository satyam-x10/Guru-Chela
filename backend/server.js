
import app from "./app.js";
import express from "express";
import {config} from "dotenv";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import nodeCron  from 'node-cron';


config({
    path: "./config/config.env"
});


import { connectDB } from "./config/Database.js";
import { Stats } from "./Models/Stats.js";

connectDB();
cloudinary.v2.config({
    // cloud_name: process.env.CLOUDINARY_NAME,
    // api_key: process.env.CLOUDINARY_APIKEY,
    // api_secret: process.env.CLOUDINARY_APISECRET,
    cloud_name: 'duruozunc',
    api_key: '714541189673447',
    api_secret:'MVu6N77DgPZ5wm5SHT2Jko8AGnU',
});

export const instance = new Razorpay({
    key_id: "rzp_test_BIgASo2xD1fQYZ",
    key_secret: "afnTvWJhGSZQhxh7Mdpj45LC",
  });

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

nodeCron.schedule('0 0 0 1 * *', async () => {
    try {
        await Stats.create({});
      } catch (error) {
        console.log(error);
      }
});


// const temp = async () => {

//     await Stats.create({});
    
    
// }

// temp();

app.listen(PORT, () => {
    console.log("server listening on port " + PORT);
})