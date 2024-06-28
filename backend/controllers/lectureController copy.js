import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import { Course } from "../Models/Course.js"
import getDataUri from "../Utils/dataUri.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import { Stats } from "../Models/Stats.js";
import { User } from "../Models/User.js";

export const getLecture = catchAsyncError(async (req, res, next) => {
  
  const courseId = req.params.courseId; // Course ID from the request parameters
  const lectureId = req.params.lectureId; // Lecture ID from the request parameters

  console.log('Searching lecture for ', courseId, lectureId);

  // Find the course by ID
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ErrorHandler("Course does not exist", 404));
  }

  // Find the index of the lecture within the course's lectures array
  const lectureIndex = course.lectures.findIndex(lecture => lecture._id.toString() === lectureId);
  if (lectureIndex === -1) {
    return next(new ErrorHandler("Lecture does not exist", 404));
  }

  // Get the current lecture
  const lecture = course.lectures[lectureIndex];

  // Determine the previous and next lectures
  const previousLecture = lectureIndex > 0 ? { id: course.lectures[lectureIndex - 1]._id, title: course.lectures[lectureIndex - 1].title } : null;
  const nextLecture = lectureIndex < course.lectures.length - 1 ? { id: course.lectures[lectureIndex + 1]._id, title: course.lectures[lectureIndex + 1].title } : null;
  
  // Return the found lecture and titles of previous and next lectures
  res.status(200).json({
    success: true,
    lecture: lecture,
    previousLecture: previousLecture,
    nextLecture: nextLecture,
  });
});

