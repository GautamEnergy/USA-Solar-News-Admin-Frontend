// Import necessary modules and dependencies
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

// Define the ForgotResetPassword component
const ForgotResetPassword = () => {
  // Define state variables
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCreateNewPasswordOpen, setCreateNewPasswordOpen] = useState(false);

  // Function to handle sending OTP for reset password
  const sendOTPForResetPassword = async (email) => {
    try {
      const data = { Email: email };
      const response = await axios.put("http://localhost:5000/admin/otpforResetPassword", data);
      console.log("Reset password OTP sent", response.data);
      setOtpVerified(true);
    } catch (error) {
      console.error("Error sending reset password OTP", error);
      setError("Error sending OTP for password reset. Please try again.");
    }
  };

  // Function to handle verification of OTP
  const verifyOTP = async () => {
    try {
      const response = await axios.put("http://localhost:5000/admin/verifyOTP", { OTP: otp });
      console.log("OTP verified successfully", response.data);
      setCreateNewPasswordOpen(true); // Open modal to create new password
    } catch (error) {
      console.error("Error verifying OTP", error);
      setError("Error verifying OTP. Please try again.");
    }
  };

  // Function to handle submission of new password
  const submitNewPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    try {
      const response = await axios.put("http://localhost:5000/admin/resetPassword", { newPassword });
      console.log("Password reset successful", response.data);
      // Optionally, you can show a success message to the user
    } catch (error) {
      console.error("Error resetting password", error);
      setError("Error resetting password. Please try again.");
    }
  };

  // Render the component
  return (
    <>
      {/* Your existing JSX for the forgot password modal */}
      {/* Add OTP verification and Create New Password modals */}
      <Modal isOpen={otpVerified} onClose={() => setOtpVerified(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify OTP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="otp">
              <FormLabel>Enter OTP</FormLabel>
              <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
            </FormControl>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={verifyOTP}>
              Verify OTP
            </Button>
            <Button variant="ghost" onClick={() => setOtpVerified(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isCreateNewPasswordOpen} onClose={() => setCreateNewPasswordOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="newPassword">
              <FormLabel>New Password</FormLabel>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitNewPassword}>
              Submit
            </Button>
            <Button variant="ghost" onClick={() => setCreateNewPasswordOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// Export the component
export default ForgotResetPassword;
