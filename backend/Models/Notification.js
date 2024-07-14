import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  lastRead: {
    type: Date,
    default: Date.now,
  },
  notifications: [
    {
      type: {
        type: String,
        required: true,
      },
      notification: {
        type: String,
        required: true,
      },
      redirect: {
        type: String,
        required: true,
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const Notification = mongoose.model("Notification", notificationSchema);
