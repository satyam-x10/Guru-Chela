import React from 'react';
import { Container, VStack, Heading, Button, Image } from "@chakra-ui/react";
// import {AiFillCloseCircle} from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import busy from '../../assets/images/busy.png'
const NotFound = () => {
    return (

        <Container h={"80ch"}>
        <VStack my={10} h={"full"} alignItems="center" spacing={8}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <Image
              height={{ base: '40vh' }} // Adjust heights for different screen sizes
              src={busy}
              style={{
                animation: 'floatAnimation 4s ease-in-out infinite',
              }}
            />
            <style jsx>{`
              @keyframes floatAnimation {
                0%, 100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-50px); /* Adjust the floating height as needed */
                }
              }
            `}</style>
          </div>
    
          <Heading textAlign={"center"} size="xl">
            Error 404
          </Heading>
          <Heading textAlign={"center"} size="md">
            GuruJi Not Found
          </Heading>
        </VStack>
      </Container>
    );

}

export default NotFound