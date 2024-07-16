import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, GridItem, Image, VStack } from '@chakra-ui/react';
import Ticket from './Ticket';
import TicketForm from './TicketForm';
import { createDoubt, getAllDoubts } from '../../redux/actions/doubt';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FaTicketAlt } from 'react-icons/fa';
import AiGurujiBtn from '../aiGuruji/aiGurujiBtn';

const Doubts = user => {
  const [userId, setuserId] = useState(user?.user?._id);

  const { message, myDoubts, error } = useSelector(state => state.doubt);
  // console.log('got it ', myDoubts);
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
    <Box minH={'100vh'} p={0}>
      <Grid Flex={1} templateColumns={['1fr', '1fr', '1fr 3fr']} gap={0}>
        <GridItem m="auto" minWidth="400px" colSpan={[1, 1]}>
          <AiGurujiBtn />
          <TicketForm onSubmit={handleCreateTicket} />
        </GridItem>
        <GridItem>
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'start',
              alignItems: 'start',
            }}
            spacing={6}
          >
            {myDoubts &&
              myDoubts[0]?.tickets.map(ticket => (
                <Ticket
                  key={ticket._id}
                  ticket={ticket}
                  self={true}
                  userId={userId}
                />
              ))}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Doubts;
