import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title for your doubt"],
    minLength: [4, "Title must be at least 4 characters"],
    maxLength: [80, "Title cannot exceed 80 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter a description for your doubt"],
    minLength: [10, "Description must be at least 10 characters"],
    maxLength: [300, "Description cannot exceed 300 characters"],
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: function () {
      return this.resolved;
    },
  },
  resolutionDetails: {
    type: String,
    required: function () {
      return this.resolved;
    },
  },
  
  pairedWith: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
  resolvedWith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required: function () {
      return this.resolved && this.resolutionType === "reciprocal";
    },
  },
  resolutionType: {
    type: String,
    enum: ["direct", "reciprocal"],
    required: [true, "Resolution type required"],
  },
});

const DoubtSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID required"],
  },
  tickets: [ticketSchema],
});

export const Doubt = mongoose.model("Doubt", DoubtSchema);
