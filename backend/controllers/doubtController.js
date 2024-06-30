import { catchAsyncError } from '../Middlewares/catchAsyncError.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import { Doubt } from '../Models/Doubt.js';

export const createDoubt = catchAsyncError(async (req, res, next) => {
  const { title, description, resolutionType } = req.body;
  const { userId } = req.user;

  console.log("Creating ticket ", title, description,resolutionType,userId);

  if (!title || !description) {
    return next(new ErrorHandler("Title and description are required", 400));
  }

  const newTicket = await Doubt.create({
    title,
    description,
    resolutionType,
    createdBy: userId,
    createdAt: new Date(),
    resolved: false,
    resolutionDetails: '',
  });

  res.status(201).json({
    success: true,
    message: "Ticket created successfully",
    ticket: newTicket,
  });
});
