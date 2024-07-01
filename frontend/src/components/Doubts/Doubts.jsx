import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, VStack } from '@chakra-ui/react';
import Ticket from './Ticket';
import TicketForm from './TicketForm';
import { createDoubt, getAllDoubts } from '../../redux/actions/doubt';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Doubts = user => {
  const [userId, setuserId] = useState(user?.user?._id);
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
  const { message, myDoubts,othersDoubts, error } = useSelector(state => state.doubt);
  console.log('got it ', myDoubts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, message, error]);

  useEffect(() => {
    if (!userId) return;
    dispatch(getAllDoubts(userId));
  }, [userId]);

  const handleCreateTicket = newTicket => {
    newTicket = { ...newTicket, userId };
    if (!userId) return;

    dispatch(createDoubt(newTicket));
  };

  return (
    <Box p={4}>
      {/* <Grid templateColumns={['1fr','1fr 1fr', '1fr 2fr']} gap={0}>
        <GridItem  colSpan={[1, 1]}>
          <TicketForm onSubmit={handleCreateTicket} />
        </GridItem>
        <GridItem>
          <Box style={{ display: 'flex',flexWrap:"wrap",justifyContent:"center",alignItems:"center" }} spacing={6}>
            {doubts &&
              doubts[0]?.tickets.map(ticket => (
                <Ticket key={ticket._id} ticket={ticket} />
              ))}
          </Box>
        </GridItem>
      </Grid> */}
      <Grid templateColumns={['1fr','1fr 1fr', '1fr 2fr']} gap={0}>
        <GridItem  colSpan={[1, 1]}>
          <TicketForm onSubmit={handleCreateTicket} />
        </GridItem>
        <GridItem>
          <Box style={{ display: 'flex',flexWrap:"wrap",justifyContent:"center",alignItems:"center" }} spacing={6}>
            {myDoubts &&
              myDoubts[0]?.tickets.map(ticket => (
                <Ticket key={ticket._id} ticket={ticket} />
              ))}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Doubts;
