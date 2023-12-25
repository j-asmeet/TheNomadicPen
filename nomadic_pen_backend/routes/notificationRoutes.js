/* Author: Meet Sinojia */

const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.get("/", async (req, res) => {
  const { userId } = req.query;

  try {
    const notifications = await notificationController.getNotifications(userId);
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/like", async (req, res) => {
  const { actionUser, postId } = req.body;
  try {
    const newLikeNotification =
      await notificationController.addLikeNotification(actionUser, postId);
    res.json({ success: true, notification: newLikeNotification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/comment", async (req, res) => {
  const { actionUser, postId } = req.body;
  try {
    const newCommentNotification =
      await notificationController.addCommentNotification(actionUser, postId);
    res.json({ success: true, notification: newCommentNotification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/follow", async (req, res) => {
  const { notifiedUser, actionUser } = req.body;
  try {
    const newFollowNotification =
      await notificationController.addFollowNotification(
        notifiedUser,
        actionUser
      );
    res.json({ success: true, notification: newFollowNotification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/scheduled-post", async (req, res) => {
  const { postId } = req.body;
  try {
    const scheduledPostNotification =
      await notificationController.addScheduledPostNotification(postId);
    res.json({ success: true, notification: scheduledPostNotification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put(
  "/:notificationId/mark-read",
  notificationController.markNotificationAsRead
);

router.put("/mark-all-read", notificationController.markAllNotificationsAsRead);

module.exports = router;
