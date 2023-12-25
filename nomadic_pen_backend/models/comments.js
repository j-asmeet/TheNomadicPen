/* Author: Jamini Bhatt */

const mongoose = require("mongoose");

const CommentModel = new mongoose.Schema({
  postId: { type: String, required: true },
  comment: { type: String, required: false },
  commentBy: { type: String, required: false},
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model("comments", CommentModel);

module.exports = Comment;
