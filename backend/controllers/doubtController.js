import { catchAsyncError } from '../Middlewares/catchAsyncError.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import { Doubt } from '../Models/Doubt.js';

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



export const getAllDoubts = catchAsyncError(async (req, res, next) => {

  const userId = req.params.id; // Assuming the userId is passed as a route parameter
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
