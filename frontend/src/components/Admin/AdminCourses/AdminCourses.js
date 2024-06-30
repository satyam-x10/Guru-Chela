import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { format } from 'date-fns';

import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  RiAddBoxLine,
  RiDeleteBin7Fill,
  RiFileAddFill,
  RiFolderSharedFill,
  RiOpenSourceFill,
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar';
import CourseModal from './AddLecture.js';
import { getCourses, getCourseLectures } from '../../../redux/actions/course';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../../redux/actions/admin';

import toast from 'react-hot-toast';

const AdminCourses = () => {
  const { courses, totalPages, currentPage } = useSelector(
    state => state.course
  );

  const { loading, error, message } = useSelector(state => state.admin);
  const [pageNo, setPageNo] = useState(1);
  const [SearchName, setSearchName] = useState('');
  const [SearchCategory, setSearchCategory] = useState('');

  const dispatch = useDispatch();
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This makes the scrolling smooth
    });
  }

  const deleteButtonHandler = courseId => {
    console.log(courseId);
    dispatch(deleteCourse(courseId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getCourses(SearchCategory, SearchName, pageNo));
  }, [dispatch, error, message, pageNo, SearchName, SearchCategory]);

  return (
    <div>
      <Sidebar />
      <Box p={['0', '8']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Courses"
          my="16"
          textAlign={['center', 'left']}
        />
        <Input
          value={SearchName}
          onChange={e => setSearchName(e.target.value)}
          placeholder="Search a course..."
          type={'text'}
          focusBorderColor="teal.500"
          mb="4"
        />
        <Input
          value={SearchCategory}
          onChange={e => setSearchCategory(e.target.value)}
          placeholder="Search a category..."
          type={'text'}
          focusBorderColor="teal.500"
          mb="4"
        />

        <Box>
          <Box mb={4}>
            <Text fontSize="xl" fontWeight="bold">
              All available courses in the database
            </Text>
          </Box>

          {courses.map(item => (
            <Box
              key={item._id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              mb={4}
              shadow="sm"
              Flex
            >
              <Flex align="center" mb={2}>
                <Box flex="1">
                  <Image
                    src={item.poster.url}
                    alt={item.title}
                    boxSize="100px"
                    minW="70px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                </Box>
                <Box flex="3" px={2}>
                  <Text fontWeight="bold">{item.title}</Text>
                  <Box display={{ base: 'none', md: 'block' }}>
                    <Text>Category:{item.category}</Text>
                    <Text>Creator: {item.createdBy}</Text>
                  </Box>
                </Box>
                <HStack justifyContent={'flex-end'}>
                  <Button
                    onClick={() => window.open(`/courses/${item._id}`)}
                    variant={'outline'}
                    color="purple.500"
                    isLoading={loading}
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => window.open(`./addLecture/${item._id}`)}
                    variant={'outline'}
                    color="purple.500"
                    isLoading={loading}
                  >
                    Add
                  </Button>
                </HStack>
                <Box
                  display={{ base: 'none', md: 'block' }}
                  flex="1"
                  textAlign="right"
                >
                  <Text>Views: {item.views}</Text>
                  <Text>Lectures: {item.numOfVideos}</Text>
                  <Text>
                    Created On: {format(new Date(item.createdAt), 'dd-MM-yyyy')}
                  </Text>
                </Box>
                <Box flex="1" textAlign="right">
                  <Button
                    colorScheme="red"
                    onClick={() => deleteButtonHandler(item._id)}
                    isLoading={loading}
                  >
                    <RiDeleteBin7Fill />
                  </Button>
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      </Box>
      <Box mt="8" display="flex" justifyContent="center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Button
            key={page}
            onClick={() => {
              setPageNo(page);
              scrollToTop();
            }}
            mx="2"
            colorScheme={page === currentPage ? 'teal' : 'gray'}
          >
            {page}
          </Button>
        ))}
      </Box>
    </div>
  );
};

export default AdminCourses;
