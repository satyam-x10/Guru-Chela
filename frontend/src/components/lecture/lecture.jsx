import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLecture } from '../../redux/actions/lecture';

const Lecture = () => {
  const { courseId,lectureId } = useParams();
  const [lectureData, setLectureData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(courseId,lectureId);

  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        const response = await getLecture(courseId, lectureId);
        const data = await response;
        console.log('data', data);
        setLectureData(data);
      } catch (error) {
        console.error('Error fetching lecture data:', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchLectureData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{minHeight:"90vh"}}>
      <h1>Lecture Details</h1>
      {lectureData.lecture ? (
        <div>
          <h2>{lectureData.lecture.title}</h2>
          <p>{lectureData.lecture.description}</p>
        </div>
      ) : (
        <p>No lecture data found.</p>
      )}
    </div>
  );
};

export default Lecture;
