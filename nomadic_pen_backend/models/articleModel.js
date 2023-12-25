const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    article_id: String,
    article_title: String,
    article_overview: String,
    article_content: String,
    article_abstract: String,
    article_image: String,
    article_post_date: String,
    article_author_id: String
});

const TravelGuideArticle = mongoose.model('TravelGuideArticle', schema);

module.exports = TravelGuideArticle;