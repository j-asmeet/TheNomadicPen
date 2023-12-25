/* Authors: Meet Sinojia, Jamini Bhatt */

const express = require("express");
const postsController = require("../controllers/postsController");
const likeCommentController = require("../controllers/likeCommentController");


const router = express.Router();

/* By Meet Sinojia */
router.post("/", postsController.createPost);


/* By Jamini Bhatt */
router.get("/", postsController.fetchPosts); //Jamini
router.get("/:id", postsController.fetchPostById); //Jamini
router.post("/like", likeCommentController.likePost); //Jamini
router.post("/comment", likeCommentController.commentPost); //Jamini
router.post("/fetchcomment", likeCommentController.fetchComments); //Jamini
router.post("/fetchlikes", likeCommentController.fetchLikes); //Jamini

module.exports = router;
