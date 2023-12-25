/* Author: Sreejith Nair */
const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// Route for uploading profile picture
router.post('/uploadImage', galleryController.uploadImage);
router.get('/getImages', galleryController.getGalleryImages);

module.exports = router;
