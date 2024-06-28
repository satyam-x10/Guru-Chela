import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import { Course } from "../Models/Course.js"
import getDataUri from "../Utils/dataUri.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import { Stats } from "../Models/Stats.js";
import { User } from "../Models/User.js";


export const getLecture = catchAsyncError(async (req, res, next) => {
  
  const courseId = req.params.courseId; // Lecture ID from the request parameters
  const lectureId = req.params.lectureId; // Lecture ID from the request parameters

  console.log('searchinf lecture for ',courseId,lectureId);
  // Find the course by ID
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ErrorHandler("Course Does Not exist", 404));
  }

  // Find the lecture within the course by ID
  const lecture = course.lectures.id(lectureId);
  if (!lecture) {
    return next(new ErrorHandler("Lecture Does Not exist", 404));
  }


  // Return the found lecture
  res.status(200).json({
    success: true,
    lecture: lecture
  });
});

