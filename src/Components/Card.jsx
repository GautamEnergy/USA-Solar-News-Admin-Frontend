

// Inside your Card component:

import React, { useState } from "react";
import { Box, Image, Text, Button, VStack, HStack, Spacer, useToast } from "@chakra-ui/react";
import { ContextAPI } from '../ContextAPI/Context.API';
import ViewModal from "./View";
import EditModal from "./EditModal"; // Import your EditModal component here
import axios from "axios";

const Card = ({ _id, imageURL, title, description, date, header }) => {
  const { DataHandler } = ContextAPI();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); // State for edit modal
  const toast = useToast();

  const onClose = () => {
    setIsOpen(!isOpen);
  }

  const onEditClose = () => {
    setIsEditOpen(false);
  }

  const onDelete = async () => {
    try {
      toast({
        title: 'Wait',
        description: "We are Deleting News",
        status: 'loading',
        duration: 1000,
        isClosable: true,
        position: 'top'
      });
      await axios.delete(`https://lovely-pear-kilt.cyclic.app/admin/delete?_id=${_id}`);
      DataHandler();
      toast({
        title: '',
        description: "New Deleted Successfully !",
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top'
      });
      
    } catch (err) {
      toast({
        title: 'Error',
        description: "Something Went Wrong, try again",
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top'
      });
    }
  }

  const onEdit = () => {
    setIsEditOpen(true); // Open the edit modal
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" width="100%">
      <HStack spacing={4}>
        <Image src={imageURL} alt={title} boxSize="30%" />
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold">{header}</Text>
          <Text>{title}</Text>
          <Text fontSize="sm" color="gray.500">{`${date.split(' ')[1]} | ${date.split(' ')[2]} | ${date.split(' ')[3]}`}</Text>

          <HStack>
            <Box _hover={{ cursor: 'pointer' }} fontWeight={500} borderRadius={'5px'} bgColor={'#BFEA7C'} padding={'5px'} onClick={onClose}>See More </Box>
            <Box _hover={{ cursor: 'pointer' }} fontWeight={500} borderRadius={'5px'} bgColor={'#40A2E3'} padding={'5px'} onClick={onEdit} >Edit</Box>
            <Box _hover={{ cursor: 'pointer' }} fontWeight={500} borderRadius={'5px'} bgColor={'#D04848'} padding={'5px'} onClick={onDelete}>Delete</Box>
          </HStack>
          <ViewModal onClose={onClose} isOpen={isOpen} imageURL={imageURL} header={header} description={description}  />
        </VStack>
      </HStack>
      <EditModal isOpen={isEditOpen} onClose={onEditClose} _id={_id} header={header} title={title} description={description} imageURL={imageURL} />
    </Box>
  );
};

export default Card;


