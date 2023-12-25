/* By Jasmeet singh */
const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

router.get('/', statisticsController.getStatistics);

module.exports = router;