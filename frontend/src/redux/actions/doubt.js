import axios from 'axios';
import { server } from '../Store.js';

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

    dispatch({ type: 'createTicketSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createTicketFail',
      payload: error.response?.data?.message || 'Something went wrong',
    });
  }
};
