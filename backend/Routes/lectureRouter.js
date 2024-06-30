import express from 'express';
import { authorizedAdmin, authorizedSubscriber, isAuthenticated } from '../Middlewares/isAuthenticated.js';
import singleUpload from '../Middlewares/multer.js';
import { createLectures, deleteLecture, getCourseLectures, getLecture } from '../controllers/lectureController copy.js';

const router = express.Router();

// Get all courses without lectures
router.route("/lecture/:courseId/:lectureId").get(isAuthenticated, authorizedSubscriber,getLecture);

router.route("/course/:id").get(isAuthenticated, authorizedSubscriber, getCourseLectures);
router.route("/course/:id").post(isAuthenticated, authorizedAdmin, singleUpload, createLectures);

// Delete Lecture
router.route("/lecture").delete(isAuthenticated, authorizedAdmin, deleteLecture);
export default router;