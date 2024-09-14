import { Spinner, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Loader = ({ color = 'teal.500' }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <VStack h="100vh" justifyContent="center" spacing={4}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="transparent"
        color={color}
        size="xl"
      />
      {isHomePage && (
        <Text fontSize="lg" color="gray.500" textAlign="center" px={4}>
          Sometimes it can take a while to restart inactive servers.
          <br />
          Please wait a minute or two.
        </Text>
      )}
    </VStack>
  );
};

export default Loader;
