import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import PopupModal from "./CreateNews";
import SearchPopup from "./search";


import {
  Flex,
  Box,
  Button,
  IconButton,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import BlogMain from "./BlogSection/BlogMain";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("adminToken"));
   
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const Modal = () => {
    setOpen(!isOpen);
  };
 
  
  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
  };

  return (
    <Box
      as="nav"
      bg={colorMode === "dark" ? "gray.800" : "white"}
      color={colorMode === "dark" ? "white" : "black"}
      px="6"
      py="4"
      boxShadow="md"
      position="relative"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
        wrap="wrap"
      >
        {/* Logo */}
        <Flex align="center">
          {/* <img
            src="https://via.placeholder.com/30"
            alt=""
            width="30"
            height="30"
            style={{ borderRadius: "50%", marginRight: "0.5rem" }}
          /> */}
          <Link
            href="/"
            fontSize="1.5rem"
            fontWeight="bold"
            textDecoration="none"
          >
            <img src="./Americanlogo.png" alt="News Name" width="100" />
          </Link>
        </Flex>

        {/* Navigation links */}
        <Box
          display={{ base: isNavOpen ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
          mt={{ base: 4, md: 0 }}
          alignItems="center"
          justifyContent="space-around"
          color="green"
          mr={-250}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            color="green"
          >
            <NavLink href="/">All News</NavLink>
            <NavLink href="/about">AD's</NavLink>
            <NavLink href="/blog" >Blog</NavLink>
           
          
            <Box
              style={{ fontWeight: "bold", color: "green" }}
              onClick={() => {
                Modal();
              }}
              _hover={{ cursor: "pointer" }}
            >
              Add News
            </Box>    
            {/* <BlogPopupModal onClose={BlogModalController} isOpen={isOpenBlog} /> */}
            <SearchPopup />

            {isLoggedIn && (
              <a    href="#"   style={{     color: "red", fontWeight: "bold", marginLeft: "180px",paddingLeft: "122px", }} onClick={handleLogOut}_hover={{ cursor: "pointer" }}>
                Logout </a> )}
          </Flex>
        </Box>

        {/* Mood function & Toggle Button */}
        <Flex align="center">
          <Button onClick={toggleColorMode} variant="ghost" mr={2}>
            {colorMode === "dark" ? <FaSun /> : <FaMoon />}
          </Button>
          <IconButton
            display={{ base: "block", md: "none" }}
            aria-label="Toggle navigation"
            icon={<span>{isNavOpen ? "✕" : "☰"}</span>}
            onClick={toggleNav}
          />
        </Flex>
      </Flex>
      {isOpen && <BlogMain />}
      <PopupModal isOpen={isOpen} onClose={Modal} />
    </Box>
  );
}

// Custom NavLink component to maintain consistency
function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      mr={{ base: 0, md: 4 }}
      mb={{ base: 2, md: 0 }}
      fontSize="lg"
      fontWeight="bold"
      textDecoration="none"
      color="inherit"
      _hover={{ textDecoration: "underline" }}
    >
      {children}
    </Link>
  );
}

export default Navbar;
