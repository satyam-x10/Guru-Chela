import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getAllUsers as getUsers,
  updateUserRole,
} from '../../../redux/actions/admin';
import toast from 'react-hot-toast';

const Users = () => {
  const { users, loading, error, message } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  const updateHandler = userId => {
    dispatch(updateUserRole(userId));
  };
  const deleteButtonHandler = userId => {
    dispatch(deleteUser(userId));
  };
  const [SearcUserName, SetSearcUser] = useState('');
  const [SearchRole, SetSearchRole] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getUsers(SearcUserName, SearchRole));
  }, [dispatch, error, message, SearcUserName, SearchRole]);

  return (
    <Box
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Sidebar />
      <Box p={"10px"}>
      <Input
        value={SearcUserName}
        onChange={e => SetSearcUser(e.target.value)}
        placeholder="Search User by  name"
        type={'text'}
        focusBorderColor="teal.500"
        my="4"
      />
      <Input
        value={SearchRole}
        onChange={e => SetSearchRole(e.target.value)}
        placeholder="Search User by  role"
        type={'text'}
        focusBorderColor="teal.500"
        my="4"
      />
      </Box>
      <Box p={['0', '6']} >
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          textAlign={['center', 'left']}
        />


        <Box>
          <Text fontSize="xl" mb={4}>All available users in the database</Text>

          {users && (
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)',lg:'repeat(3, 1fr)' }}
              gap={6}
            >
              {users.map(item => (
                <Flex flexShrink={1} key={item._id} alignItems="center" borderWidth="1px" borderRadius="lg" p={4} mb={4}>
                  <Box mr={{ base: 2, md: 4 }} mb={{ base: 4, md: 0 }} flexShrink={0}>
                    <img src={item.avatar.url} alt={item.name} style={{ borderRadius: '50%', width: '64px', height: '64px' }} />
                  </Box>

                  <Box flex="1">
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text>{item.email}</Text>
                    <Text>{item.role}</Text>
                    <Text>{item.subscription.status}</Text>
                  </Box>

                  <Box >
                    <Text p={1} borderRadius={"10px"} fontWeight="bold" color="blue.500" cursor="pointer" border="1px" borderColor="blue.500" pb={1} mb={2} onClick={() => updateHandler(item._id)}>Update</Text>
                    <Text p={1} borderRadius={"10px"} fontWeight="bold" color="red.500" cursor="pointer" border="1px" borderColor="red.500" pb={1} onClick={() => deleteButtonHandler(item._id)}>Delete</Text>
                  </Box>
                </Flex>
              ))}

            </Grid>
          )}

        </Box>
      </Box>


    </Box>
  );
};

export default Users;

function Row({ item, updateHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription && item.subscription.status === 'active'
          ? 'Active'
          : 'Not Active'}
      </Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => updateHandler(item._id)}
            variant={'outline'}
            color="purple.500"
            isLoading={loading}
          >
            Change Role
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
