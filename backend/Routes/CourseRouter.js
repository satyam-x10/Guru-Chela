import express from 'express';
import { getAllCourses, createCourse, getLectures, createLectures, deleteLecture , deleteCourse, getAdminCourse} from '../controllers/courseController.js';
import { authorizedAdmin, authorizedSubscriber, isAuthenticated } from '../Middlewares/isAuthenticated.js';
import singleUpload from '../Middlewares/multer.js';
import { getLecture } from '../controllers/lectureController copy.js';

const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getAllCourses);

// Create new Course - Only Admin
router.route("/createCourse").post(isAuthenticated, authorizedAdmin, singleUpload, createCourse);

// Add Lectures, Delete Course, Get Course Details - Only Admin
router.route("/admin/course/:id").get(isAuthenticated, authorizedSubscriber, getAdminCourse);
router.route("/course/:id").get(isAuthenticated, authorizedSubscriber, getLectures);
router.route("/course/:id").post(isAuthenticated, authorizedAdmin, singleUpload, createLectures);
router.route("/course/:id").delete(isAuthenticated,  authorizedAdmin, singleUpload, deleteCourse);



export default router;