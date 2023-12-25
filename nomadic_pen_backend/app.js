const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const postRoutes = require("./routes/posts");
const scheduledPostRoutes = require("./routes/scheduledPosts");
const articleRoutes = require('./routes/articleListRoutes');
const cron = require("./utils/cron");
const travelGuideRoutes = require("./routes/travelGuideRoutes");
const usersRoutes = require("./routes/users");
const profileRoutes = require('./routes/profileRoute');
const notificationRoutes = require("./routes/notificationRoutes");
const galleryRoutes = require('./routes/galleryRoutes');
const statisticsRoutes=require("./routes/statistics");

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(cors());
// Set up MongoDB connection
connectDB();

// Define API routes
app.use("/posts", postRoutes);
app.use("/scheduled-posts", scheduledPostRoutes);
app.use("/fetchAllArticles", articleRoutes);
app.use("/nomadic-pen", travelGuideRoutes);
app.use("/user", usersRoutes);
app.use('/api/subscriptions', require('./routes/subscriptionRoutes'));
app.use("/profile", profileRoutes);
app.use("/notifications", notificationRoutes);
app.use("/gallery", galleryRoutes);
app.use("/stats", statisticsRoutes);

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Start the cron job
cron.start();
