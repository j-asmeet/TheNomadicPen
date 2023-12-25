/*Author : Sreejith Nair */
const GalleryUpload = require('../models/GalleryUpload');

exports.uploadImage = async (req, res) => {
    try {
        const { email, picture, tags, country } = req.body;
        const galleryUpload = new GalleryUpload({
            email,
            picture,
            tags,
            country,
        });

        const savedGalleryPost = await galleryUpload.save();

        res.status(201).json({ data: savedGalleryPost });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to upload image to gallery." });
    }
};

exports.getGalleryImages = async (req, res) => {
    try {
        const images = await GalleryUpload.find(); // Fetch all images from the collection
        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Error fetching images' });
    }
};