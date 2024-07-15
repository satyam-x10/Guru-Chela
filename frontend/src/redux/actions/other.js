import { server } from '../Store';
import axios from 'axios';

export const contactUs = (name, email, message) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    dispatch({ type: 'contactRequest' });

    const { data } = await axios.post(
      `${server}/contact`,
      { name, email, message },
      config
    );

    dispatch({ type: 'contactSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'contactFail',
      payload: error.response.data.message,
    });
  }
};

export const courseRequest = (name, email, message) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    dispatch({ type: 'courseRequestRequest' });

    const { data } = await axios.post(
      `${server}/requestCourse`,
      { name, email, message },
      config
    );

    dispatch({ type: 'courseRequestSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'courseRequestFail',
      payload: error.response.data.message,
    });
  }
};

export const saveNotes = async (notes, id) => {
  // console.log('saving');

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    // dispatch({ type: 'saveNotes' });
    const { data } = await axios.post(
      `${server}/notes`,
      { notes, id },
      config
    );

    // dispatch({ type: 'courseRequestSuccess', payload: data.message });
  } catch (error) {
    // dispatch({
    //   type: 'courseRequestFail',
    //   payload: error.response.data.message,
    // });
  }
};


export const getNotifications = async (userId) => {

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Adjust this according to your authentication setup
    };

    // console.log('getting notifications', userId);
    const res = await axios.get(`${server}/notification/${userId}`,
      config);

    return res.data.notifications; // Return the notifications data directly
  } catch (error) {
    throw error.response.data.message || 'Failed to get notifications';
  }
};

export const deleteNotification = async (notificationID) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Adjust this according to your authentication setup
    };

    await axios.delete(`${server}/notification/${notificationID}`, config); // Adjust the API endpoint as per your backend route

    return notificationID; // Return the deleted notification ID
  } catch (error) {
    throw error.response.data.message || 'Failed to delete notification';
  }
};

export const clearNotifications = async (userId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Adjust this according to your authentication setup
    };

    await axios.put(`${server}/notification/${userId}`,
      config); // Adjust the API endpoint as per your backend route

  } catch (error) {
    throw error.response.data.message || 'Failed to clear notification';
  }
};