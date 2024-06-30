import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import { Course } from "../Models/Course.js";
import getDataUri from "../Utils/dataUri.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import cloudinary from "cloudinary";

import { User } from "../Models/User.js";

export const getCourses = catchAsyncError(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";

  let pageNo = parseInt(req.query.page, 10) || 1;
  const pageSize = 10;

  console.log(req.query, "was called");

  const totalCourses = await Course.countDocuments({
    title: {
      $regex: keyword,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    },
  });

  let skip = (pageNo - 1) * pageSize;

  // If the skip value is more than the total number of courses, reset pageNo to 1
  if (skip >= totalCourses) {
    pageNo = 1;
    skip = 0;
  }

  const courses = await Course.find({
    title: {
      $regex: keyword,
      $options: "i",
    },
    category: {
      $regex: category,
      $options: "i",
    },
  })
    .select("-lectures")
    .skip(skip)
    .limit(pageSize);

  res.status(200).json({
    success: true,
    courses,
    currentPage: pageNo,
    totalPages: Math.ceil(totalCourses / pageSize),
  });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
  console.log("creating backend course");
  const { title, description, category, createdBy } = req.body;
  // console.log(title, description, category);

  if (!title || !description || !category || !createdBy) {
    return next(new ErrorHandler("Please Add all Fields", 400));
  }

  const file = req.file;
  // console.log(file);

  const fileUri = getDataUri(file);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  // Create the course
  const newCourse = await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // Find an admin user and update their courseCategories
  const adminUser = await User.findOne({ role: "admin" });

  if (adminUser) {
    const categoryExists = adminUser.courseCategories.some(
      (cat) => cat.category === category,
    );

    // Only push the category if it does not already exist
    if (!categoryExists) {
      adminUser.courseCategories.push({
        category: category,
      });
    }

    await adminUser.save();
  } else {
    // Handle case where no admin user is found
    return next(new ErrorHandler("No admin user found", 404));
  }

  res.status(201).json({
    success: true,
    message: "Course created successfully. You can add lectures now",
  });
});

export const getAdminCourse = catchAsyncError(async (req, res, next) => {
  console.log("getting admin course");

  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Course Does Not exist", 404));
  }

  const lectures = course.lectures.slice(-10).map((lecture) => ({
    _id: lecture._id,
    title: lecture.title,
    thumbnail: lecture.thumbnail,
  }));

  res.status(200).json({
    success: true,
    course: {
      poster: course.poster,
      lectures: lectures,
    },
  });
});

export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) {
    return next(new ErrorHandler("Course Does Not exist", 404));
  }

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];
    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video",
    });
  }

  await course.remove();

  res.status(200).json({
    success: true,
    message: "Course has been deleted successfully",
  });
});

