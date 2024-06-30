import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import logo from '../../assets/images/guru.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { logoutProfile } from '../../redux/actions/user';

const Navbar = ({ isAuthenticated, user }) => {
  const [mobile, setMobile] = useState(false); // State to track mobile view
  const location = useLocation()
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      // Update mobile state based on window width
      setMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Set initial mobile state on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logoutHandler = (e) => {
    e.preventDefault();
    console.log("Logging out..");
    dispatch(logoutProfile());
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo section */}
        <div className="logo-main">
          <Link to="/" className="header" style={{display:"flex",gap:"10px",justifyContent:"center",alignItems:"center"}}>
            <Image src={logo} alt='logo' boxSize='50px' />
            <Text>GuruChela</Text>
          </Link>
        </div>

        {/* List Section */}
        <div className="list-sec">
          <ul className={mobile ? "list-mobile" : "list"}>
            
            <Link to="/" className={`link ${location.pathname === '/' ? 'active' : ''}`}>
              <li>Home</li>
            </Link>
            <Link to="/courses" className={`link ${location.pathname === '/courses' ? 'active' : ''}`}>
              <li>Courses</li>
            </Link>
            <Link to="/doubts" className={`link ${location.pathname === '/doubts' ? 'active' : ''}`}>
              <li>Doubts</li>
            </Link>
            
            {mobile && isAuthenticated && (
              <>
                <Link to="/profile" className="link">
                  <li>Profile</li>
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin/dashboard" className="link">
                    <li>Dashboard</li>
                  </Link>
                )}
              </>
            )}
            {!isAuthenticated && (
              <Link className="mobile-btn link" to="/login">
                <li>Login</li>
              </Link>
            )}
          </ul>
        </div>

        {/* Login/Signup Here */}
        <div className="section3">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button colorScheme='teal' variant='solid' mx={"1"}>Profile</Button>
              </Link>
              {user.role === "admin" ? (
                <Link to="/admin/dashboard">
                  <Button colorScheme='teal' variant='solid' mx={"4"}>Dashboard</Button>
                </Link>
              ) : null}
              <Button colorScheme='teal' variant='solid' onClick={logoutHandler}>Logout</Button>
            </>
          ) : (
            <Link to="/login">
              <Button colorScheme='teal' variant='solid'>Login/Signup</Button>
            </Link>
          )}
          <ColorModeSwitcher />
        </div>

        <div className="hamburger">
        <ColorModeSwitcher />
          <GiHamburgerMenu onClick={() => setMobile(!mobile)} style={{ marginTop: "7px" }} />
        </div>
      </nav>
    </>
  )
}

export default Navbar;
