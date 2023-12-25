// Author: Pakshal Shah

// backend/routes/subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/', subscriptionController.subscribeUser);

module.exports = router;
