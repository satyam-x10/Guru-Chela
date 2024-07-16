import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromPlaylist,
  updateProfilePicture,
} from '../../redux/actions/profile';
import { cancelSubscription, myProfile } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
import { DeleteIcon, Icon } from '@chakra-ui/icons';
const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.profile);

  const {
    loading: subscriptionLoading,
    message: subscriptionMessage,
    error: subscriptionError,
  } = useSelector(state => state.subscription);

  const removeFromPlaylistHandler = async id => {
    await dispatch(removeFromPlaylist(id));
    dispatch(myProfile());
  };

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();

    // console.log(image);
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));

    dispatch(myProfile());
  };

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription());
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

    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch({ type: 'clearMessage' });
      dispatch(myProfile());
    }

    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, error, message, subscriptionError, subscriptionMessage]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#ECC94B',
    backgroundColor: 'white',
  };
  // console.log('user ', user);

  return (
    <>
      <div>
        <Container minH={'80vh'} maxW="container.sm" py="10">
          <Heading m="4" textAlign={['center', 'left']}>
            Profile
          </Heading>
          <Stack
            direction={['column', 'row']}
            alignItems="center"
            justifyContent={['center', 'flex-start']}
            spacing={['8', '16']}
            padding={'8'}
          >
            <VStack spacing={'4'}>
              <Avatar src={user?.avatar.url} size="2xl" />
              <Button onClick={onOpen} colorScheme="teal" variant="solid">
                Change Photo
              </Button>
            </VStack>

            <VStack spacing={'4'} alignItems={['flex-start', 'flex-start']}>
              <HStack spacing={'3'}>
                <Text fontWeight={'bold'}>Name</Text>
                <Text>{user?.name}</Text>
              </HStack>
              <HStack spacing={'3'}>
                <Text fontWeight={'bold'}>Email</Text>
                <Text>{user?.email}</Text>
              </HStack>
              <HStack spacing={'3'}>
                <Text fontWeight={'bold'}>Created At</Text>
                <Text>{user?.createdAt.split('T')[0]}</Text>
              </HStack>
              <HStack spacing={'3'}>
                <Text fontWeight={'bold'}>Role</Text>
                <Text>{user?.role}</Text>
              </HStack>

              {user?.role !== 'admin' ? (
                <>
                  <HStack spacing={'3'}>
                    <Text fontWeight={'bold'}>Subscription</Text>
                    {user?.subscription &&
                    user?.subscription.status === 'active' ? (
                      <>
                        <Button
                          colorScheme="teal"
                          variant="ghost"
                          onClick={cancelSubscriptionHandler}
                        >
                          Cancel Subscription
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/subscribe">
                          <Button colorScheme="teal" variant="ghost">
                            Subscribe
                          </Button>
                        </Link>
                      </>
                    )}
                  </HStack>
                </>
              ) : (
                <></>
              )}

              <Stack
                direction={['column', 'row']}
                spacing={'3'}
                alignItems="center"
                px={['8', '0']}
                justifyContent={['center', 'center']}
                my={'4'}
              >
                <Link to="/updateprofile">
                  <Button colorScheme="teal" variant="solid">
                    Update Profile
                  </Button>
                </Link>

                <Link to="/changepassword">
                  <Button colorScheme="teal" variant="solid">
                    Change Password
                  </Button>
                </Link>
              </Stack>
            </VStack>
          </Stack>

          <ChangePhotoBox
            changeImageSubmitHandler={changeImageSubmitHandler}
            isOpen={isOpen}
            onClose={onClose}
            loading={loading}
          />
        </Container>
      </div>
      <div>
        <span
          style={{ fontWeight: 'bold', fontSize: '20px', margin: '2px 10px' }}
        >
          Ur Saved Playlists
        </span>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {user?.playlist.length ? (
            user?.playlist.map((playlist, index) => (
              <div
                key={index}
                className="playlist-item"
                onClick={() =>
                  (window.location.href = `../courses/${playlist.course}`)
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '10px 0',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  maxWidth: '300px',
                  gap: '5px',
                }}
              >
                <img
                  style={{
                    height: '50px',
                    width: '50px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    marginRight: '15px',
                  }}
                  src={playlist.poster}
                  alt={`${playlist.course} poster`}
                  className="playlist-image"
                />
                <div className="playlist-info" style={{ flexGrow: 1 }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '18px',
                    }}
                  >
                    {playlist.title}
                  </h3>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    // console.log(playlist.course);
                    removeFromPlaylistHandler(playlist.course);
                  }}
                  style={{
                    padding: '5px 10px',
                    fontSize: '14px',
                    color: '#fff',
                    backgroundColor: '#ff4d4d',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
            ))
          ) : (
            <span style={{ padding: '10px', margin: '10px', color: 'red' }}>
              Your playlist is empty
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {
  const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#ECC94B',
    backgroundColor: 'white',
  };
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImage}
                />

                <Button
                  isLoading={loading}
                  w="full"
                  colorScheme={'teal'}
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
