import express from "express";
import {
  contact,
  courseRequest,
  getDashboardStats,
  saveNotes,
} from "../controllers/OtherController.js";
import {
  authorizedAdmin,
  authorizedSubscriber,
  isAuthenticated,
} from "../Middlewares/isAuthenticated.js";

const router = express.Router();

// Contact Form
router.route("/contact").post(contact);

// Request Form
router.route("/requestCourse").post(courseRequest);
router.route("/notes").post(isAuthenticated,authorizedSubscriber, saveNotes);

// Admin Dashboard Stats
router
  .route("/admin/stats")
  .get(isAuthenticated, authorizedAdmin, getDashboardStats);

export default router;
