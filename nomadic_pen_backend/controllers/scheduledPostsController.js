/* Author: Meet Sinojia */

const ScheduledPost = require("../models/ScheduledPost");

exports.createScheduledPost = async (req, res) => {
  try {
    const { title, featuredImage, content, tags, scheduledDateTime, authorId } =
      req.body;

    // Create a new scheduled post using the ScheduledPost model
    const scheduledPost = new ScheduledPost({
      title,
      featuredImage,
      content,
      tags,
      scheduledDateTime,
      authorId,
    });

    // Save the scheduled post to the database
    const savedScheduledPost = await scheduledPost.save();

    res.status(201).json({ data: savedScheduledPost });
  } catch (error) {
    console.error("Error creating scheduled post:", error);
    res.status(500).json({ error: "Failed to create scheduled post" });
  }
};
