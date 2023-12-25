/* Author: Meet Sinojia */

const cron = require("node-cron");

const ScheduledPost = require("../models/ScheduledPost");
const Post = require("../models/Post");
const notificationController = require("../controllers/notificationController");

const cronJob = cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    // Find all scheduled posts that have a scheduledDateTime less than or equal to the current date/time
    const scheduledPosts = await ScheduledPost.find({
      scheduledDateTime: { $lte: now },
    });

    // Move each scheduled post to the Post collection and remove it from the ScheduledPost collection
    for (const scheduledPost of scheduledPosts) {
      const post = new Post({
        title: scheduledPost.title,
        featuredImage: scheduledPost.featuredImage,
        content: scheduledPost.content,
        tags: scheduledPost.tags,
        authorId: scheduledPost.authorId,
      });

      await post.save();
      await ScheduledPost.findByIdAndRemove(scheduledPost._id);

      // Send notification
      await notificationController.addScheduledPostNotification(post._id);
    }

    if (scheduledPosts.length > 0) {
      console.log(`Moved ${scheduledPosts.length} scheduled posts`);
    }
  } catch (error) {
    console.error("Error processing cron job:", error);
  }
});

module.exports = cronJob;
