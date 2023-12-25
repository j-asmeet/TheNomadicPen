/*Author : Sreejith Nair */
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    email: { type: String, required: true },
    picture: { type: String, required: true },
    tags: [{ type: String }],
    country: { type: String, required: true },
});

const GalleryUpload = mongoose.model('GalleryUpload', imageSchema);

module.exports = GalleryUpload;
