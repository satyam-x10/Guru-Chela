import axios from 'axios';
import { server } from '../Store.js';
import toast from 'react-hot-toast';

export const createDoubt = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };
    dispatch({ type: 'createTicketRequest' });
    console.log('Trying to create a ticket');
    console.log(formData);

    const { data } = await axios.post(`${server}/doubts/create`, formData, config);
    console.log('Created a ticket');

    dispatch({ type: 'createDoubtSuccess', payload: data.message });
    window.location.reload();
  } catch (error) {
    dispatch({
      type: 'createDoubtFail',
      payload: error.response?.data?.message || 'Something went wrong',
    });
  }
};

export const deleteDoubtTicket = async (userId, id) => {
  try {
    console.log('Trying to ');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: {
        userId, id
      },
    };
    console.log('Trying to delete a ticket', userId, id);

    const { data } = await axios.delete(`${server}/doubts`, config);
    console.log('Deleted a ticket');
    // toast.success('deleted');
    window.location.reload();
  } catch (error) {

  }
};


export const getAllDoubts = (userId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    dispatch({ type: 'getDoubtsRequest' });
    console.log('Fetching doubts');

    const { data } = await axios.get(`${server}/doubts/${userId}`, config);
    console.log('Fetched doubts', data);

    dispatch({ type: 'getMyDoubtsSuccess', payload: data.doubts });
  } catch (error) {
    dispatch({
      type: 'getMyDoubtsFail',
      payload: error.response?.data?.message || 'Something went wrong',
    });
  }
};