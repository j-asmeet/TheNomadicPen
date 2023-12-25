/* By Jamini Bhatt */

import React from 'react';
import '../../styles/FollowingPage.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import {Backdrop, CircularProgress, Typography} from "@mui/material";


const FollowingPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch the posts from the server
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://nomadic-pen.onrender.com/posts');
      setLoading(false);
      setPosts(response.data.data); 
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Call the fetchPosts function when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to format date to dd - mm - yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
      <Backdrop open={loading} style={{ zIndex: 2, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress color="inherit" style={{ marginBottom: '8px' }} />
        <Typography sx={{ marginTop: '8px', color: '#fff', fontWeight: 'bold' }}>
          Please wait while we fetch the blog posts!
        </Typography>
      </Backdrop>
      <div className="following-page ">
        <div className='row'>
          <div className='col-md-12'>
            <div className='col-md-1' style={{ padding: 10 }}></div>
            <div className='col-md-10'>
              <br />
              
              {/* Search toolbar by Pakshal Shah */}
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='form-control'
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }} 
              />
              {/* Search toolbar by Pakshal Shah */}

              <div className="author-list grow">
                {posts
                  .filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(post => (
                    <div key={post._id} className="author-card">
                      <img
                        className="profile-picture"
                        src={post.featuredImage}
                        alt={`Profile of ${post.title}`} />
                      <h3>{post.title}</h3>
                      <h5> Posted On <b>{formatDate(post.createdAt)}</b></h5>
                      <Link to={"/posts/" + post._id}>
                        More...
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
            <div className='col-md-1' style={{ padding: 10, textAlign: 'right' }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowingPage;