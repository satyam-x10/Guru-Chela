import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import { Course } from "../Models/Course.js";
import { Notification } from "../Models/Notification.js"
import getDataUri from "../Utils/dataUri.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import { Stats } from "../Models/Stats.js";
import { User } from "../Models/User.js";

export const getLecture = catchAsyncError(async (req, res, next) => {
  const courseId = req.params.courseId; // Course ID from the request parameters
  const lectureId = req.params.lectureId; // Lecture ID from the request parameters

  //console.log("Searching lecture for ", courseId, lectureId);

  // Find the course by ID
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ErrorHandler("Course does not exist", 404));
  }

  // Find the index of the lecture within the course's lectures array
  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture._id.toString() === lectureId,
  );
  if (lectureIndex === -1) {
    return next(new ErrorHandler("Lecture does not exist", 404));
  }

  // Get the current lecture
  const lecture = course.lectures[lectureIndex];

  // Determine the previous and next lectures
  const previousLecture =
    lectureIndex > 0
      ? {
        id: course.lectures[lectureIndex - 1]._id,
        title: course.lectures[lectureIndex - 1].title,
      }
      : null;
  const nextLecture =
    lectureIndex < course.lectures.length - 1
      ? {
        id: course.lectures[lectureIndex + 1]._id,
        title: course.lectures[lectureIndex + 1].title,
      }
      : null;

  // Return the found lecture and titles of previous and next lectures
  res.status(200).json({
    success: true,
    lecture: lecture,
    previousLecture: previousLecture,
    nextLecture: nextLecture,
  });
});

// Max video size 100mb

export const createLectures = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const course = await Course.findById(id);
  if (!course) return next(new ErrorHandler("Course not found", 404));

  const file = req.file;
  const fileUri = getDataUri(file);

  // Upload video to Cloudinary with eager transformations for generating a thumbnail
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
    eager: [
      {
        format: "jpg",
        transformation: [{ width: 300, height: 200, crop: "pad" }],
        eager_async: true,
        eager_notification_url: "https://mysite.com/notify_endpoint",
      },
    ],
  });

  // Get the URL of the generated thumbnail
  const thumbnailUrl = mycloud.eager[0].secure_url;

  course.lectures.push({
    title,
    description,
    thumbnail: thumbnailUrl,
    video: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  course.numOfVideos = course.lectures.length;
  await course.save();

  // Fetch followers of the course (assuming 'followedBy' contains user IDs)
  const followers = course.followedBy; // Adjust this based on your actual schema
  // Create notifications for each follower
  const notificationsUpdate = followers.map(async (followerId) => {
    // Find existing notification document for the user
    let notification = await Notification.findOne({ userID: followerId });

    if (!notification) {
      // Create new notification if none exists
      notification = new Notification({
        userID: followerId,
      });
    }
    console.log('found it ', notification);
    // Push new lecture notification into notifications array
    notification.notifications.push({
      type: "lecture",
      notification: `New lecture added: ${title}`,
      redirect: `/lecture/${id}/${course.lectures[course.lectures.length - 1]._id}`, // Redirect URL
      time: Date.now(),
    });
    console.log('saved it ');

    // Save updated notification
    await notification.save();
  });

  res.status(200).json({
    success: true,
    message: "Lecture added in Course",
  });
});


export const deleteLecture = catchAsyncError(async (req, res, next) => {
  const { courseId, lectureId } = req.query;

  const course = await Course.findById(courseId);
  if (!course) return next(new ErrorHandler("Course not found", 404));

  const lecture = course.lectures.find((item) => {
    if (item._id.toString() === lectureId.toString()) return item;
  });
  await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type: "video",
  });

  course.lectures = course.lectures.filter((item) => {
    if (item._id.toString() !== lectureId.toString()) return item;
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture Deleted Successfully",
  });
});

export const getCourseLectures = catchAsyncError(async (req, res, next) => {
  const lecturesPerPage = 10;
  const page = parseInt(req.query.pageNo) || 1; // Get the page number from the query string, default to 1
  const skip = (page - 1) * lecturesPerPage;

  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Course Does Not exist", 404));
  }

  const totalLectures = course.lectures.length;
  const maxPage = Math.ceil(totalLectures / lecturesPerPage);
  const lectures = course.lectures
    .slice(skip, skip + lecturesPerPage)
    .map((lecture) => ({
      _id: lecture._id,
      title: lecture.title,
      thumbnail: lecture.thumbnail,
      url: lecture.video.url
    }));

  course.views += 1;
  await course.save();

  res.status(200).json({
    success: true,
    course: {
      ...course.toObject(),
      lectures: lectures,
    },
    currentPage: page,
    maxPage: maxPage,
  });
});
