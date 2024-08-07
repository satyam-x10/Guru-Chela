import { server } from '../Store.js';
import axios from 'axios';

export const getCourses =
  (category = '', keyword = '', pageNO = 1) =>
  async dispatch => {
    // console.log('calling for ', pageNO);
    try {
      dispatch({ type: 'allCoursesRequest' });

      const config = {
        withCredentials: true,
      };
      const { data } = await axios.get(
        `${server}/courses?keyword=${keyword}&category=${category}&page=${pageNO}`,
        config
      );
      // console.log('daadada', data);

      dispatch({ type: 'allCoursesSuccess', payload: data });
    } catch (error) {
      dispatch({
        type: 'allCoursesFail',
        payload: error.response.data.message,
      });
    }
  };

export const getCourseLectures = (id, pageNo) => async dispatch => {
  try {
    dispatch({ type: 'getCourseRequest' });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${server}/course/${id}?pageNo=${pageNo}`,

      config
    );
    // console.log('receiced', data);
    dispatch({ type: 'getCourseSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getCourseFail',
      payload: error.response.data.message,
    });
  }
};

export const getAdminCourse = async id => {
  // console.log('trying admin course');
  try {
    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`${server}/admin/course/${id}`, config);
    // console.log('received admin course', data);

    return data;
  } catch (error) {
    console.error('Error fetching admin course:', error);

    return {
      status: 'failed to get admin course',
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};
