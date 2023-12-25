/* By Jasmeet singh */
const User = require("../models/user");
const Post=require("../models/Post")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getStatistics = async (req, res) => {
    try {
      const registeredUsers = await User.countDocuments();
      const totalPosts = await Post.countDocuments();
      const postsThisMonth = await Post.countDocuments({
        createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
      });
      const activeUsersThisMonth = (await Post.distinct("authorId", {
        createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
      })).length;
  
      const userStatistics = await User.aggregate([
        {
          $match: {
            enrollmentDate: {
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 3))
            }
          }
        },
        {
          $addFields: {
            monthName: {
              $switch: {
                branches: [
                        { case: { $eq: [1, { $month: "$enrollmentDate" }] }, then: "January" },
                        { case: { $eq: [2, { $month: "$enrollmentDate" }] }, then: "February" },
                        { case: { $eq: [3, { $month: "$enrollmentDate" }] }, then: "March" },
                        { case: { $eq: [4, { $month: "$enrollmentDate" }] }, then: "April" },
                        { case: { $eq: [5, { $month: "$enrollmentDate" }] }, then: "May" },
                        { case: { $eq: [6, { $month: "$enrollmentDate" }] }, then: "June" },
                        { case: { $eq: [7, { $month: "$enrollmentDate" }] }, then: "July" },
                        { case: { $eq: [8, { $month: "$enrollmentDate" }] }, then: "August" },
                        { case: { $eq: [9, { $month: "$enrollmentDate" }] }, then: "September" },
                        { case: { $eq: [10, { $month: "$enrollmentDate" }] }, then: "October" },
                        { case: { $eq: [11, { $month: "$enrollmentDate" }] }, then: "November" },
                        { case: { $eq: [12, { $month: "$enrollmentDate" }] }, then: "December" }
                ],
                default: "Invalid Month"
              }
            }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$enrollmentDate" },
              month: "$monthName"
            },
            enrolled_users: { $sum: 1 }
          }
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1
          }
        }
      ]);

      const likesStatistics = await Post.aggregate([
        { $lookup: { from: "users", localField: "authorId", foreignField: "email", as: "authorInfo" } },
        { $unwind: "$authorInfo" },
        { $lookup: { from: "likecomments", localField: "_id", foreignField: "postId", as: "likes" } },
        { $group: { _id: "$authorInfo.email", name: { $first: { $concat: ["$authorInfo.firstName", " ", "$authorInfo.lastName"] } }, email: { $first: "$authorInfo.email" }, totalLikes: { $sum: 1 } } },
        {
            $sort: {
              totalLikes: -1
            }
          },
          {
            $limit: 3
          }
      ]);
  
      const statistics = {
        registeredUsers,
        totalPosts,
        postsThisMonth,
        activeUsersThisMonth,
        userStatistics,
        likesStatistics
      };
  
      res.status(200).json(statistics);
    } catch (error) {
      console.error('Error retrieving statistics:', error);
      res.status(500).json({ error: 'Failed to retrieve statistics' });
    }
  };