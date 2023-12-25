/* Author: Sreejith Nair */
const User = require('../models/user');
const Post = require("../models/Post");
const bcrypt = require('bcryptjs');

exports.uploadProfilePicture = async (req, res) => {
    try {
        console.log("Uploading new profile picture...");

        const { email, profilePicture } = req.body;
        // Find the user by email and update the profile picture
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { profilePic: profilePicture },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Profile Picture uploaded to database.');
        res.status(200).json({ message: 'Profile picture uploaded successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading profile picture.', error: error.message });
    }
};

// Helper function to get the total number of posts for a user
const getUserTotalPosts = async (email) => {
    try {
        // Count the number of posts with matching authorId
        console.log('Counting docs:',email);
        const totalPosts = await Post.countDocuments({ authorId: email });
        console.log('Counting totalPosts:',totalPosts);
        return totalPosts;
    } catch (error) {
        throw new Error('Error fetching user total posts');
    }
};

// Controller function to fetch all user profile details
exports.getUserProfileDetails = async (req, res) => {
    try {

        console.log('Fetching User Profile Picture');
        const { email } = req.params;

        // Find the user by email. The Profile picture is already available in this response.
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('User fetched, fetching total posts');
        // Get the total number of posts for the user
        const totalPosts = await getUserTotalPosts(email);

        // Create a new object to hold only the necessary profile details without totalPosts
        const userProfile = {
            firstName: user.firstName,
            lastName: user.lastName,
            penName: user.penName,
            dob: user.dob,
            gender: user.gender,
            email: user.email,
            contact: user.contact,
            profilePic: user.profilePic,
            enrollmentDate: user.enrollmentDate
        };
        // Add the totalPosts count to the userProfile object
        userProfile.totalPosts = totalPosts;

        // Respond with the user profile details including the total number of posts
        return res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile details', error: error.message });
    }
};

// Controller function to update the penName in the user collection
exports.updatePenName = async (req, res) => {
    const { email } = req.params;
    const { newPenName } = req.body;

    try {
        // Check if the newPenName already exists in the database
        console.log('Checking for duplicate pen names. new penname:',newPenName);
        const existingUser = await User.findOne({ penName: newPenName });
        if (existingUser) {
            // If the new penName already exists, return the response with isPenNameTaken set to true
            console.log('This pen name is duplicate.');
            return res.status(200).json({ isPenNameTaken: true });
        }

        // If the new penName is not taken, update the penName in the database for the user with userEmail
        await User.updateOne({ email: email }, { penName: newPenName });
        return res.status(200).json({ isPenNameTaken: false });
    } catch (error) {
        console.error('Error updating penName:', error);
        return res.status(500).json({ error: 'Error updating penName' });
    }
};

exports.updateUserPassword = async (req, res) => {
    const { userEmail, oldPassword, newPassword } = req.body;
    try {
        console.log('Validating password change');
        // Find the user in the database
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the old password matches the hashed password in the database
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            console.log('Current Password is incorrect');
            return res.status(400).json({ error: "Current Password entered is incorrect" });
        }

        // Hash the new password before saving it to the database
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password with the new hashed password
        user.password = hashedNewPassword;
        await user.save();
        console.log('Password is successfully updated');
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};