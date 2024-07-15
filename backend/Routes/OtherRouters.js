import express from "express";
import {
  clearNotifications,
  contact,
  courseRequest,
  deleteNotification,
  getDashboardStats,
  getNotifications,
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
router.route("/notes").post(isAuthenticated, authorizedSubscriber, saveNotes);

// Admin Dashboard Stats
router
  .route("/admin/stats")
  .get(isAuthenticated, authorizedAdmin, getDashboardStats);


// notification

router
  .route("/notification/:userId")
  .get(isAuthenticated, authorizedSubscriber, getNotifications);


router
  .route("/notification/:notificationID")
  .delete(isAuthenticated, authorizedSubscriber, deleteNotification);

router
  .route("/notification/:userId")
  .put(clearNotifications);


export default router;