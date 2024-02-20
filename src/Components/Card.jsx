import React, { useState } from "react";
import { Box, Image, Text, Button, VStack, HStack, Spacer, useToast } from "@chakra-ui/react";
import { ContextAPI } from '../ContextAPI/Context.API';
import ViewModal from "./View";
import axios from "axios";

const Card = ({ _id, imageURL, title, description, date, header }) => {
  const {DataHandler} = ContextAPI()
  const [isOpen, SetIsOpen] = useState(false)
  const toast = useToast()
  // function formatDate(date) {
  //   const options = { day: '2-digit', month: 'short', year: 'numeric' };
  //   return date.toLocaleDateString('en-GB', options);
  // }

  const onClose = () => {
    SetIsOpen(!isOpen)
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
      })
        await axios.delete(`https://lovely-pear-kilt.cyclic.app/admin/delete?_id=${_id}`)
        DataHandler()
      toast({
        title: '',
        description: "New Deleted Succesfully !",
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top'
      })
      
    } catch (err) {
      toast({
        title: 'Error',
        description: "Something Went Wrong, try again",
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top'
      })
    }

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
            <Box _hover={{ cursor: 'pointer' }} fontWeight={500} borderRadius={'5px'} bgColor={'#40A2E3'} padding={'5px'}>Edit</Box>
            <Box _hover={{ cursor: 'pointer' }} fontWeight={500} borderRadius={'5px'} bgColor={'#D04848'} padding={'5px'} onClick={onDelete}>Delete</Box>
          </HStack>
          <ViewModal onClose={onClose} isOpen={isOpen} imageURL={imageURL} header={header} description={description} />
        </VStack>
      </HStack>
    </Box>
  );
};

// const CardList = ({ data }) => {
//   return (
//     <VStack spacing={4} align="stretch">
//       {data.map((item) => (
//         <Card
//           key={item._id}
//           imageURL={item.ImageURL}
//           title={item.title}
//           description={item.Description}
//           date={item.Date}
//         />
//       ))}
//     </VStack>
//   );
// };

// const App = () => {
//   return (
//     <Box p={4}>
//       <CardList data={data} />
//     </Box>
//   );
// };

export default Card;
