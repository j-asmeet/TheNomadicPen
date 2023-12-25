/* Authors: Meet Sinojia, Jamini Bhatt */

const Post = require("../models/Post");
const User = require("../models/user");

/* By Meet Sinojia */
exports.createPost = async (req, res) => {
  try {
    const { title, featuredImage, content, tags, authorId } = req.body;

    // Create a new post using the Post model
    const post = new Post({
      title,
      featuredImage,
      content,
      tags,
      authorId,
    });

    // Save the post to the database
    const savedPost = await post.save();

    res.status(201).json({ data: savedPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};


/* By Jamini Bhatt */

//Jamini
exports.fetchPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});

    // Send the fetched posts in the specified format
    const formattedPosts = allPosts.map(({ _id, title, featuredImage, content, tags, authorId, createdAt }) => ({
      _id,
      title,
      featuredImage,
      content,
      tags,
      authorId,
      createdAt
    }));

    res.status(200).json({ data: formattedPosts });

  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

//Jamini
exports.fetchPostById = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the ID is provided in the URL parameters

    // // Fetch the document with the provided ID
    const post = await Post.findById(id).exec();


    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

 const email = post.authorId;
 const user = await User.findOne({ email });
    const penName = user.penName;
    // Send the fetched post in the specified format
    const formattedPost = {
      _id: post._id,
      title: post.title,
      featuredImage: post.featuredImage,
      content: post.content,
      tags: post.tags,
      authorId: penName,
      createdAt: post.createdAt
    };

    res.status(200).json({ data: formattedPost });
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};
