import express from "express";
import {
  authorizedAdmin,
  authorizedSubscriber,
  isAuthenticated,
} from "../Middlewares/isAuthenticated.js";
import singleUpload from "../Middlewares/multer.js";
import { createDoubt } from "../controllers/doubtController.js";

const router = express.Router();

router
  .route("/doubts/create")
  .post(isAuthenticated, authorizedSubscriber, singleUpload, createDoubt);


export default router;
