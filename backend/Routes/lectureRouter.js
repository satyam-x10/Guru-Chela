import express from 'express';
import { authorizedAdmin, authorizedSubscriber, isAuthenticated } from '../Middlewares/isAuthenticated.js';
import singleUpload from '../Middlewares/multer.js';
import { getLecture } from '../controllers/lectureController copy.js';
import { deleteLecture } from '../controllers/courseController.js';

const router = express.Router();

// Get all courses without lectures
router.route("/lecture/:courseId/:lectureId").get(isAuthenticated, authorizedSubscriber,getLecture);

// Delete Lecture
router.route("/lecture").delete(isAuthenticated, authorizedAdmin, deleteLecture);
export default router;