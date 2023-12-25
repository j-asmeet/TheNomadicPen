/* Author: Taha Zanzibarwala */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import ReactModal from 'react-modal';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import emailjs from '@emailjs/browser';


const TravelGuideArticle = () => {

    const [title, setTitle] = useState();
    const [imageSrc, setImageSrc] = useState();
    const [author, setAuthor] = useState();
    const [content, setContent] = useState();

    const [modal, setModal] = useState(false);
    const [requestMessage, setRequestMessage] = useState('');

    const { state } = useLocation();

    const handleShareClick = () => {
        setModal(true);
    };

    const handleModalClose = () => {
        setModal(false);
    };

    const handleFacebookShare = () => {
        const url = encodeURIComponent(window.location.href);
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        window.open(facebookShareUrl, '_blank');
    };

    const handleTwitterShare = () => {
        const url = encodeURIComponent(window.location.href);
        const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}`;
        window.open(twitterShareUrl, '_blank');
    };

    const handleSubmit = () =>{
        const requestBody = {}
        requestBody.message = requestMessage;
        requestBody.tomail = "zanzibarwalataha786@gmail.com";
        emailjs.send("service_smozw1e", "template_e27fup9", requestBody, "yn_-CSiHl32axqQL1")
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
        setModal(false);
    }

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const articleDataResponse = await axios.get(`https://nomadic-pen.onrender.com/nomadic-pen/travel-guide/article/${state}`);
                const articleData = articleDataResponse.data;
                articleData.map((article) => {
                    setTitle(article["article_title"]);
                    setAuthor(article["article_author_id"]);
                    setContent(article["article_content"]);
                    setImageSrc(article["article_image"]);

                    return {};
                })

                console.log(articleData)
            } catch (error) {
                console.error(error);
            }
        }

        fetchArticle();
    }, [state]);

    return (
        <>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/fontawesome.min.css"></link>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

            <div className='travel-article'>
                <div className='row'>
                    <div className='col-md-12 '>
                        <div className='col-md-10 author-card'>
                            <p style={{ 'text-align': 'center' }}>
                                <img
                                    className="picture"
                                    src={`data:image/png;base64,${imageSrc}`} alt="Red dot" width="650" height="600" />
                            </p>
                            <h1>{title} </h1>
                            <div className="meta-info">
                                <p className="author">By {author}</p>
                            </div>
                            <p className="content">{content}</p>
                            <button onClick={handleShareClick}>Share Article</button>
                        </div>

                    </div>
                </div>
            </div>
            <ReactModal isOpen={modal}>
                <h3>Share article using social media!</h3>
                <FaFacebook onClick={handleFacebookShare} size={70}/>
                <FaTwitter onClick={handleTwitterShare} size={70}/>
                <div>
                    <form onSubmit={handleSubmit}>
                        <h3>Request use of article for non-profit</h3>
                        <h3>Author will reply to mentioned mail in the message :)</h3>
                        <input type="text"
                               onChange={(e)=>setRequestMessage(e.target.value)}/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <button onClick={handleModalClose}>Close</button>
            </ReactModal>
        </>

    );
};

export default TravelGuideArticle;
