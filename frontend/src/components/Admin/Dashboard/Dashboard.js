import React from 'react';
import { Grid, Box, Text, Heading, Stack } from '@chakra-ui/react';
import Sidebar from '../Sidebar.js';
import DataBox from './DataBox.js';
import Bar from './Bar.js';
import { LineChart } from './Chart.js';

const Dashboard = () => {
  return (
    <>
      <Box
       
        minH={'100vh'}
        templateColumns={['1fr', '5fr 1fr']}
      >
        {/* Sidebar Here */}
        <Sidebar />
      </Box>
    </>
  );
};

export default Dashboard;
