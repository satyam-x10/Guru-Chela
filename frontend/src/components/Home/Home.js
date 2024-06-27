import React from 'react'
import { Stack, HStack, VStack, Text, Heading, Button, Image, Box } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import "./Home.css";
import bg from "../../assets/images/bg.png";
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { VscGithubInverted } from "react-icons/vsc";
import { SiCoursera, SiUdemy } from "react-icons/si";
import { FaAws } from "react-icons/fa";

// import {TbBrandYoutube} from 'react-icons/tb';

const Home = () => {
  return (
    <>
      <Stack direction={["row"]} spacing={["16"]} justifyContent={["center", "space-around"]} alignItems={['center', 'center']}>

        <VStack alignItems={["flex-end"]} padding={["20px", "20px"]}  >
          <Heading className="text">Introducing Guru-Chela</Heading>
          <Text className="text"> where learning meets sharing. Exchange skills seamlessly. Post your query, swap knowledge, and grow together.</Text>
          <br></br>
          <Text className="text"> Rate your sessions, build your profile, and discover endless learning possibilities. Join Guru-Chela and transform how you learn today.</Text>

          <div >
            <Link style={{ margin: '10px' }} to="/courses" >
              <Button colorScheme='teal' variant='solid' className='btn'>
                Explore Courses
              </Button>
            </Link>
            <Link style={{ margin: '10px' }} to="/doubts" >
              <Button colorScheme='teal' variant='solid' className='btn'>
                Explore Doubts
              </Button>
            </Link>
          </div>

        </VStack>

      </Stack>
      <Stack direction={["row"]} spacing={["16"]} justifyContent={["center", "space-around"]} alignItems={['center', 'center']}>

        <Box padding={["4"]}>

          <Heading className="text" fontSize="md" >
            The Guru is Brahma (the creator),
            the Guru is Vishnu (the preserver),
            the Guru is Shiva (the destroyer).
            The Guru is verily the supreme absolute.
            Salutations to that revered Guru.

          </Heading>
          <br></br>
          <Heading className="text" fontSize="md">
            गुरुर्ब्रह्मा गुरुर्विष्णुर्गुरुर्देवो महेश्वरः।
            गुरु: साक्षात्परं ब्रह्म तस्मै श्रीगुरवे नमः॥
          </Heading>
        </Box>


      </Stack>
      <div style={{ height: '100vh', backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="container">
      </div>

    </>
  )
}

export default Home