
import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";

const PasswordResetModal = ({ isOpen, onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await axios.put("http://localhost:5000/admin/resetPassword", {
        email: localStorage.getItem("email"), // Assuming you stored email in local storage
        newPassword: newPassword
      });
      console.log(response.data); // handle success
      onClose(); // close modal after successful password reset
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Error resetting password. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reset Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>New Password</FormLabel>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormControl>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleResetPassword}>Update</Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PasswordResetModal;
