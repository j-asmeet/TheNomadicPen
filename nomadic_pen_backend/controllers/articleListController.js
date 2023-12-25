/* Author: Sreejith Nair */
const Post = require("../models/Post");

// Controller function to fetch all articles
exports.getAllArticles = async (req, res) => {
    try {
        // Fetch all articles from the database
        const articles = await Post.find().lean();
        // Respond with the fetched articles
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error: error.message });
    }
};

// Controller function to fetch all articles
exports.getArticlesByArticleId = async (req, res) => {
    try {
        const userEmail = req.params.userEmail;
        console.log('Re:',req.params);
        console.log('Fetching user articles for ',userEmail);
        // Fetch articles where the authorId matches the user's email
        const articles = await Post.find({ authorId: userEmail });
        // Respond with the fetched articles
        console.log('Image:',articles.featuredImage);
        console.log('Email:',articles.authorId);
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error: error.message });
    }
};