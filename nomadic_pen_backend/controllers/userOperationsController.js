/* By Jasmeet singh */
const User = require("../models/user");
const sendEmail = require("../services/emailService"); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authSecret='8b45ce998ecccba7ebcd59af83085bfac85400f1cea8b9b8c7f73a27a15c9a34bbc65039815bbd7326ca934ba31ffe7127061432c7a8170ef477ae629d35f0ff0a7518e0c2452a2d5e8c9c288143dedc11f5bd21c953c200ddc0de09fe5e2008519517492257d5ccd70131b52b1871bb5e08982cde777da536781c638419ff8b';


exports.addUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      penName,
      dob,
      gender,
      email,
      contact,
      password,
      profilePic,
      enrollmentDate,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const existingPenName = await User.findOne({ penName });
    if (existingPenName) {
      return res.status(400).json({ error: 'Pen Name already Taken' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using the User model
    const user = new User({
      firstName,
      lastName,
      penName,
      dob: new Date(dob), // Convert the dob string to a Date object
      gender,
      email,
      contact,
      password : hashedPassword,
      profilePic,
      enrollmentDate: enrollmentDate ? new Date(enrollmentDate) : new Date(), // Use provided enrollmentDate or default to the current date
    });

    // Save the user to the database
    const savedUser = await user.save();
    const emailSubject = 'Account Created Successfully';
    const emailContent = `
      <p>Dear ${firstName},</p>
      <p>Your account has been successfully created.</p>
      <p>Thank you for joining our platform!</p>
      <p>Best regards,<br>TheNomadicPen Team</p>
    `;
    await sendEmail(email, emailSubject, emailContent);

    res.status(201).json({ data: savedUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
};

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Find the user based on the provided email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(200).json({ error: "User not found" });
      }
  
      // Generate a 6-digit verification code
      const verificationCode = generateVerificationCode();
  
  
      // Send the verification code via email
      const emailSubject = 'Password Reset Verification Code';
      const emailContent = `
        <p>Dear ${user.firstName},</p>
        <p>Your verification code for password reset is: <strong>${verificationCode}</strong></p>
        <p>If you didn't request a password reset, please ignore this email.</p>
        <p>Best regards,<br>TheNomadicPen Team</p>
      `;
      await sendEmail(email, emailSubject, emailContent);
  
      res.status(200).json({ code: verificationCode });
    } catch (error) {
      console.error("Error sending verification code:", error);
      res.status(500).json({ error: "Failed to send verification code" });
    }
  };
  
  exports.updatePassword = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user based on the provided email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
     
    const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
  

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ error: "Failed to update password" });
    }
  };

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user based on the provided email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const tokenPayload = { email: user.email };
      const token = jwt.sign(tokenPayload, authSecret, { expiresIn: '1h'}); 

      res.status(200).json({ userId : email, bearerToken : token});
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Failed to log in' });
    }
  };