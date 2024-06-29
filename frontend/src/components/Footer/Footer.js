import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';
import { FaLinkedin } from 'react-icons/fa';

import { TiSocialLinkedinCircular } from "react-icons/ti";
const Footer = () => {
  return (
    <div style={{ position: 'relative', bottom: '0' }} >
      <Box padding={['1','4']} bg="blackAlpha.900" minH={'10vh'} >
        <Stack direction={['row']} style={{alignItems:"center"}}>
          <Heading children="No Rights Reserved"  color={'white'} fontSize={['20px','24px']} style={{width:"100%"}}  />
          <HStack
            spacing={['2', '2']}
            justifyContent="center"
            color={'white'}
            fontSize="50"
          >
            <a href="https://www.linkedin.com/in/satyamx10/" target={'blank'}>
              <TiSocialLinkedinCircular />
            </a>
            <a href="https://www.instagram.com/satyamx_10/" target={'blank'}>
              <TiSocialInstagramCircular />
            </a>
            <a href="https://github.com/satyam-x10" target={'blank'}>
              <DiGithub />
            </a>
          </HStack>
        </Stack>
      </Box>
    </div>
  );
};

export default Footer;
