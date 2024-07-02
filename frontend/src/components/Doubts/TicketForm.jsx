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
  Flex,
  Spacer,
  Heading,
} from '@chakra-ui/react';
import { FaTicketAlt } from 'react-icons/fa';

const TicketForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resolutionType, setResolutionType] = useState('direct');

  const handleSubmit = e => {
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
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="2"
      m="2 0"
      bg="white"
      _dark={{ bg: 'gray.800' }}
      w="100%"
      maxW="md"
      direction="column"
    >
      <Button
        float="right"
        m={1}
        p={1}
        leftIcon={<FaTicketAlt />}
        colorScheme="orange"
        onClick={()=>window.open(`./doubts/pairup`)}
      >
        Check Others Ticket
      </Button>
      <Spacer />
      <Heading
        borderBottomWidth="2px"
        borderBottomColor="orange"
        borderBottomStyle="solid"
        children="Or make ur own"
        mb={2}
      />
      <form 
        onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              minLength={4}
              maxLength={80}
            />
          </FormControl>

          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              minLength={10}
              maxLength={300}
            />
          </FormControl>

          <FormControl id="resolutionType" isRequired>
            <FormLabel>Resolution Type</FormLabel>
            <Select
              value={resolutionType}
              onChange={e => setResolutionType(e.target.value)}
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
    </Flex>
  );
};

export default TicketForm;
