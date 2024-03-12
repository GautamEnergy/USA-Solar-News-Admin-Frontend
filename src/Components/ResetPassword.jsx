import React, { useState } from "react";
import axios from "axios";
import {
  Button,
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
} from "@chakra-ui/react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const sendOTPForResetPassword = async () => {
    try {
      const data = { Email: email };
      const res = await axios.put("http://localhost:5000/admin/otpforResetPassword", data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendOTPForResetPassword();
      window.alert("OTP sent successfully!");
      setModalOpen(true);
    } catch (error) {
      console.error("Error sending Reset Password OTP:", error);
      setError("Error sending OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      // Implement OTP verification logic here
      // You can call your backend API to verify the OTP
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Error verifying OTP. Please try again.");
    }
  };

  return (
    <>
      <a
        href="#"
        style={{ marginRight: "110px", color: "blue" }}
        variant="ghost"
        _hover={{ cursor: "pointer" }}
        onClick={handleResetPassword} // Trigger handleResetPassword on click
      >
        Reset Password ?
      </a>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="otp">
              <FormLabel>Enter OTP</FormLabel>
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </FormControl>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleVerifyOTP}>
              Verify OTP
            </Button>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ResetPassword;
