import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
} from '@chakra-ui/react';

const TicketForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resolutionType, setResolutionType] = useState('direct');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      title,
      description,
      resolutionType,
      createdAt: new Date(),
      resolved: false,
      resolutionDetails: '',
    };
    onSubmit(newTicket);
    // setTitle('');
    // setDescription('');
    // setResolutionType('direct');
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      m="auto"
      bg="white"
      _dark={{ bg: "gray.800" }}
      w="100%"
      maxW="md"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minLength={4}
              maxLength={80}
            />
          </FormControl>

          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minLength={10}
              maxLength={300}
            />
          </FormControl>

          <FormControl id="resolutionType" isRequired>
            <FormLabel>Resolution Type</FormLabel>
            <Select
              value={resolutionType}
              onChange={(e) => setResolutionType(e.target.value)}
            >
              <option value="direct">Direct</option>
              <option value="reciprocal">Reciprocal</option>
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="teal" w="full">
            Create Ticket
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default TicketForm;
