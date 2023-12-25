/* By Jasmeet singh */
const express = require('express');
const router = express.Router();

const usercontroller = require('../controllers/userOperationsController');
const authenticateToken = require('../controllers/authenticationController');

router.post('/', usercontroller.addUser);
router.post('/forgotPassword', usercontroller.forgotPassword);
router.put('/updatePassword',usercontroller.updatePassword);
router.post('/login',usercontroller.login);
module.exports = router;
