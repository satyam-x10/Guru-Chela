import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { getNotifications, deleteNotification, clearNotifications } from '../../redux/actions/other'; // Adjust path as necessary
import {
  FaTrash,
} from 'react-icons/fa';
const Notification = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [lastRead, setLastRead] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await getNotifications(user?._id);
        setNotifications(fetchedNotifications?.notifications);
        setLastRead((fetchedNotifications?.lastRead)); // Convert lastRead to Date object
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchNotifications();
  }, [user]);



  useEffect(() => {
    // console.log((lastRead));
    // console.log((notifications[3]?.time));
    // // console.log(lastRead<notifications[3]?.time);
  }, [lastRead, notifications])

  const handleDeleteNotification = async (notificationID) => {
    try {
      await deleteNotification(notificationID);
      // Update notifications state after deletion
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== notificationID)
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
      // Handle error (e.g., show error message)
    }
  };


  return (
    <Box minH="100vh" p="4">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Notifications
      </Text>
      <Flex justifyContent="flex-end" width="100%">
        <Button onClick={() => { clearNotifications(user?._id); setLastRead(Date.now());window.location.reload() }} colorScheme="teal">Mark all as Read</Button>
      </Flex>
      <VStack spacing="4" align="stretch">
        {notifications.sort((a, b) => new Date(b.time) - new Date(a.time)).map((notification) => {
          const notificationTime = new Date(notification.time);
          const isNewNotification = notification.time > lastRead;

          return (
            <Flex
              key={notification._id}
              bg={isNewNotification ? "blue.100" : "gray.100"}
              p="1"
              borderRadius="md"
              alignItems="center"
              my="1"
            >
              <Box onClick={() => { window.location.href = `${notification?.redirect}` }}
                flex="1"
                 cursor="pointer"
                >
                <Text fontSize="lg" fontWeight="semibold">
                  {notification.notification}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {notificationTime.toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </Text>
              </Box>
              <Button colorScheme="red" onClick={() => handleDeleteNotification(notification._id)}>
                <FaTrash />
              </Button>
            </Flex>
          );
        })}

        {notifications.length === 0 && (
          <Text fontSize="lg" color="gray.500">
            No more notifications found
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Notification;
