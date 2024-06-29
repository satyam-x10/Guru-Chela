import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  WrapItem,
  position,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useColorMode } from '@chakra-ui/react';
import { addLecture, deleteLecture } from '../../../redux/actions/admin';

import { getAdminCourse, getCourseLectures, getCourses } from '../../../redux/actions/course';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
const AdminCourse = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');
  const id = useParams().id
  console.log(id);
  const [CourseData, setCourseData] = useState();

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await getAdminCourse(id);
        const data = await response;
        console.log('lll', data);
        setCourseData(data.course);
      } catch (error) {
        console.error('Failed to fetch course data', error);
      }
    };

    getCourse();
  }, [id]);


  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);

    await dispatch(addLecture(courseId, myForm));

    // dispatch(getCourseLectures(courseId));
    window.location.reload();
  };

  const fileUploadCss = {
    cursor: 'pointer',

    width: '10%',

    height: '100%',
    visibility: 'hidden'
  };


  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  return (
    <Box
      w="full"
      overflow="auto"
      p={4}
    >
      <Heading children={CourseData?.title} />

      <Box>
        <Box style={{ fontSize: "20px" }}>
          {CourseData?.description}
        </Box>

        <Box mt={4}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-around"
            wrap="wrap"
            margin="10px"
          >
            <Image
              style={{ height: "300px", borderRadius: "50px", objectFit: "cover" }}
              src={CourseData?.poster.url}
              m={{ base: "0 auto", md: "0" }}
            />

            <form
              onSubmit={async (e) => {
                await addLectureHandler(e, id, title, description, video);
                setTitle('');
                setDescription('');
                setVideo('');
                setVideoPrev('');
              }}
              style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}
            >
              <VStack spacing="4">
                <Heading size="md" textTransform="uppercase">
                  Add Lecture
                </Heading>

                <Input
                  focusBorderColor="purple.300"
                  placeholder="Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <Input
                  focusBorderColor="purple.300"
                  placeholder="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />

                <Input
                  accept="video/mp4"
                  required
                  type="file"
                  focusBorderColor="purple.300"
                  css={{
                    '&::file-selector-button': {
                      ...fileUploadCss,
                      color: 'purple',
                    },
                  }}
                  onChange={changeVideoHandler}
                />

                {videoPrev && (
                  <video controlsList="nodownload" controls src={videoPrev}></video>
                )}

                <Button
                  w="full"
                  colorScheme="purple"
                  type="submit"
                >Upload</Button>
              </VStack>
            </form>
          </Flex>
        </Box>
      </Box>
      <Box padding={["20px 10px"]}>


        <Heading children={'Recent Lectures from this Course'} size="lg" />
        <><Button colorScheme="purple" margin="10px" onClick={() => { window.open(`/courses/${id}`) }} >See All from this course</Button></>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {CourseData?.lectures.slice().reverse().map((item, i) => (
            <VideoCard
              key={i}
              title={item.title}
              courseId={id}
              lectureId={item._id}
            />
          ))}
        </SimpleGrid>

      </Box>
    </Box>

  );
};

export default AdminCourse;

function VideoCard({
  title, courseId, lectureId
}) {
  const { colorMode } = useColorMode();

  const bgColor = {
    light: "#ffffffff", // Light mode background color
    dark: "#1a202c", // Dark mode background color
  };
  const dispatch = useDispatch();
  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    window.location.reload();
  };
  return (
    <div style={{
      display: "flex",
      justifyContent: 'space-between',
      alignItems: 'center',
      background: `${bgColor[colorMode]}`,
      borderRadius: '5px',
      margin: "5px",
      padding: "5px",
      maxWidth: '500px',
      border: "solid 1px"
    }}>

      {/* Left side content */}
      <div style={{ display: 'flex', flex: 1, flexFlow: 'column', flexDirection: "column", justifyContent: "space-around", height: "100%" }}>
        <Heading
          size={'sm'}
          children={`${title}`}
          // mb="15px"
          fontWeight="bold"
          fontSize="20px"
        // flex={1}
        />
      </div>

      {/* Right side content */}
      <div style={{
        padding: "10px",
        borderRadius: '5px',
        margin: '0 5px 0 0 ',
        cursor: "pointer",
        marginLeft: "5px" // Add space between the content and the delete button
      }}>
        <RiDeleteBin7Fill onClick={() => { deleteLectureButtonHandler(courseId, lectureId) }} />
      </div>


    </div>
  );
}

