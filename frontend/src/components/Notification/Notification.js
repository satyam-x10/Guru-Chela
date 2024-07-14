import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { getNotifications, deleteNotification } from '../../redux/actions/other'; // Adjust path as necessary

const Notification = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [lastRead, setLastRead] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await getNotifications(user?._id);
        setNotifications(fetchedNotifications?.notifications);
        setLastRead(new Date(fetchedNotifications?.lastRead)); // Convert lastRead to Date object
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Handle error (e.g., show error message)
      }
    };

    fetchNotifications();
  }, [user]);

  useEffect(()=>{
    console.log(new Date(lastRead));
    console.log(new Date(notifications[0]?.time));
  },[lastRead,notifications])

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
      <VStack spacing="4" align="stretch">
        {notifications.sort((a, b) => new Date(b.time) - new Date(a.time)).map((notification) => {
          const notificationTime = new Date(notification.time);
          const isNewNotification = notificationTime.getTime() > lastRead.getTime();

          return (
            <Flex
              key={notification._id}
              bg={isNewNotification ? "blue.100" : "gray.100"}
              p="4"
              borderRadius="md"
              alignItems="center"
              my="2"
            >
              <Box flex="1">
                <Text fontSize="lg" fontWeight="semibold">
                  {notification.notification}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {notificationTime.toLocaleString()}
                </Text>
              </Box>
              <Button colorScheme="red" onClick={() => handleDeleteNotification(notification._id)}>
                Delete
              </Button>
            </Flex>
          );
        })}

        {notifications.length === 0 && (
          <Text fontSize="lg" color="gray.500">
            No notifications found
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Notification;
