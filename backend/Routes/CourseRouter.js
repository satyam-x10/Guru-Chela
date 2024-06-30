import express from "express";
import {
  getCourses,
  createCourse,
  deleteCourse,
  getAdminCourse,
} from "../controllers/courseController.js";
import {
  authorizedAdmin,
  authorizedSubscriber,
  isAuthenticated,
} from "../Middlewares/isAuthenticated.js";
import singleUpload from "../Middlewares/multer.js";

const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getCourses);

// Create new Course - Only Admin
router
  .route("/createCourse")
  .post(isAuthenticated, authorizedAdmin, singleUpload, createCourse);

// Add Lectures, Delete Course, Get Course Details - Only Admin
router
  .route("/admin/course/:id")
  .get(isAuthenticated, authorizedAdmin, getAdminCourse);
router
  .route("/course/:id")
  .delete(isAuthenticated, authorizedAdmin, singleUpload, deleteCourse);

export default router;
