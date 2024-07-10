import React from 'react';
import { Box, Text, Badge, VStack, HStack, Button } from '@chakra-ui/react';
import {
  FaBoxOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
} from 'react-icons/fa';
import { deleteDoubtTicket } from '../../redux/actions/doubt';

const Ticket = ({ ticket, self, userId }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="2"
      m="1"
      bg="white"
      _dark={{ bg: 'gray.800' }}
    >
      <VStack align="start">
        <HStack>
          <Text fontSize="xl" fontWeight="bold">
            {ticket.title}
          </Text>
          {ticket.resolved ? (
            <Badge colorScheme="green">Resolved</Badge>
          ) : (
            <Badge colorScheme="red">Unresolved</Badge>
          )}
        </HStack>

        <Text fontSize="md" color="gray.600" _dark={{ color: 'gray.400' }}>
          {ticket.description}
        </Text>

        <HStack>
          <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.300' }}>
            Created by: {ticket.createdBy}
          </Text>
          <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.300' }}>
            Created at: {new Date(ticket.createdAt).toLocaleString()}
          </Text>
        </HStack>

        {ticket.resolved && (
          <Text fontSize="md" color="gray.700" _dark={{ color: 'gray.300' }}>
            Resolution Details: {ticket.resolutionDetails}
          </Text>
        )}

        <HStack spacing={4} mt={4} gap={2}>
          {!ticket.resolved && (
            <div>
              {self && (
                <Button
                  onClick={() => {
                    deleteDoubtTicket(userId, ticket._id);
                  }}
                  leftIcon={<FaTrash />}
                  colorScheme="orange"
                ></Button>
              )}
              <Button
                m={1}
                onClick={() => {
                  window.open(`/doubts/${ticket?._id}`);
                }}
                leftIcon={<FaBoxOpen />}
                colorScheme="orange"
              >
                {!self?(<>Contribute</>):(<>check</>)}
              </Button>
            </div>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default Ticket;
