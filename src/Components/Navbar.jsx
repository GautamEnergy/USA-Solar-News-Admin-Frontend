import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import PopupModal from './CreateNews'
import SearchPopup from "./search";
import {
  Flex,
  Box,
  Button,
  IconButton,
  useColorMode,
  Link,
  
} from "@chakra-ui/react";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setOpen] = useState(false)

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  
  const Modal = ()=>{
    setOpen(!isOpen)
  }

  return (
    <Box
      as="nav"
      bg={colorMode === "dark" ? "gray.800" : "white"}
      color={colorMode === "dark" ? "white" : "black"}
      px="6"
      py="4"
      boxShadow="md"
      position='relative'
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
          <img
            src="https://via.placeholder.com/30"
            alt=""
            width="30"
            height="30"
            style={{ borderRadius: "50%", marginRight: "0.5rem" }}
          />
          <Link href="/" fontSize="1.5rem" fontWeight="bold" textDecoration="none">
            USA News
          </Link>
        </Flex>

        {/* Navigation links */}
        <Box
          display={{ base: isNavOpen ? "block" : "none", md: "block" }}
          flexBasis={{ base: "100%", md: "auto" }}
          mt={{ base: 4, md: 0 }}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <NavLink href="/">All News</NavLink>
            <NavLink href="/about">AD's</NavLink>

            <Box style={{fontWeight:'bold'}} onClick={()=>{Modal()}} _hover={{cursor:'pointer'}}>Add News</Box>
            <SearchPopup/>
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
      <PopupModal isOpen={isOpen} onClose={Modal}/>
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
