import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLecture } from '../../redux/actions/lecture';
import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Button,
  HStack,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const Lecture = () => {
  const { courseId, lectureId } = useParams();
  const [lectureData, setLectureData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(courseId, lectureId);

  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        const response = await getLecture(courseId, lectureId);
        const data = await response;
        console.log('data', data);
        setLectureData(data);
      } catch (error) {
        console.error('Error fetching lecture data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLectureData();
  }, [courseId, lectureId]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <Box minHeight="90vh" p={4}>
      <Heading as="h1" mb={6}>
        Lecture Details
      </Heading>
      {lectureData.lecture ? (
        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={4}>
          <Box flex="1" mb={{ base: 4, md: 0 }}>
            <video
              controls
              style={{ width: '100%', height: 'auto' }}
              src={lectureData.lecture.video.url}
            />
            <HStack justify="space-between" spacing={4} m={4}>
              {lectureData.previousLecture && (
                <Button
                  onClick={() => {window.location.href=`./${ lectureData.previousLecture.id}`}}
                  colorScheme="teal"
                  leftIcon={<ArrowBackIcon />}
                >
                  Previous: {lectureData.previousLecture.title}
                </Button>
              )}
              {lectureData.nextLecture && (
                <Button
                  onClick={() => {window.location.href=`./${ lectureData.nextLecture.id}`}}
                  colorScheme="teal"
                  rightIcon={<ArrowForwardIcon />}
                >
                  Next: {lectureData.nextLecture.title}
                </Button>
              )}
            </HStack>
          </Box>
          <Box flex="1">
            <Heading as="h2" size="lg" mb={4}>
              {lectureData.lecture.title}
            </Heading>
            <Text mb={4}>{lectureData.lecture.description}</Text>
          </Box>
        </Flex>
      ) : (
        <Text>No lecture data found.</Text>
      )}
    </Box>
  );
};

export default Lecture;
