import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  VStack,
  useDisclosure,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  CloseIcon,
  LinkIcon,
  PlusSquareIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { myProfile } from '../../redux/actions/user';

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      border="solid 2px white"
      alignItems="center"
      boxShadow="md"
      borderRadius="lg"
      overflow="hidden"
      margin={['10px']}
      maxWidth="100%"
      padding="10px"
    >
      {/* Image */}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Image
          src={imageSrc}
          alt={title}
          boxSize={['100px', '120px', '140px']} /* Responsive image size */
          objectFit="cover"
          borderRadius={[
            '10px 0 0 10px',
            '10px',
          ]} /* Rounded corners on left side */
        />
        {/* Details */}
        <Box flex="1" p="4">
          <Heading size="sm" fontFamily="sans-serif" mb="1" noOfLines={2}>
            {title}
          </Heading>
          <Box fontSize="sm" mb="2" color="#2c7a7b" noOfLines={3}>
            {description}
          </Box>
          <Box fontSize="sm" color="gray.600" mb="2">
            Creator: {creator}
            <br></br>
            Lectures: {lectureCount}
            <br></br>
            Views: {views}
          </Box>
        </Box>
      </div>
      {/* Buttons */}
      <Box mt="auto">
        <Link to={`/courses/${id}`} textDecoration="none">
          <Button colorScheme="teal" mr="2">
            Watch Now
          </Button>
        </Link>
        {useBreakpointValue({
          base: (
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={() => addToPlaylistHandler(id, title)}
            >
              <PlusSquareIcon />
            </Button>
          ),
          md: (
            <Button
              isLoading={loading}
              variant="ghost"
              colorScheme="teal"
              onClick={() => addToPlaylistHandler(id, title)}
            >
              Add to Playlist
            </Button>
          ),
        })}
      </Box>
    </Box>
  );
};

const Courses = admin => {
  const [keyword, setKeyword] = useState('');
  const [pageNO, setPageNO] = useState(1);
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addToPlaylistHandler = async (courseId, courseTitle) => {
    await dispatch(addToPlaylist(courseId, courseTitle));
    dispatch(myProfile());
  };

  const [categories, setCategories] = useState(
    admin?.admin[0]?.courseCategories || []
  );

  const { loading, courses, currentPage, totalPages, error, message } =
    useSelector(state => state.course);

  useEffect(() => {
    dispatch(getCourses(category, keyword, pageNO));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch, error, message, pageNO]);

  console.log(currentPage, totalPages);
  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading fontSize="2xl" mb="4">
        All Courses from Your Gurukul
      </Heading>

      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type={'text'}
        focusBorderColor="teal.500"
        mb="4"
      />

      <div>
        <div
          onClick={onOpen}
          style={{
            display: 'inline-block',
            background: '#2c7a7b',
            padding: '5px',
            borderRadius: '5px',
            color: 'white',
            marginBottom: '10px',
          }}
        >
          <span>Sort by category</span>
          <IconButton
            icon={<LinkIcon />}
            color={'black'}
            aria-label="Open menu"
            margin={[1]}
          />
        </div>
      </div>
      {category && (
        <span
          style={{
            border: 'solid 2px black',
            padding: '5px',
            borderRadius: '10px',
          }}
        >
          {category}
          <CloseIcon
            onClick={() => {
              setCategory('');
            }}
            style={{ margin: '5px', cursor: 'pointer' }}
          />
        </span>
      )}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>Categories</DrawerHeader>
            <DrawerBody>
              {categories.map((item, index) => (
                <Button
                  w="100%"
                  margin="1"
                  key={index}
                  onClick={() => {
                    setCategory(item.category);
                    onClose();
                  }}
                >
                  {item.category}
                </Button>
              ))}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }}>
          {courses.length > 0 ? (
            courses.map(item => (
              <Course
                key={item._id}
                title={item.title}
                description={item.description}
                views={item.views}
                imageSrc={item.poster.url}
                id={item._id}
                creator={item.createdBy}
                lectureCount={item.numOfVideos}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
              />
            ))
          ) : (
            <Heading mt="4" gridColumn="1 / -1">
              Courses Not Found
            </Heading>
          )}
        </SimpleGrid>
      </Stack>
      <Box mt="8" display="flex" justifyContent="center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Button
            key={page}
            onClick={() => setPageNO(page)}
            mx="2"
            colorScheme={page === currentPage ? 'teal' : 'gray'}
          >
            {page}
          </Button>
        ))}
      </Box>
    </Container>
  );
};

export default Courses;
