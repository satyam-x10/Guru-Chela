import { Box, VStack } from '@chakra-ui/react';
import React from 'react'
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri';
import IconBox from './IconBox';
import { useLocation } from 'react-router-dom';



const Sidebar = () => {


  const location = useLocation();


  return (

    <Box spacing={"8"} p="16px" style={{ borderTop: "4px solid teal" }} alignItems={"flex-start"} >

      <IconBox title="dashboard" Icon={RiDashboardFill} url={"admin/dashboard"} active={location.pathname === "/admin/dashboard"} />

      <IconBox title="Create Courses" Icon={RiAddCircleFill} url={"admin/createcourses"} active={location.pathname === "/admin/createcourses"} />

      <IconBox title="Courses" Icon={RiEyeFill} url={"admin/admincourses"} active={location.pathname === "/admin/admincourses"} />

      <IconBox title="Users" Icon={RiUser3Fill} url={"admin/users"} active={location.pathname === "/admin/users"} />
    </Box>
  )
}

export default Sidebar
