import { configureStore } from '@reduxjs/toolkit';
import { adminReducer } from './reducers/adminReducer.js';
import { courseReduce } from './reducers/courseReducer.js';
import { doubtReducer } from './reducers/doubtReducer.js';
import { otherReducer } from './reducers/otherReducer.js';
import { config } from "dotenv";

import {
  profileReducer,
  subscriptionReducer,
  userReducer,
} from './reducers/userReducer.js';

config({
  path: "./config/config.env",
});

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReduce,
    doubt: doubtReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
    other: otherReducer,
  },
});

export default store;

// Use the SERVER_URL from the .env file
export const server = process.env.SERVER_URL ;
