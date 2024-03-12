import React from 'react';
import axios from 'axios'; // Make sure axios is installed and imported

function ForgotPassword() {
  const sendPasswordResetEmail = async () => {
    try {
      const email = "user@example.com"; // Get the existing email address from your state or input field
      const newPassword = "newPassword123"; // Get the new password from your state or input field

      const response = await axios.post(
        'YOUR_API_ENDPOINT_URL',
        {
          email: email,
          newPassword: newPassword
        },
        {
          headers: {
            'Authorization': 'Bearer otpforResetPassword', // Set your API key here
            'Content-Type': 'application/json'
          }
        }
      );

      // Check the response status and handle accordingly
      if (response.status === 200) {
        // Show success message or redirect the user to a success page
        alert('OTP sent successfully to reset password.');
      } else {
        // Handle other status codes if needed
        alert('Failed to send OTP. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      // Handle any errors from the API call
      alert('Failed to send OTP. Please try again later.');
    }
  };

  return (
    <a
      href="#"
      onClick={sendPasswordResetEmail}
      style={{ marginRight: "110px", color: "blue" }}
      variant="ghost"
      _hover={{ cursor: "pointer" }}
    >
      Forgot Password?
    </a>
  );
}

export default ForgotPassword;
