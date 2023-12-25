// Author: Pakshal Shah

// backend/routes/subscriptions.js
const express = require('express');
// const { useState } = require('react');
const router = express.Router();

// POST /api/subscriptions
router.post('/', (req, res) => {
    console.log("request : " ,req.body)
  const { email } = req.body;
  // Save the email to the database or perform any necessary actions
  console.log('Subscribed email:', email);
  
    
  res.status(200).json({ message: 'Subscription successful' });
});

module.exports = router;
