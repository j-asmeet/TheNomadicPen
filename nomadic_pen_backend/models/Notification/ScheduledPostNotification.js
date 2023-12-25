/* Author: Meet Sinojia */

const mongoose = require("mongoose");
const Notification = require("./Notification");
const notificationKinds = require("../../utils/notificationKinds");

const scheduledPostNotificationSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const ScheduledPostNotification = Notification.discriminator(
  notificationKinds.SCHEDULED_POST,
  scheduledPostNotificationSchema
);

module.exports = ScheduledPostNotification;
