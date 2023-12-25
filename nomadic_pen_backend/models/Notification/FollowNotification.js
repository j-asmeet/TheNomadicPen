/* Author: Meet Sinojia */

const mongoose = require("mongoose");
const Notification = require("./Notification");
const notificationKinds = require("../../utils/notificationKinds");

const followNotificationSchema = new mongoose.Schema({
  actionUser: {
    type: String,
    required: true,
  },
});

const FollowNotification = Notification.discriminator(
  notificationKinds.FOLLOW,
  followNotificationSchema
);

module.exports = FollowNotification;
