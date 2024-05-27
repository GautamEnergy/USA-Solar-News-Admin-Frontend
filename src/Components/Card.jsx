import React, { useState } from "react";
import { Box, Image, Text, VStack, HStack, useToast, Slide } from "@chakra-ui/react";
import { ContextAPI } from '../ContextAPI/Context.API';
import Notification from "./Notification";
import ViewModal from "./View";
import axios from "axios";
import ZoomImageModal from "./ZoomImageModal"; 

const Card = ({ _id, imageURL, title, description, date, header, uuid }) => {
  const { DataHandler } = ContextAPI();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('');
  const [isZoomOpen, setIsZoomOpen] = useState(false); 
  const toast = useToast();

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  const showNotificationMessage = (title, description, status) => {
    setNotificationTitle(title);
    setNotificationDescription(description);
    setNotificationStatus(status);
    setShowNotification(true);
  };

  const onDelete = async () => {
    try {
      showNotificationMessage('Deleting Blog', '', 'loading');
      await axios.delete(`https://gautamsolar.us/admin/delete?_id=${_id}&uuid=${uuid}`);
      
      showNotificationMessage('Deleted Blog Successfully', '', 'success');

      setTimeout(() => {
        DataHandler();
        setShowNotification(false);
      }, 3000);

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
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return [day.toString(), month, year];
  };

  const onImageClick = () => {
    setIsZoomOpen(true);
  };

  const onZoomClose = () => {
    setIsZoomOpen(false);
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" width="100%">
      <Slide direction="top" in={showNotification}>
        <Box display="flex" width="100%" justifyContent="center" paddingTop="20px">
          <Notification showAlert={showNotification} status={notificationStatus} title={notificationTitle} description={notificationDescription} />
        </Box>
      </Slide>
      <HStack spacing={4}>
        <Image src={imageURL} alt={title} boxSize="30%" onClick={onImageClick} _hover={{ cursor: 'pointer' }} />
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold">{header}</Text>
          <Text fontSize="sm" color="gray.500">{`${formatDate(date)[0]} | ${formatDate(date)[1]} | ${formatDate(date)[2]}`}</Text>
          <HStack>
            <Box _hover={{ cursor: 'pointer' }} fontWeight={500} borderRadius={'5px'} bgColor={'#BFEA7C'} padding={'5px'} onClick={onClose}>See More</Box>
            <Box _hover={{ cursor: 'pointer' }} fontWeight={500} borderRadius={'5px'} bgColor={'#D04848'} padding={'5px'} onClick={onDelete}>Delete</Box>
          </HStack>
          <ViewModal onClose={onClose} isOpen={isOpen} imageURL={imageURL} header={header} description={description} />
        </VStack>
      </HStack>
      <ZoomImageModal isOpen={isZoomOpen} onClose={onZoomClose} imageURL={imageURL} />
    </Box>
  );
};

export default Card;
