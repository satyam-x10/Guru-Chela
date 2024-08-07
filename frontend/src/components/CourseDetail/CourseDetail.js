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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../Loader/Loader';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { deleteLecture } from '../../redux/actions/admin';
import headphoneIcon from '../../assets/images/audioIcon.png';
import VideoIcon from '../../assets/images/videoIcon.png';
import { askGemini } from '../../redux/actions/gemini';
import axios from 'axios';
import { server } from '../../redux/Store';

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const { course, loading, currentPage, maxPage } = useSelector(
    (state) => state.course
  );
  const lectures = course?.lectures;
  console.log(course);
  const dispatch = useDispatch();
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [following, setFollowing] = useState()

  useEffect(() => {
    setFollowing((course?.followedBy?.includes(user?._id)) ? true : false)
  }, [course])


  useEffect(() => {
    dispatch(getCourseLectures(params.id, pageNo));
  }, [dispatch, params.id, pageNo]);

  const [Roadmap, setRoadmap] = useState('Loading...');
  const [isRoadmap, setIsRoadmap] = useState(false);

  const getRoadmap = async () => {
    onOpen();
    const prompt = { title: course?.title || '', description: course?.description || '' };
    setIsRoadmap(true);
    const res = await askGemini(prompt, 'roadmap');
    // console.log(res);
    setRoadmap(res);
  };

  const downloadRoadmap = () => {
    const element = document.createElement('a');
    const file = new Blob([Roadmap], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'roadmap.txt';
    document.body.appendChild(element);
    element.click();
  };


  const followCourse = async () => {
    try {
      const response = await axios.put(`${server}/followCourse`, {
        userId: user?._id,
        courseId: params.id
      });
      const data = response.data;
      setFollowing(!following)
      return data;
    } catch (error) {
      console.error("Error following course:", error.response ? error.response.data : error.message);
      throw error;
    }
  };


  if (
    user?.role !== 'admin' &&
    (!user?.subscription || user?.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  if (loading) {
    return <Loader />;
  }

  if (!course) {
    return <Heading>No Course Found</Heading>;
  }
  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
  };
  return (
    <div>
      <Grid templateColumns={{ base: '1fr', md: '1fr 2fr' }} gap={4} minH="90vh" p={4}>
        <GridItem>
          <Box>
            <Image
              src={course.poster.url}
              alt={`${course.title} poster`}
              mb={4}
              borderRadius="md"
            />
            <Button m={2} onClick={getRoadmap} colorScheme="orange">
              Get Roadmap to study this course
            </Button>
            <Button m={2} onClick={followCourse} colorScheme="teal">
              {following ? "UnFollow" : "Follow"}
            </Button>
            <Heading as="h1" size="md" mb={2}>
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
                    cursor="pointer"
                    bg={index === lectureNumber ? 'teal.500' : 'gray.200'}
                    color={index === lectureNumber ? 'white' : 'black'}
                    _hover={{ bg: 'teal.400', color: 'white' }}
                  >
                    <Image
                      src={lecture?.url?.endsWith('.mp3') ? headphoneIcon : lecture?.thumbnail ? lecture.thumbnail : VideoIcon}
                      alt={`${lecture.title} poster`}
                      mb={2}
                      onClick={() => {
                        setLectureNumber(index);
                        window.open(`/lecture/${course._id}/${lecture._id}`, '_blank');
                      }}
                      borderRadius="md"
                    />
                    <Heading as="h4" size="sm" mb={2}>
                      {(pageNo - 1) * 10 + index + 1}. {lecture.title}
                    </Heading>
                    {user?.role === 'admin' && (
                      <RiDeleteBin7Fill
                        onClick={() => {
                          deleteLectureButtonHandler(params.id, lecture._id);
                        }}
                      />
                    )}
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
        {Array.from({ length: maxPage }, (_, i) => i + 1).map((page) => (
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Roadmap for {course.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{Roadmap}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={downloadRoadmap}>
              Download
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CoursePage;
