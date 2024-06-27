import React, {useState} from 'react';
import {Link} from "react-router-dom";
import "./Navbar.css";
import {Box, Button, Heading, Image} from "@chakra-ui/react";
import {ColorModeSwitcher} from "../../ColorModeSwitcher";
import logo from '../../assets/images/guru.png'
import {GiHamburgerMenu} from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { logoutProfile } from '../../redux/actions/user';

const Navbar = ({isAuthenticated,  user}) => {

  const [click, setClick] = useState(false);

  const [mobile, setMobile] = useState(false);
 
  const clickHandle = () => {
    setClick(!click);
    setMobile(!click);
  }

  const dispatch = useDispatch();


  const logoutHandler = (e) => {
    e.preventDefault();
    console.log("Logging out..");
    dispatch(logoutProfile());

  }


  return (
    <>
    <nav className="navbar">

      {/* Logo section */}
      <div className="logo-main">
      <Link to="/" className="header" style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',gap:'4px'}} >
            <Image src={logo} alt='logo' objectFit='cover' boxSize='50px'  // Hides the image on mobile (base) and shows it on md and larger screens
 />

            <Heading display={{ base: 'none',sm:'block'}} children='Guru-Chela'/>
          </Link>
      </div>

      {/* List Section */}
      <div className="list-sec">
        <ul className={click ? "list-mobile" : "list"} onClick={() => setClick(false)}>
          <Link to ="/" className="link">
            <li>Home</li>
          </Link>
          <Link to = "/courses" className="link">
            <li>Courses</li>
          </Link>
          <Link to = "/doubts" className="link">
            <li>Doubts</li>
          </Link>

          {mobile && isAuthenticated ? (
            <>
            <Link to = "/profile" className="link">
                <li>Profile</li>
              </Link>

              {user.role === "admin" ? (
                <>
                  <Link to = "/admin/dashboard" className="link">
                    <li>Dashboard</li>
                  </Link>
                
                </>
              ) : (
                <>
                
                
                </>
              )}

              
            </>
          ) : (
            <>
              <Link className="mobile-btn link" to = "/login" >
                <li>Login</li>
              </Link>
            </>
          )}
        </ul>
      </div>


      {/* Login/Signup Here */}

      {isAuthenticated ? (
        <>
          <div className="section3">
            
            

          {user && user.role === "admin" ? (
            <>
              <Link to ="/profile">
                <Button colorScheme='teal' variant='solid' mx={"1"}>Profile</Button>
              </Link>


              <Link to ="/admin/dashboard">
                <Button colorScheme='teal' variant='solid' mx={"4"}>Dashboard</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to ="/profile">
                <Button colorScheme='teal' variant='solid' mx={"4"}>Profile</Button>
              </Link>
            
            </>
          )}

         
              <Button colorScheme='teal' variant='solid' onClick= {logoutHandler}>Logout</Button>
            
            
          <ColorModeSwitcher />
          </div>
        </>
      ): (
        <>
          <div className="section3">
            <Link to ="/login">
              <Button colorScheme='teal' variant='solid' >Login/Signup</Button>
            </Link>
            <ColorModeSwitcher />
          </div>
        </>

      )}

      {/* <div className="section3">
        <Link to ="/login">
          <Button colorScheme='teal' variant='solid' >Login/Signup</Button>
        </Link>
        <ColorModeSwitcher />
      </div> */}
      <div className="hamburger" >
          <ColorModeSwitcher style={{marginRight: "6px"}}/>
          {isAuthenticated ? (
            <>
              <Button className="mobile-logout" colorScheme='teal' mx={"2"}  variant='solid' onClick= {logoutHandler}>Logout</Button>
            </>
          ) : (
            <>
              {/* <Link to ="/login">
                <Button colorScheme='teal' variant='solid' mx={"2"}>Login</Button>
              </Link> */}
              
            </>
          )}
          <GiHamburgerMenu onClick={clickHandle} style={{marginTop: "7px"}}/>
        </div>
    </nav>
    </>
  )
}

export default Navbar;
