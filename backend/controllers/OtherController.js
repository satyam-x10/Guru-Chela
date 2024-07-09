import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import { Stats } from "../Models/Stats.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import { sendEmail } from "../Utils/SendEmail.js";
import dotenv from "dotenv";
import { User } from "../Models/User.js";
dotenv.config();
export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  const to = process.env.MY_MAIL;
  const text = "Contact from Guru-Chela";
  const msg = `I am ${name} and my email is${email}.\n ${message}`;

  await sendEmail(to, text, msg);

  return res.status(200).json({
    success: true,
    message: "Your query received successfully",
  });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  const to = process.env.MY_MAIL;
  const text = "Course Request from Guru-Chela";
  const msg = `I am ${name} and my email is${email}.\n ${message}`;

  await sendEmail(to, text, msg);

  if (!name || !email || !message) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  return res.status(200).json({
    success: true,
    message: "Your Course Request received successfully",
  });
});

export const saveNotes = catchAsyncError(async (req, res, next) => {
  const { notes, id } = req.body;

  if (!notes || !id) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }
  if (notes.length>3000) {
    return next(new ErrorHandler("Letters limited to 3k", 400));
  }
  
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
  
    user.notes = notes;
    await user.save();
  
    console.log('User saved:', user);
    res.status(200).json({
      success: true,
      message: "Notes updated successfully",
      user,
    });
    
  } catch (error) {
    console.error('Error updating notes:', error);
    return next(new ErrorHandler("An error occurred while updating notes", 500));
  }
});

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }
  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscription: 0,
      views: 0,
    });
  }

  const usersCount = statsData[11].users;
  const subscriptionCount = statsData[11].subscription;
  const viewsCount = statsData[11].views;

  let usersPercentage = 0,
    viewsPercentage = 0,
    subscriptionPercentage = 0;

  let usersProfit = true,
    viewsProfit = true,
    subscriptionProfit = true;

  if (statsData[10].users === 0) usersPercentage = usersCount * 100;
  if (statsData[10].views === 0) viewsPercentage = viewsCount * 100;
  if (statsData[10].subscription === 0)
    subscriptionPercentage = subscriptionCount * 100;
  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      views: statsData[11].views - statsData[10].views,
      subscription: statsData[11].subscription - statsData[10].subscription,
    };

    usersPercentage = (difference.users / statsData[10].users) * 100;
    viewsPercentage = (difference.views / statsData[10].views) * 100;
    subscriptionPercentage =
      (difference.subscription / statsData[10].subscription) * 100;
    if (usersPercentage < 0) usersProfit = false;
    if (viewsPercentage < 0) viewsProfit = false;
    if (subscriptionPercentage < 0) subscriptionProfit = false;
  }

  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    subscriptionProfit,
    viewsProfit,
    usersProfit,
  });
});
