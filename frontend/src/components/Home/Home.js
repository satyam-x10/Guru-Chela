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
      <div className="container">

        <Stack direction={["column", "row"]} spacing={["16"]} justifyContent={["center", "space-around"]} alignItems={['center', 'center']}>
          <div alignItems="center">

            <Image
              objectFit='contain'
              src={bg}
              alt='Industry Ready'
              alignItems={['center', 'flex-start']}
              className="bgImage"

            />

          </div>
          <VStack alignItems={["flex-end"]} padding={["20px", "20px"]}  >
            <Heading className="text">Introducing Guru-Chela</Heading>
            <Text className="text"> where learning meets sharing. Exchange skills seamlessly. Post your query, swap knowledge, and grow together.</Text>
            <br></br>
            <Text className="text"> Rate your sessions, build your profile, and discover endless learning possibilities. Join Guru-Chela and transform how you learn today.</Text>

            <div>
              <Link style={{margin:'10px'}} to="/courses" >
                <Button colorScheme='teal' variant='solid' className='btn'>
                  Explore Courses
                </Button>
              </Link>
              <Link to="/doubts" >
                <Button colorScheme='teal' variant='solid' className='btn'>
                  Explore Doubts
                </Button>
              </Link>
            </div>

          </VStack>


        </Stack>
      </div>

      {/* <Box className="container2" bg="blackAlpha.800" >

      <Heading className='heading' color={"#319795"}>
        Our Brands
      </Heading>
      <HStack width={"100%"}  height={["100px", "200px"]} justifyContent={"space-around"}>
        
        <CgGoogle className='icon'/>
        <CgYoutube className='icon'/>
        <VscGithubInverted className='icon'/>
        <SiCoursera className='icon'/>
        <SiUdemy className='icon'/>
        <FaAws className='icon'/>
      </HStack>
    </Box> */}
    </>
  )
}

export default Home