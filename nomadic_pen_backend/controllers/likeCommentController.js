/* Author: Jamini Bhatt */

const LikeComment = require("../models/likeComment");
const Comment = require("../models/comments");
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

exports.likePost = async (req, res) => {
    try {
        const { postId, likedBy } = req.body;

        const post = new LikeComment({
            postId, likedBy
        });

        const savedData = await post.save();
        res.status(201).json({ data: savedData });
    } catch (error) {
        console.error("Error storing data:", error);
        res.status(500).json({ error: "Failed to store data" });
    }
};

exports.fetchLikes = async (req, res) => {
    try {
        const { postId } = req.body;
        const likes = await LikeComment.find({ postId }).select('likedBy');
        res.status(200).json({ data: likes.map(commentObj => commentObj.likedBy) });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
};


exports.commentPost = async (req, res) => {
    try {
        const { postId, comment, commentBy } = req.body;
        const post = new Comment({
            postId, comment, commentBy
        });
        const savedData = await post.save();
        res.status(201).json({ data: savedData });


    } catch (error) {
        console.error("Error storing data:", error);
        res.status(500).json({ error: "Failed to store data" });
    }
};


exports.fetchComments = async (req, res) => {
    try {
        const { postId } = req.body;
        const comments = await Comment.find({ postId }).select('comment commentBy');
        // res.status(200).json({ data: comments.map(commentObj => commentObj.comment) });
        res.status(200).json({ data: comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
};