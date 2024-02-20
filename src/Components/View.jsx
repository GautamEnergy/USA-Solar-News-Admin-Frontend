import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Image,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";

const ViewModal = ({ isOpen, onClose, imageURL, header, description }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent borderRadius="md">
        <ModalHeader textAlign="center">{header}</ModalHeader>
        <ModalCloseButton top={'0px'} />
        <ModalBody>
          <Box height="60vh" overflowY="auto">
            <Image src={imageURL} alt="Image" width="100%" />
            <Divider my={4} />
            <Box p={4}>
              <Heading as="h2" size="md" mb={2}>
                {header}
              </Heading>
              <Text>{description}</Text>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewModal;
