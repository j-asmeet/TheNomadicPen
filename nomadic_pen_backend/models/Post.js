/* Authors: Meet Sinojia, Jamini Bhatt */

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  featuredImage: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  authorId: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
