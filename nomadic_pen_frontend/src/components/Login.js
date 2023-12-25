/* By Jasmeet singh */
import React, { useState } from "react";
import image from '../../../nomadic_pen_frontend/src/Images/loginimg.png';
import { useNavigate } from 'react-router-dom'; 
import {
  Box,
  TextField,
  Button,
  Link,
} from "@mui/material";

const LoginForm = () => {
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg]=useState("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.");

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make the API call
    try {
      const response = await fetch("https://nomadic-pen.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 200) {
        // Successful login
        const data = await response.json();
        // Save the bearer token in localStorage
        localStorage.setItem("bearerToken", data.bearerToken);
        localStorage.setItem("email", data.userId);
        // navigate('/');
        window.location.href = "/posts/following";
      } else {
        
       // setIsEmailValid(false);
       setPasswordErrorMsg("Invalid email or password");
        setIsPasswordValid(false);
      }
    } catch (error) {
      // Handle any API request errors here
      console.error("Error: ", error);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    // Make the API call for forgot password
    try {
      if(!isEmailValid || email==="")
      setIsEmailValid(false);
      else{
      const response = await fetch("https://nomadic-pen.onrender.com/user/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }).then((response) => response.text())
      .then((code) => {
        console.log(code);
        console.log(email);
        navigate('/reset', { state: { code: code , email} });
      })
      console.log(response);
    }
  }
     catch (error) {
      setPasswordErrorMsg("unable to change password");
        setIsPasswordValid(false);
        
      console.error("Error: ", error);
    }
  
  };

  const handlePasswordChange = (event) => {
    setIsPasswordValid(true);
    if (password !== "") {
      const isValid = regexPassword.test(password);
      setPasswordErrorMsg("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.");
      setIsPasswordValid(isValid);
    }
  };

  const handleEmailChange = (event) => {
    setIsEmailValid(true);
    if (email !== "") {
      const isValid = regexEmail.test(email);
      setIsEmailValid(isValid);
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
        marginTop: "60px"
      }}
      onSubmit={handleSubmit}
      className="author-card"
    >
      <img src={image} alt='loginImage' width="150" height="150" />
      <TextField
        label="Email"
        type="email"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        error={!isEmailValid}
        helperText={
          !isEmailValid ? "Invalid email address" : ""
        }
        onBlur={handleEmailChange}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        error={!isPasswordValid}
        helperText={
          !isPasswordValid
            ? passwordErrorMsg
            : ""
        }
        onBlur={handlePasswordChange}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ width: "20%", margin: "12px auto" }}>
        Login
      </Button>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", width: "100%", margin: "-8px 0" }}>
        <Link href="/signup" variant="body2">
          Create an account
        </Link>
        <Link href="#" onClick={handleForgotPassword} underline="hover">Forgot Password?</Link>
        
      </Box>
    </Box>
  );
};

export default LoginForm;
