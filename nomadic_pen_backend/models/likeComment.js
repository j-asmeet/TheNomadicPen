/* Author: Jamini Bhatt */

const mongoose = require("mongoose");

const likeCommentModel = new mongoose.Schema({
  postId: { type: String, required: true },
  likedBy: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

const LikeComment = mongoose.model("likeComment", likeCommentModel);

module.exports = LikeComment;
