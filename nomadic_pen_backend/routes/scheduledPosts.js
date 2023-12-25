/* Author: Meet Sinojia */

const express = require("express");
const router = express.Router();
const scheduledPostsController = require("../controllers/scheduledPostsController");

router.post("/", scheduledPostsController.createScheduledPost);

module.exports = router;
