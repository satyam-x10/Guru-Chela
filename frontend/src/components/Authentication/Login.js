import React, { useState } from 'react';
import {
  Container,
  VStack,
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './auth.css';
import { useDispatch } from 'react-redux';
import { loginAction } from '../../redux/actions/user?.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  const loginAsDummyUser = () => {
    // Set dummy user credentials
    setEmail('user@gmail.com');
    setPassword('12345678');

    // Automatically submit the form after setting the credentials
    dispatch(loginAction('user@gmail.com', '12345678'));
  };

  return (
    <>
      <Container h={'80vh'}>
        <VStack h={'full'} alignItems={'flex-start'} justifyContent="center">
          <Heading my={6} fontSize={'28'} textAlign={['center', 'left']}>
            Welcome to Guru-Chela
          </Heading>

          <form style={{ width: '100%' }} onSubmit={submitHandler}>
            <Box my={'4'}>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  placeholder="abc@gmail.com"
                  focusBorderColor="teal.400"
                  id="email"
                  value={email}
                  onChange={handleEmail}
                  type={'email'}
                />
              </FormControl>
            </Box>
            <Box my={'4'}>
              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  placeholder="Enter Your Password"
                  id="password"
                  focusBorderColor="teal.400"
                  value={password}
                  onChange={handlePassword}
                  type={'password'}
                />
              </FormControl>
            </Box>

            <Box my={'4'}>
              <Link to="/forgotPassword">
                <Button
                  variant="link"
                  className="forgot-password"
                  style={{ textDecoration: 'none' }}
                >
                  Forgot Password?
                </Button>
              </Link>
            </Box>
            <Box my={'4'}>
              <Button type="submit" colorScheme="teal" variant="solid">
                Login
              </Button>
            </Box>

            {/* Button for logging in as dummy user */}
            <Box
              my={'4'}
              style={{
                background: 'linear-gradient(135deg, purple, blue)', // Diagonal gradient
                padding: '20px', // Add padding to ensure the gradient is visible
                borderRadius: '8px', // Optional: Rounded corners for a softer look
              }}
            >
              <Button
                colorScheme="teal"
                variant="solid"
                size="lg"
                color="white"
                onClick={loginAsDummyUser}
                fontWeight="bold"
                _hover={{ bg: 'teal.600' }}
                _active={{ bg: 'teal.700', transform: 'scale(0.98)' }}
                boxShadow="lg"
              >
                Login as a Dummy User
              </Button>
            </Box>

            <Box my={'4'}>
              <span>New User? </span>
              <Link to="/register">
                <Button
                  variant="link"
                  color={'teal'}
                  className="registerTxt"
                  style={{ textDecoration: 'none' }}
                >
                  Signup
                </Button>
              </Link>{' '}
              here
            </Box>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default Login;
