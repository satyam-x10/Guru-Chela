import { server } from '../Store.js';
import axios from 'axios';

export const getLecture = async (courseId, lectureId) => {
  try {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.get(
      `${server}/lecture/${courseId}/${lectureId}`,
      config
    );
    return data;
  } catch (error) {
    console.error('Error fetching lecture:', error);
    throw error;
  }
};
