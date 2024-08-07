import mongoose from "mongoose";

const CourseModel = new mongoose.Schema({
  title: {
    type: String,
    required: ["true", "Please Enter Course Title"],
    minLength: [4, "Titles must be at least 4 characters"],
    maxLength: [80, "Titles can not exceed 80 characters"],
  },

  description: {
    type: String,
    required: ["true", "Please Enter Course Description"],
    minLength: [10, "Titles must be at least 20 characters"],
    maxLength: [300, "Titles can not exceed 300 characters"],
  },
  lectures: [
    {
      title: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
      thumbnail: {
        type: String,
        required: false,
      },
      video: {
        public_id: {
          type: String,
          required: false,
        },
        url: {
          type: String,
          required: false,
        },
      },
    },
  ],

  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  views: {
    type: Number,
    default: 0,
  },
  numOfVideos: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: [true, "Course Category Required"],
  },

  createdBy: {
    type: String,
    required: [true, "Course Author Name Required"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  followedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

});

export const Course = mongoose.model("Course", CourseModel);
