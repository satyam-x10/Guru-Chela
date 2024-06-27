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
import React from 'react';
import { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useColorMode } from '@chakra-ui/react';
const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  addLectureHandler,
  courseTitle,
  coursePoster,
  lectures = [],
  loading,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

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

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      size="full"
      onClose={handleClose}
      scrollBehavior="outside"
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box my="5">
            <Heading children={courseTitle} />
            <Heading children={`#${id}`} size="sm" opacity={0.4} />
          </Box>
          <Box>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-around"
              wrap="wrap"
            >
              <Image
                style={{ height: "300px", borderRadius: "50px", objectFit: "cover" }}
                src={coursePoster}
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
                    isLoading={loading}
                    w="full"
                    colorScheme="purple"
                    type="submit"
                  >
                    Upload
                  </Button>
                </VStack>
              </form>
            </Flex>
          </Box>
          <Box padding={["20px 10px"]}>


            <Heading children={'Lectures from this Course'} size="lg" />
            <br></br>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
              {lectures.map((item, i) => (
                <VideoCard
                  key={i}
                  title={item.title}
                  description={item.description}
                  posterUrl={coursePoster}
                  num={i + 1}
                  lectureId={item._id}
                  courseId={id}
                  deleteButtonHandler={deleteButtonHandler}
                  loading={loading}
                />
              ))}
            </SimpleGrid>
          </Box>


        </ModalBody>

        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  posterUrl,
  lectureId,
  courseId,
  deleteButtonHandler,
  loading,
}) {
  const { colorMode } = useColorMode();

const bgColor = {
  light: "#fafaf3ff", // Light mode background color
  dark: "#1a202c", // Dark mode background color
};

  return (
    <div style={{
      display: "flex",
      justifyContent: 'space-between',
      alignItems: 'center',
      background:`${bgColor[colorMode]}`,
      borderRadius: '5px',
      margin: "5px",
      padding:"0 5PX 0 0",
      maxWidth:'500px',
      cursor:"pointer",
      boxShadow:"2px 2px #1a202c22"
    }}>

      {/* Poster image */}
      <div style={{
        flexShrink: 1,  // Prevents the poster from shrinking
        margin: "0px 5px 0 0", // Add space between the content and the poster image
        maxWidth: "150px", // Adjust maximum width as needed
      }}>
        <img
          src={posterUrl}
          alt={` ${title} poster`}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: '5px' // Add border radius for poster image
          }}
        />
      </div>
      {/* Left side content */}
      <div style={{ display: 'flex', flex: 1, flexFlow: 'column', flexDirection: "column", justifyContent: "space-around", height: "100%" }}>
        <Heading
          size={'sm'}
          children={`${num}. ${title}`}
          // mb="15px"
          color="#81e6d9"
          fontWeight="bold"
          fontSize="20px"
          // flex={1}
        />
        <p>{description.substring(0, 35)} ....</p>
      </div>

      {/* Right side content */}
      <div style={{
        border: "solid 2px #81e6d9",
        backgroundColor: "#81e6d9",
        padding: "10px",
        borderRadius: '5px',
        margin: '0 5px 0 0 ',
        cursor: "pointer",
        marginLeft: "5px" // Add space between the content and the delete button
      }}>
        <RiDeleteBin7Fill onClick={() => deleteButtonHandler(courseId, lectureId)} />
      </div>


    </div>
  );
}

