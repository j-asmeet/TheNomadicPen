/* Author: Meet Sinojia */

const mongoose = require("mongoose");
const Notification = require("./Notification");
const notificationKinds = require("../../utils/notificationKinds");

const commentNotificationSchema = new mongoose.Schema({
  actionUser: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const CommentNotification = Notification.discriminator(
  notificationKinds.COMMENT,
  commentNotificationSchema
);

module.exports = CommentNotification;
