/* By Jasmeet singh */
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import FileUploader from "./CreatePost/FileUploader";
import {
  Box,
  TextField,
  Button,
  Link,
  Typography,
  Grid,
  Container,
} from "@mui/material";

const CreateAccount = () => {
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexContact = /^\d+$/;
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [penName, setPenName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isContactValid, setIsContactValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("Invalid email address");
  const [selectedFile, setSelectedFile] = useState(null);

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let enrollDate=new Date();
    const dobDate = new Date(dob);
      const body=JSON.stringify({
        firstName,
        lastName,
        penName,
        dob,
        gender,
        email,
        contact,
        password,
        profilePic: selectedFile,
        enrollmentDate: enrollDate
      });
      console.log(body);
      const response = await fetch("https://nomadic-pen.onrender.com/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      console.log("Create Account Response: ", response); 
      if (response.status === 201) {
        setFirstName('');
          setLastName('');
          setDob('');
          setGender('Male');
          setEmail('');
          setContact('');
          setPassword('');
          setPenName('');
        navigate('/login');
      }
      else if(response.status === 400)
      {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.error;
        setEmailErrorMessage(errorMessage);
        setIsEmailValid(false);
      }
      
    } catch (error) {
      // Handle any API request errors here
      console.error("Error: ", error);
    }

  };

  const handlePasswordChange = (event) => {
    setIsPasswordValid(true);
    const password = event.target.value;
    if (password !== "") {
      const isValid = regexPassword.test(password);
      setIsPasswordValid(isValid);
    }
  };

  const handleEmailChange = (event) => {
    setEmailErrorMessage("Invalid email address");
    setIsEmailValid(true);
    const email = event.target.value;
    if (email !== "") {
      const isValid = regexEmail.test(email);
      setIsEmailValid(isValid);
    }
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleContactChange = (event) => {
    setIsContactValid(true);
    setContact(event.target.value);
    if (contact !== "") {
      const isValid = regexContact.test(contact);
      setIsContactValid(isValid);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
        mx: "auto",
        my: 4,
        width: "70%",
      }}
      onSubmit={handleSubmit}
      className="author-card"
    >
      <Container >
      <Grid container spacing={3} direction="row-reverse">
        <Grid item xs={6}>
      <Box mt={3} textAlign="center" >
        <Typography variant="body1" sx={{ fontWeight: "bold" }} gutterBottom>
          Profile Picture:
        </Typography>
        <FileUploader
          selectedFile={selectedFile}
          onFileChange={handleFileChange}
        />
      </Box>
      </Grid> 
      
      <Grid item xs={6}>
      <Typography variant="h4" gutterBottom>
        Create an Account
      </Typography>
      <TextField
        label="First Name"
        type="text"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        error={false} // No error state for other fields by default
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        type="text"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        error={false}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Pen Name"
        type="text"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        error={false}
        onChange={(e) => setPenName(e.target.value)}
      />
      <TextField
        label="Date of Birth"
        type="date"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        error={false}
        onChange={(e) => setDob(e.target.value)}
      />
      <TextField
        label="Gender"
        type="text"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        error={false}
        onChange={(e) => setGender(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        error={!isEmailValid}
        helperText={!isEmailValid ? emailErrorMessage : ""}
        onBlur={handleEmailChange}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Contact"
        type="text"
        required
        fullWidth
        margin="normal"
        variant="outlined"
        inputProps={{
          pattern: "[0-9]*",
          maxLength: 10,
        }}
        error={!isContactValid}
        helperText={!isContactValid ? "Contact must contain only numbers" : ""}
        onChange={handleContactChange}
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
            ? "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character."
            : ""
        }
        onBlur={handlePasswordChange}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ width: "50%", margin: "20px auto" }}>
        Create Account
      </Button>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">
          Already have an account? <Link href="/login" underline="hover">Login</Link>
        </Typography>
      </Box>
      </Grid></Grid></Container>
    </Box>
  );
};

export default CreateAccount;
