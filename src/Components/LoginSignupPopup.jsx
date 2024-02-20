import React, { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';


const LoginSignupPopup = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isFirstTimeVisit, setIsFirstTimeVisit] = useState(true);

  useEffect(() => {
    // Check if it's the first time visiting the page
    console.log("Mount")
    const visited = localStorage.getItem('visited');
    if (!visited && isFirstTimeVisit) {
      setLoginOpen(true); // Open the login modal if it's the first visit
      setIsFirstTimeVisit(false); // Set visited flag in local storage
      localStorage.setItem('visited', 'true'); 
    }
    setLoginOpen(true)
  
  }, []);

  const onClose = () => {
    setLoginOpen(false);
    setSignupOpen(false);
  };

  return (
    <>
      {/* Login Modal */}
      <Modal isOpen={isLoginOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>

            <Checkbox mt={4}>Forgot Password?</Checkbox>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Login
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Signup Modal */}
      <Modal isOpen={isSignupOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Signup</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl id="mobile">
              <FormLabel>Mobile Number</FormLabel>
              <Input type="tel" />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Signup
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginSignupPopup;
