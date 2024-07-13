import { catchAsyncError } from '../Middlewares/catchAsyncError.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import { Doubt } from '../Models/Doubt.js';
import mongoose from 'mongoose';

export const createDoubt = catchAsyncError(async (req, res, next) => {
  const { title, description, resolutionType, userId } = req.body;

  console.log("Creating ticket", title, description, resolutionType, userId);

  if (!title || !description) {
    return next(new ErrorHandler("Title and description are required", 400));
  }

  try {
    // Find an existing doubt for the user
    let existingDoubt = await Doubt.findOne({ createdBy: userId });

    if (!existingDoubt) {
      // If no existing doubt, create a new one
      existingDoubt = await Doubt.create({
        createdBy: userId,
        tickets: []
      });
    }

    // Push a new ticket into the existing doubt
    existingDoubt.tickets.push({
      title,
      description,
      resolutionType,
      createdAt: new Date(),
      resolved: false,
      resolutionDetails: ''
    });

    await existingDoubt.save();

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return next(new ErrorHandler("Failed to create ticket", 500));
  }
});

export const addCommentToTicket = catchAsyncError(async (req, res, next) => {
  const { userId, ticketID, message } = req.body;

  console.log("mongo comment", userId, ticketID, message);

  if (!userId || !ticketID || !message) {
    return next(new ErrorHandler("User ID, ticket ID, and message are required", 400));
  }

  try {
    // Find the doubt that contains the ticket
    let doubt = await Doubt.findOne({ "tickets._id": ticketID });

    if (!doubt) {
      return next(new ErrorHandler("Ticket not found", 404));
    }

    // Find the ticket within the doubt
    let ticket = doubt.tickets.id(ticketID);

    // Add the new comment to the ticket's chats
    ticket.chats.push({
      sender: userId,
      message,
      ticket:ticket
    });

    await doubt.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return next(new ErrorHandler("Failed to add comment", 500));
  }
});

export const getAllDoubts = catchAsyncError(async (req, res, next) => {

  const userId = req.params.userId; // Assuming the userId is passed as a route parameter
  console.log('fetching all doubts');
  try {
    const doubts = await Doubt.find({ createdBy: userId });

    if (!doubts || doubts.length === 0) {
      return next(new ErrorHandler(`No doubts found for user with ID ${userId}`, 404));
    }

    res.status(200).json({
      success: true,
      doubts,
    });
  } catch (error) {
    console.error("Error fetching doubts:", error);
    return next(new ErrorHandler("Failed to fetch doubts", 500));
  }
});

export const deleteDoubtTicket = catchAsyncError(async (req, res, next) => {

  const { userId, id } = req.body;
  const ticketId=id;
  console.log("Deleting ticket",userId, ticketId);

  if (!userId || !ticketId) {
    return next(new ErrorHandler("User ID and Ticket ID are required", 400));
  }

  try {
    // Find the existing doubt for the user
    console.log('findnig ticket');
    let existingDoubt = await Doubt.findOne({ createdBy: userId });
    if (!existingDoubt) {
      console.log('no ticket');
      return next(new ErrorHandler("No existing doubt found for the user", 404));
    }
    console.log('found ticket');

    // Find the index of the ticket to delete
    const ticketIndex = existingDoubt.tickets.findIndex(ticket => ticket._id.toString() === ticketId);

    if (ticketIndex === -1) {
      return next(new ErrorHandler("Ticket not found", 404));
    }

    // Remove the ticket from the tickets array
    existingDoubt.tickets.splice(ticketIndex, 1);

    await existingDoubt.save();

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return next(new ErrorHandler("Failed to delete ticket", 500));
  }
});

export const getTicketById = catchAsyncError(async (req, res, next) => {
  const ticketId = req.params.ticketId; // Assuming the ticketId is passed as a route parameter
  console.log('Fetching ticket by ID', ticketId);

  try {
    // Use aggregate to search for the ticket in the tickets array of all doubts
    const result = await Doubt.aggregate([
      { $unwind: "$tickets" },
      { $match: { "tickets._id": new mongoose.Types.ObjectId(ticketId) } },
      { $replaceRoot: { newRoot: "$tickets" } }
    ]);

    if (!result.length) {
      console.log('no ticket');

      return next(new ErrorHandler(`No ticket found with ID ${ticketId}`, 404));
    }

    const ticket = result[0];
    console.log('yes ticket',ticket);

    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return next(new ErrorHandler("Failed to fetch ticket", 500));
  }
});
