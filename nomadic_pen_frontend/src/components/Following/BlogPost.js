/* Author: Jamini Bhatt */

import React from 'react';
import '../../styles/BlogPost.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faPaperPlane, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import * as constants from "../../constants";


const BlogPost = () => {
  const [post, setPost] = useState();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState();
  const { id } = useParams(); // Extracts the post ID from the URL
  const currentUserId = localStorage.getItem("email");
  //const currentUserId = "trusha@gmail.com";
  const [commentsWithCommentBy, setCommentsWithCommentBy] = useState([]);


  const fetchPostById = async () => {
    try {
      const response = await axios.get(`${constants.BACKEND_URL}/posts/${id}`);
      setPost(response.data.data);
      fetchCommentsById();
      fetchLikesById();
    } catch (error) {
      console.error('Error fetching post by ID:', error);
    }
  };

  const fetchCommentsById = async () => {
    try {
      const response = await axios.post(`${constants.BACKEND_URL}/posts/fetchcomment`, {
        postId: id,
      });
      const jsonData = response.data.data;
      const updatedComments = jsonData.map(commentObj => ({
        comment: commentObj.comment,
        commentBy: commentObj.commentBy
      }));
      setCommentsWithCommentBy(updatedComments);
      console.log(response);
    } catch (error) {
      console.error('Error fetching comments by ID:', error);
      commentsWithCommentBy = [];
    }
  };

  //Fetch Likes count 
  const fetchLikesById = async () => {
    try {
      const response = await axios.post(`${constants.BACKEND_URL}/posts/fetchlikes`, {
        postId: id,
      });
      const jsonData = response.data.data;
      jsonData.forEach(item => {
        if (item === currentUserId) {
          $('#like').addClass('hithere');
          $('#like').addClass('disabled-icon');
          return;
        }
        
      });
      if (!$('#like').hasClass('disabled-icon')) {
        $('#like').removeClass('disabled-icon');
      }
      setLikeCount(jsonData.length);
    } catch (error) {
      console.error('Error fetching likes by ID:', error);
    }
  };



  // Call the fetch function when the component mounts or when the ID changes
  useEffect(() => {
    fetchPostById();
  }, [id]);

  const likepost = async () => {
    $('#like').addClass('hithere');
    try {
      console.log(`${constants.BACKEND_URL}/posts/like`);
      const response = await axios.post(`${constants.BACKEND_URL}/posts/like`, {
        postId: id,
        likedBy: currentUserId,
      });
      fetchLikesById();
      const notificationRes = await axios.post(`${constants.BACKEND_URL}/notifications/like`, {
        actionUser: currentUserId,
        postId: id,
      });
      console.log(notificationRes);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }

  function commentpost() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });

  }
  const submitComment = async () => {
    try {
      console.log("Submitting comment:", commentText);
      setComments([...comments, commentText]);
      setCommentText("");
      const response = await axios.post(`${constants.BACKEND_URL}/posts/comment`, {
        postId: id,
        comment: commentText,
        commentBy: currentUserId
      });
      fetchCommentsById();
      const notificationRes = await axios.post(`${constants.BACKEND_URL}/notifications/comment`, {
        actionUser: currentUserId,
        postId: id,
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // Function to format date to dd - mm - yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      <div className='row'>
        <div className='col-md-12'>
          <div className='col-md-1' style={{ padding: 10 }}></div>
          <div className='col-md-10'>
            <div className="blog-post grow">
              {post ? ( // Render the post data if it is available
                <>
                  <img className="picture" src={post.featuredImage} alt="Featured" />
                  <h1>{post.title}</h1>
                  <FontAwesomeIcon id="like" onClick={() => { likepost() }} style={{ textAlign: 'right', marginRight: '15px' }} className='icon' icon={faThumbsUp} />
                  <FontAwesomeIcon style={{ textAlign: 'right' }} onClick={() => { commentpost() }} className='icon' icon={faComment} />
                  <p>{likeCount} likes</p>

                  {/* Render other post details */}
                  <div className="meta-info">
                    <p className="author">Posted by {post.authorId} on {formatDate(post.createdAt)}</p>
                    <p className="date-posted"></p>
                  </div>
                  <div className='content' dangerouslySetInnerHTML={{ __html: post.content }} />
                  <hr className="hrClass" />


                  <><div className="row">
                    <div className='col-md-12'>
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write your comment..."
                        className="form-control"
                        style={{ marginBottom: '10px' }} />
                      <FontAwesomeIcon id="like" onClick={() => { submitComment() }} style={{
                        position: 'absolute',
                        bottom: '25px',
                        right: '25px',
                        height: 25
                      }} className='icon' icon={faPaperPlane} />
                    </div>
                  </div>
                  </>

                  <h4>Comments</h4>
                  <div className="row">
                    <div className="col-md-12" >
                      <div className="col-md-12" style={{backgroundColor: '#fffafa', borderRadius: 4}}>
                        {/* {comments.map((comment, index) => (
                          <div key={index}>
                            {comment}
                            <p className="comment">by {currentUserId}</p>
                          </div>
                        ))} */}
                        {commentsWithCommentBy.map((commentObj, index) => (
                          <div key={index}>
                            {commentObj.comment}
                            <p className="comment">By {commentObj.commentBy}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading...</p> // Render a loading message while the data is being fetched
              )}
              <hr className="hrClass" />
              <p style={{ textAlign: 'right' }}><Link to={"/posts/following"}>Back to Discover page</Link></p>
            </div>
          </div>
          <div className='col-md-1' style={{ padding: 10, textAlign: 'right' }}></div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
