import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, VStack } from '@chakra-ui/react';
import Ticket from './Ticket';
import TicketForm from './TicketForm';
import { createDoubt } from '../../redux/actions/doubt';
import { useDispatch } from 'react-redux';

const Doubts = () => {
  const [tickets, setTickets] = useState([
    {
      _id: '1',
      title: 'Doubt about React Hooks',
      description: 'Can someone explain how to use useEffect in detail?',
      createdBy: { name: 'John Doe' },
      createdAt: new Date(),
      resolved: false,
      resolutionDetails: '',
    },
    // Add more tickets as needed
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch initial tickets if needed
  }, [dispatch]);

  const handleCreateTicket = (newTicket) => {
    dispatch(createDoubt(newTicket));
  };

  return (
    <Box p={4}>
      <Grid templateColumns={["1fr", "1fr 1fr"]} gap={6}>
        <GridItem colSpan={[1, 1]}>
          <TicketForm onSubmit={handleCreateTicket} />
        </GridItem>
        <GridItem colSpan={[1, 1]}>
          <VStack spacing={6}>
            {tickets.map((ticket) => (
              <Ticket key={ticket._id} ticket={ticket} />
            ))}
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Doubts;
