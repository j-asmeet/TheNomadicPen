/* By Jasmeet singh */
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

import {
  Box,
  TextField,
  Button,
  Link,
  Typography,
} from "@mui/material";

const Reset = () => {
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  const regexVerificationCode = /^\d{6}$/;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmationValid, setIsConfirmationValid] = useState(true);
  const [isVerificationCodeValid, setIsVerificationCodeValid] = useState(false);
  const [codeErrorMsg, setCodeErrorMsg]=useState("Please enter the 6 digit verification code sent over registered email");
  const location = useLocation();
  let [resetCode, setResetCode] = useState(location.state?.code || null);
  const resetEmail = location.state?.email;
  const [passwordErrorMsg, setPasswordErrorMsg]=useState("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.");
  const navigate = useNavigate();

  const handleNewPasswordChange = (event) => {
    setIsPasswordValid(true);
    if (newPassword !== "") {
      const isValid = regexPassword.test(newPassword);
      setIsPasswordValid(isValid);
      setPasswordErrorMsg("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setIsConfirmationValid(true);
    if (confirmPassword !== "") {
      setIsConfirmationValid(confirmPassword === newPassword);
    }
  };

  const handleVerificationCodeChange = (event) => {
    
    setIsVerificationCodeValid(true);
    
    if (verificationCode !== "") {
      const isValid = regexVerificationCode.test(verificationCode);
      setCodeErrorMsg("Please enter the 6 digit verification code sent over registered email");
      setIsVerificationCodeValid(isValid);

    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

   if(newPassword==="")
   setIsPasswordValid(false);
   else if(confirmPassword==="")
   setIsConfirmationValid(false);
   else if(verificationCode!==JSON.parse(resetCode).code)
   {
    setCodeErrorMsg('Invalid Verification Code');
    setIsVerificationCodeValid(false);
   }
   
   else{
    try {
      console.log(JSON.stringify({
        email: resetEmail,
        password: newPassword,
      }));
      const response = await fetch("https://nomadic-pen.onrender.com/user/updatePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: resetEmail,
          password: newPassword,
        }),
      });

      const data = await response.json();
      console.log(response.status);
      if (response.status === 200) {
        navigate("/login");
      } else {
        setPasswordErrorMsg('Failed to update password');
        setIsPasswordValid(false);
        console.log(data.message);
      }

    } catch (error) {
      setPasswordErrorMsg('Failed to update password');
      setIsPasswordValid(false);
      console.error("Error: ", error);
    }
  }
  };

  const handleResendCode = async (event) => {
    event.preventDefault();

    
    try {

      const response = await fetch("https://nomadic-pen.onrender.com/user/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email : resetEmail,
        }),
      });
      const code = await response.text(); // Get the response data (verification code) as text

      // Update the resetCode state with the received code
      setResetCode(code);
      console.log(resetCode);
    }
  
     catch (error) {
      setPasswordErrorMsg("unable to change password");
        setIsPasswordValid(false);
      console.error("Error: ", error);
    }
  
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "400px",
        mx: "auto",
        my: 4,
      }}
      className="author-card"
    >
      <Typography variant="h4" gutterBottom>
        Reset Your Password
      </Typography>
      <TextField
        label="New Password"
        type="password"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        error={!isPasswordValid}
        helperText={!isPasswordValid ? passwordErrorMsg : ""}
        onChange={(e)=>setNewPassword(e.target.value)}
        onBlur={handleNewPasswordChange}
      />
      <TextField
        label="Confirm Password"
        type="password"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        error={!isConfirmationValid}
        helperText={!isConfirmationValid ? "Passwords do not match" : ""}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        onBlur={handleConfirmPasswordChange}
      />
      <TextField
        label="Verification Code"
        type="text"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        inputProps={{
          maxLength: 6,
        }}
        error={!isVerificationCodeValid}
        helperText={!isVerificationCodeValid ? codeErrorMsg : ""}
        onBlur={handleVerificationCodeChange}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <Button type="submit" onClick={handleSubmit} variant="contained" color="primary" sx={{ width: "50%", margin: "20px auto" }}>
        Reset Password
      </Button>
      <Link href="#" onClick={handleResendCode}  variant="body2">
        Resend Code
      </Link>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">
          Go back to <Link href="/login" underline="hover">Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Reset;
