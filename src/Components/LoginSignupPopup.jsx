import React, { useState, useEffect } from "react";
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
import ForgotPassword from "./ForgotPassword";




const LoginSignupPopup = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isOtpOpen, setOtpOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");



 



  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminToken");
    if (!isLoggedIn) {
      setSignupOpen(true);
    } else {
      setLoginOpen(true);
    }
  }, []);



  const onClose = () => {
    setLoginOpen(false);
    setSignupOpen(false);
    setOtpOpen(false);
    setEmail("");
    setPassword("");
    setOtp("");
    setError("");
   
  };



  const handleSignup = async () => {
    if (!validateInput()) return;
    try {
      const res = await sendOTP(email, password);
      console.log("OTP sent:", res.data);
      setOtpOpen(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Error sending OTP. Please try again.");
    }
  };



  const sendOTP = async (email, password) => {
    const data = { Email: email, Password: password };
    return await axios.post(
      "http://localhost:5000/admin/sendOTPforEmail",
      data
    );
  };



  const handleVerifyOTP = async () => {
    try {
      const res = await verifyOTP(otp);
      console.log("OTP verification res:", res);
      if (res.data.message === "User Registered!!") {
        setLoginOpen(true);
      } else {
        setError("Error verifying OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError(
        "Network Error: Unable to connect to the server. Please try again later."
      );
    }
  };



  const verifyOTP = async (otp) => {
    const data = { OTP: otp };
    return await axios.post("http://localhost:5000/admin/SignUp", data);
  };



  const validateInput = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return false;
    }
    return true;
  };

  //  LoginSignupPopup component

  const adminLogin = async () => {
    if (!validateInput()) return;
    try {
      const res = await axios.post("http://localhost:5000/admin/login", {
        Email: email,
        Password: password,
      });

      if (res.data.message === "login Successfull!!") {
        const token = res.data.token;
        console.log("Admin logged in successfully!");
        // Store the token in local storage or context for future use
        localStorage.setItem("adminToken", token);

        // Include the token in the request headers for future requests
        //  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        window.alert("Login successful!");
        window.location.reload(); //for reloading page....
        onClose();
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in admin:", error.message);
      setError(
        "Network Error: Unable to connect to the server. Please try again later."
      );
    }
    // setLoginOpen(true);
  };



  const onClickAlreadyRegistered = () => {
    setSignupOpen(true);
    setLoginOpen(true);
  };
  
// const ForgotResetPassword = async () =>{
//   if(!email) {
//     setError('please enter your email to reset password ');
//     return ;
//   }
//   try {
//     const res = await sendOTPForResetPassword(email);
//     console.log('Reset password Otp sent', res.data);
//     setOtpOpen(true);
//   } catch (error) {
//     console.log('error sending reset password otp', error)
//     setError('Error sending otp for password reset please try again')
//   }
// };


// const sendOTPForResetPassword = async (email) => {
//   const data = {Email: email};
//   return await axios.put('http://localhost:5000/admin/otpforResetPassword', data )
// }








  return (
    <>

    
      {/* Signup Modal */}
      {!isLoginOpen && (

        <Modal isOpen={isSignupOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent>
            <ModalHeader>Signup</ModalHeader>
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

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </ModalBody>

            <ModalFooter>
              <a  href="#" hover={{ cursor: "pointer" }} onClick={onClickAlreadyRegistered} style={{ marginRight: "100px", color: "red" }}> already registered? </a>
              <Button colorScheme="blue" mr={3} onClick={handleSignup}>
                Signup
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>

          </ModalContent>

        </Modal>
     
     )}


         {/* OTP Verificatin Input Tag */}
      <Modal isOpen={isOtpOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify OTP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
            <Button colorScheme="blue" mr={3} onClick={handleVerifyOTP }>
              Verify OTP
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



      {/* Login Modal */}
      {isSignupOpen && (

        <Modal isOpen={isLoginOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Add login form content */}
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}      
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </ModalBody>

            <ModalFooter> 
           

              {/* <a  href="#"    onClick={ForgotResetPassword}  style={{ marginRight: "110px", color: "blue" }} variant="ghost"   _hover={{ cursor: "pointer" }}  > Forgot Password?  </a> */}
{/* *********      **************         ****************      **********  I am give the Forgot Password *********      **************         ****************      ********** */}
{/* <ForgotResetPassword /> */}

          <ForgotPassword />
              <Button colorScheme="blue" mr={3} onClick={adminLogin}>
                Login
              </Button>

              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>

          </ModalContent>
        </Modal>
      
      )}












     
      {/* ***************************************** END OF THE CODE *********************************** */}
    </>
  );
};

export default LoginSignupPopup;
 