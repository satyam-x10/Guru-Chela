import { Box, Grid, GridItem, Heading, Image, Text, VStack, Button, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../Loader/Loader';

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const { course, loading } = useSelector(state => state.course);
  const lectures = course?.lectures;

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (!user.subscription || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  if (loading) {
    return <Loader />;
  }

  if (!course) {
    return <Heading>No Course Found</Heading>;
  }

  return (
    <Grid
      templateColumns={{ base: '1fr',sm:'1fr', md: '1fr 3fr 1fr' }}
      gap={4}
      minH="90vh"
      p={4}
    >
      <GridItem>
        <Box>
          <Heading as="h2" size="sm" mb={2}>{course.title}</Heading>
          <Text mb={2}>{course.description}</Text>
          <Text><strong>Category:</strong> {course.category}</Text>
          <Text><strong>Created by:</strong> {course.createdBy}</Text>
          <Text><strong>Created at:</strong> {new Date(course.createdAt).toLocaleDateString()}</Text>
        </Box>
      </GridItem>

      <GridItem>
        {lectures && lectures.length > 0 ? (
          <Box mb={4} >
            <Box style={{display:"flex",justifyContent:"space-between",alignItems:"center"}} mb={4}>
              <Image
                height="150px"
                src={course.poster.url}
                alt={`${course.title} poster`}
                margin="0 10px"
              />
              <video
                controls
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
                src={lectures[lectureNumber].video.url}
                style={{ height:"150px" }} // Ensure width is 50%
              ></video>
            </Box>

            <Heading as="h3" size="md" mt={4}>
              {lectureNumber + 1}. {lectures[lectureNumber].title}
            </Heading>
            <Heading as="h4" size="sm" mt={2}>Description</Heading>
            <Text>{lectures[lectureNumber].description}</Text>
          </Box>
        ) : (
          <Heading as="h3" size="lg">No Lectures</Heading>
        )}
      </GridItem>

      <GridItem overflowY="auto">
        <VStack spacing={2}>
          {lectures && lectures.length > 0 ? (
            lectures.map((lecture, index) => (
              <Button
                key={lecture._id}
                width="100%"
                onClick={() => setLectureNumber(index)}
                bg={index === lectureNumber ? 'teal.500' : 'gray.200'}
                color={index === lectureNumber ? 'white' : 'black'}
                _hover={{ bg: 'teal.400', color: 'white' }}
                textAlign="left"
                justifyContent="flex-start"
              >
                {index + 1}. {lecture.title}
              </Button>
            ))
          ) : (
            <Heading as="h3" size="lg">No Lectures</Heading>
          )}
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default CoursePage;
