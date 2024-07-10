import { configureStore } from '@reduxjs/toolkit';
import { adminReducer } from './reducers/adminReducer.js';
import { courseReduce } from './reducers/courseReducer.js';
import { doubtReducer } from './reducers/doubtReducer.js';
import { otherReducer } from './reducers/otherReducer.js';
import {
  profileReducer,
  subscriptionReducer,
  userReducer,
} from './reducers/userReducer.js';
require('dotenv').config();
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
console.log(process.env.SERVER_URL);
export const server = process.env.SERVER_URL;
