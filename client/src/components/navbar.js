import { Box, Heading, Flex } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Navbar = () => {

    const logout = event => {
        event.preventDefault();
        Auth.logout();
      };
      

    return (  
        <Flex  
            as="nav"  
            align="center"  
            justify="space-between"  
            wrap="wrap"  
            padding="4rem"  
            bg="gray.900"  
            color="teal.300"  
            borderBottom="1px solid black"   
        >  
            <Flex align="center" mr={5}>
            <Link to="/">
                <Heading as="h1" fontSize="100px" letterSpacing={"-.1rem"}>  
                    TekTalk  
                </Heading> 
                </Link> 
            </Flex>  
  
            <Box  
                display="flex"  
                width="auto"  
                alignItems="center"  
                color="teal.300" 
                fontSize="30px"
            >  
            {Auth.loggedIn() ? (
                <>
                    <Link to="/profile" style={{ marginRight: 40 }}>Profile</Link>
                    <a href="/" onClick={logout}>Logout</a>
                </>
            ) : (
                <>
                    {/* <Link to="/homepage" style={{ marginRight: 40 }}>Home</Link>    */}
                    <Link to="/login" style={{ marginRight: 40 }}>Login</Link>  
                </>
              )} 
            </Box>  
        </Flex>  
    );
 
};

export default Navbar;