import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { myProfile } from '../../redux/actions/user';



const Doubts = () => {
 
  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      Doubts
    </Container>
  );
};

export default Doubts;
