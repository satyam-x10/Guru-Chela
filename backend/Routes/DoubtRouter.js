import express from "express";
import {
  authorizedAdmin,
  authorizedSubscriber,
  isAuthenticated,
} from "../Middlewares/isAuthenticated.js";
import singleUpload from "../Middlewares/multer.js";
import { createDoubt, deleteDoubtTicket, getAllDoubts } from "../controllers/doubtController.js";

const router = express.Router();

router
  .route("/doubts/create")
  .post(isAuthenticated, authorizedSubscriber, singleUpload, createDoubt);

router
  .route("/doubts/:id")
  .get(isAuthenticated, authorizedSubscriber, getAllDoubts);

router
  .route("/doubts/")
  .delete(isAuthenticated, authorizedSubscriber, deleteDoubtTicket);


export default router;
