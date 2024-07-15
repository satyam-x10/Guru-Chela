import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  Image,
  Spacer,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  VStack,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { GiHamburgerMenu, GiOutbackHat } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
import { logoutProfile } from '../../redux/actions/user';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import logo from '../../assets/images/guru.png';
import { FaMoon, FaSignInAlt, FaSignOutAlt, FaSun } from 'react-icons/fa';
import NotificationIcon from '../Notification/NotificationIcon';

const Navbar = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const { toggleColorMode } = useColorMode();

  const logoutHandler = e => {
    e.preventDefault();
    console.log('Logging out..');
    dispatch(logoutProfile());
  };

  return (
    <Box
      px={{ base: 4, md: 8 }}
      py={4}
      borderBottom="4px"
      borderColor="teal.500"
    >
      <Flex align="center" justify="space-between" maxW="7xl" mx="auto">
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src={logo} alt="logo" boxSize="50px" />
          <Text
            ml={2}
            fontWeight="bold"
            fontSize="xl"
            display={{ base: 'none', lg: 'flex' }}
          >
            GuruChela
          </Text>
        </Link>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Flex align="center" display={{ base: 'none', md: 'flex' }}>
            {isAuthenticated && (
              <>
                <ul
                  style={{
                    display: 'flex',
                    width: '100%',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    gap: '25px',
                    margin: '0 40px 0 0 ',
                  }}
                >
                  <NavLink
                    style={{}}
                    to="/"
                    isActive={location.pathname === '/'}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/courses"
                    isActive={location.pathname === '/courses'}
                  >
                    Courses
                  </NavLink>
                  <NavLink
                    to="/doubts"
                    isActive={location.pathname === '/doubts'}
                  >
                    Doubts
                  </NavLink>
                  <NavLink
                    to="/notes"
                    isActive={location.pathname === '/notes'}
                  >
                    Notes
                  </NavLink>
                  <NavLink
                    to="/profile"
                    isActive={location.pathname === '/profile'}
                  >
                    Profile
                  </NavLink>
                  {user?.role === 'admin' && (
                    <NavLink
                      to="/admin/dashboard"
                      isActive={location.pathname === '/admin/dashboard'}
                    >
                      Dashboard
                    </NavLink>
                  )}
                </ul>

                <Box
                  p={2}
                  cursor="pointer"
                  borderRadius={6}
                  bg="teal"
                  mx={2}
                  onClick={logoutHandler}
                >
                  Logout
                </Box>
              </>
            )}
            {!isAuthenticated && (
              <NavLink to="/login" isActive={location.pathname === '/login'}>
                <Box p={2} cursor="pointer" borderRadius={6} bg="teal" mx={2}>
                  Login
                </Box>
              </NavLink>
            )}
          </Flex>

          <Flex align="center">
            <Box
              p={2}
              cursor="pointer"
              borderRadius={6}
              bg="teal"
              mx={2}
              onClick={() => window.location.href = '/notifications'}
            >
              <NotificationIcon />
            </Box>
            <Box
              p={2}
              cursor="pointer"
              borderRadius={6}
              bg="teal"
              onClick={toggleColorMode}
            >
              {' '}
              <SwitchIcon size={30} />{' '}
            </Box>
            <Box
              p={2}
              cursor="pointer"
              borderRadius={6}
              bg="teal"
              mx={2}
              display={{ base: 'flex', md: 'none' }}
              onClick={onOpen}
            >
              <GiHamburgerMenu size={30} />
            </Box>
          </Flex>
        </div>
      </Flex>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader display="flex" justifyContent="space-between">
            <span>GuruChela</span>
            <GiHamburgerMenu size={30} onClick={onClose} />
          </DrawerHeader>

          <DrawerBody style={{ fontWeight: 'bold', fontSize: '20px' }}>
            <VStack align="start">
              {isAuthenticated && (
                <>
                  <NavLink
                    to="/"
                    isActive={location.pathname === '/'}
                    onClick={onClose}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/courses"
                    isActive={location.pathname === '/courses'}
                    onClick={onClose}
                  >
                    Courses
                  </NavLink>
                  <NavLink
                    to="/doubts"
                    isActive={location.pathname === '/doubts'}
                    onClick={onClose}
                  >
                    Doubts
                  </NavLink>
                  <NavLink
                    to="/profile"
                    isActive={location.pathname === '/profile'}
                    onClick={onClose}
                  >
                    Profile
                  </NavLink>
                  {user?.role === 'admin' && (
                    <NavLink
                      to="/admin/dashboard"
                      isActive={location.pathname === '/admin/dashboard'}
                      onClick={onClose}
                    >
                      Dashboard
                    </NavLink>
                  )}
                  <Text
                    cursor="pointer"
                    onClick={e => {
                      logoutHandler(e);
                      onClose();
                    }}
                  >
                    Logout
                  </Text>
                </>
              )}
              {!isAuthenticated && (
                <NavLink
                  to="/login"
                  isActive={location.pathname === '/login'}
                  onClick={onClose}
                >
                  Login/Signup
                </NavLink>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
