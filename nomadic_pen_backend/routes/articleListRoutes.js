/* Author: Sreejith Nair */
const express = require('express');
const articleListController = require('../controllers/articleListController');

const router = express.Router();

// Define the route for fetching all articles
router.get('/', articleListController.getAllArticles);
router.get('/:userEmail', articleListController.getArticlesByArticleId);

module.exports = router;
