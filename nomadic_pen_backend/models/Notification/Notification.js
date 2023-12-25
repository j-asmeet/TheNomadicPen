/* Author: Meet Sinojia */

const mongoose = require("mongoose");
const notificationKinds = require("../../utils/notificationKinds");

const notificationSchema = new mongoose.Schema(
  {
    kind: {
      type: String,
      enum: Object.values(notificationKinds),
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    notifiedUser: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.set("discriminatorKey", "kind");
const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
