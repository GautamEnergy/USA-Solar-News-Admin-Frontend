import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, Textarea, Image, Box } from "@chakra-ui/react";
import axios from "axios";

const EditModal = ({ isOpen, onClose, _id, header, title, description, imageURL }) => {
  // State for edited data
  const [editedHeader, setEditedHeader] = useState(header);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedImage, setEditedImage] = useState(null); // State for edited image

  /**Function to handle image change */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedImage(file);
  }

  /*Function to handle header change*/
  
  const handleHeaderChange = (e) => {
    setEditedHeader(e.target.value);
  }
/*Function to handle title change*/


 
  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  }
/*Function to handle description change*/
 
  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  }

  /*Function to handle update*/
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("header", editedHeader);
      formData.append("title", editedTitle);
      formData.append("description", editedDescription);
      if (editedImage) {
        formData.append("image", editedImage);
      }

      await axios.put(`https://lovely-pear-kilt.cyclic.app/admin/edit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        params: {
          _id
        }
      });
      onClose();  /**Close the modal after successful edit */
    } catch (error) {
      console.error("Error editing document:", error);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit News</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Form inputs for editing data */}
          <Box mb={3}>
            <Image src={imageURL} alt="Current Image" />
            <Input type="file" onChange={handleImageChange} />
          </Box>
          <Input mb={3} placeholder="Header" value={editedHeader} onChange={handleHeaderChange} />
          <Input mb={3} placeholder="Title" value={editedTitle} onChange={handleTitleChange} />
          <Textarea mb={3} placeholder="Description" value={editedDescription} onChange={handleDescriptionChange} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditModal;
