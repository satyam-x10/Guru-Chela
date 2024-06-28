import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
  Button,
  Flex,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../Loader/Loader';

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const { course, loading, currentPage, maxPage } = useSelector(
    state => state.course
  );
  const lectures = course?.lectures;
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCourseLectures(params.id, pageNo));
  }, [dispatch, params.id, pageNo]);

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
    <div>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 2fr' }}
        gap={4}
        minH="90vh"
        p={4}
      >
        <GridItem>
        <Box>
  <Image src={course.poster.url} alt={`${course.title} poster`} mb={4} borderRadius="md" />
  <Heading as="h2" size="sm" mb={2}>
    {course.title}
  </Heading>
  <Text mb={2}>{course.description}</Text>
  <Text>
    <strong>Category:</strong> {course.category}
  </Text>
  <Text>
    <strong>Created by:</strong> {course.createdBy}
  </Text>
  <Text>
    <strong>Created at:</strong> {new Date(course.createdAt).toLocaleDateString()}
  </Text>
</Box>

        </GridItem>

        <GridItem>
          {lectures && lectures.length > 0 ? (
            <Box mb={4}>
              
              <Flex wrap="wrap" justify="flex-start" gap={4}>
                {lectures.map((lecture, index) => (
                  <Box
                    key={lecture._id}
                    width={{ base: '44%', sm: '30%', lg: '22%' }}
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    onClick={() => {setLectureNumber(index);
                      window.open(`/lecture/${course._id}/${lecture._id}`, '_blank');
                    }}
                    cursor="pointer"
                    bg={index === lectureNumber ? 'teal.500' : 'gray.200'}
                    color={index === lectureNumber ? 'white' : 'black'}
                    _hover={{ bg: 'teal.400', color: 'white' }}
                  >
                    <Image
                      src={lecture.poster?.url || course.poster.url}
                      alt={`${lecture.title} poster`}
                      mb={2}
                      borderRadius="md"
                    />
                    <Heading as="h4" size="sm" mb={2}>
                      {index + 1}. {lecture.title}
                    </Heading>
                  </Box>
                ))}
              </Flex>
            </Box>
          ) : (
            <Heading as="h3" size="lg">
              No Lectures
            </Heading>
          )}
        </GridItem>
      </Grid>
      <Box my="8" display="flex" justifyContent="center">
        {Array.from({ length: maxPage }, (_, i) => i + 1).map(page => (
          <Button
            key={page}
            onClick={() => setPageNo(page)}
            m="2"
            colorScheme={page === currentPage ? 'teal' : 'gray'}
            whiteSpace="nowrap"
          >
            {page}
          </Button>
        ))}
      </Box>
    </div>
  );
};

export default CoursePage;
