/* Author: Sreejith Nair */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { List, ListItem, Box, Typography, Card, CardContent, CardMedia, CardActionArea, Chip, CircularProgress} from '@mui/material';
import { useNavigate } from 'react-router-dom';
const ArticleBox = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const handleArticleClick = (articleId) => {
        // Redirect to the ArticlePage when an article card is clicked
        console.log('Navigating to article id: ',articleId);
        navigate(`/posts/${articleId}`);
    };

    useEffect(() => {
        const email = localStorage.getItem("email");
        axios.get(`https://nomadic-pen.onrender.com/fetchAllArticles/${email}`)
            .then((response) => {
                setLoading(false);
                setArticles(response.data);
            })
            .catch((error) => {
                console.error('Error fetching articles:', error);
            });
    }, []);

    return (
        <>
            <h3>My Posted Articles</h3>
            <Box name="articleBox" sx={{ display: 'flex', maxHeight: '410px', overflow: 'auto', border: '1px solid black', borderRadius: '4px' }}>
                {loading ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            padding: '16px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            width: '100%',
                            maxWidth: '200px',
                            margin: 'auto',
                        }}
                    >
                        <CircularProgress />
                        <Typography sx={{ marginTop: '16px' }}>Please wait while we fetch your articles!</Typography>
                    </Box>
                ) : (articles.length === 0 ? (
                        <div style={{ margin: 'auto', padding: '16px' }}>No posts from the user. Start writing your first article!</div>
                    ) : (
                        <List sx={{ width: '100%'}}>
                            {articles.map((article) => (
                                <ListItem key={article._id}>
                                    <Card sx={{ width: '100%' }}>
                                        <CardActionArea onClick={() => handleArticleClick(article._id)}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image= {article.featuredImage}
                                                alt={article.title}
                                            />
                                            <CardContent>
                                                <Typography variant="h5" component="div">
                                                    {article.title}
                                                </Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                                        {article.tags.map((tag, index) => (
                                                            <Chip key={index} label={tag} />
                                                        ))}
                                                    </Box>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Posted on : {new Date(article.createdAt).toLocaleString()}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </ListItem>
                            ))}
                        </List>
                    )
                )}

            </Box>
        </>
    );
};

export default ArticleBox;