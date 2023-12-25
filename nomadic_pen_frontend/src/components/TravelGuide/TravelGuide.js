/* Author: Taha Zanzibarwala */

import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from '@mui/material';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
// import TravelGuideBlog from "./TravelGuideBlog";

const TravelGuide = () => {

    const [userInput, setUserInput] = useState('None');
    const [userDurationInput, setUserDurationInput] = useState('None');
    const [blogData, setBlogData] = useState([]);
    const [featureCities, setFeatureCities] = useState([]);
    const [featureDuration, setFeatureDuration] = useState([]);

    const navigate = useNavigate();

    const Blog = ({title, abstract, imageSrc}) => {
        return (
            <Card sx={{display:'flex', flexDirection:'column', maxWidth: 450, height:425}}>
                <CardMedia sx={{height:'100%', width:'100%'}} title={title} componet='img' image={`data:image/jpg;base64, ${imageSrc}`}/>
                <CardContent sx={{flexGrow:1}}>
                    <Typography variant="h5" color="#000000">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="#555555">
                        {abstract}
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const blogDataResponse = await axios.get('https://nomadic-pen.onrender.com/nomadic-pen/travel-guide');
                const responseData = blogDataResponse.data;
                const extractedArticles = responseData.map((article) => {
                    const articleTags = article.article_tags;
                    let cityName = '';
                    let duration  = '';
                    if (Array.isArray(articleTags) && articleTags.includes('TG')) {
                        const cityTag = articleTags.find((tag) => tag.startsWith('City:'));
                        const durationTag = articleTags.find((tag) => tag.startsWith('Duration:'));

                        if (cityTag) {
                            cityName = cityTag.split(':')[1];
                        }
                        if (durationTag){
                            duration = durationTag.split(':')[1];
                        }
                    }
                    return{
                        ...article, cityName, duration
                    };
                });
                setBlogData(extractedArticles);
            } catch (error) {
                console.error(error);
            }
        }

        const fetchFeatureCities = async () => {
            try{
                const fetchQueryResponse = await axios.get('https://nomadic-pen.onrender.com/nomadic-pen/travel-guide/fetch-feature-cities');
                const fetchResponseData = fetchQueryResponse.data;
                setFeatureCities(fetchResponseData['cities']);
            }catch (error) {
                console.error(error);
            }
        }

        const fetchFeatureDurations = async () => {
            try{
                const fetchQueryResponse = await axios.get('https://nomadic-pen.onrender.com/nomadic-pen/travel-guide/fetch-feature-durations');
                const fetchResponseData = fetchQueryResponse.data;
                setFeatureDuration(fetchResponseData['durations']);
            }catch (error) {
                console.error(error);
            }
        }

        fetchFeatureCities();
        fetchFeatureDurations();
        fetchBlogData();
    }, []);

    const filterCities = userInput === 'None' ? blogData : blogData.filter((blog)=>blog.cityName===userInput)

    const filterDurations = userDurationInput === 'None' ? filterCities : filterCities.filter((blog)=>blog.duration===userDurationInput)

    const handleBlogClick = (id) => {
        navigate(`/travel-guide/article/${id}`, {state: id.toString()});
    };

    return (
        <div className="App">

            <section style={{backgroundColor:"#FDEE00", padding:"5rem", display:"block", alignItems:"center", justifyContent:"center", height:"30vh"}}>
                <Typography variant="h1" component="div" sx={{ flexGrow: 1, mx:'auto' }} color="#000000" fontFamily="Calibri" align="center">
                    Travel Guide
                </Typography>
                <Typography variant="h2" component="div" sx={{ flexGrow: 1, mx:'auto' }} color="#000000" fontFamily="Calibri" align="center">
                    See what's pop'n in the travel community
                </Typography>
            </section>

            <section style={{backgroundColor:"#FDEE00", padding:"1rem", height:"5vh", alignItems:"center", justifyContent:"center"}}>
                <Box textAlign='center'>
                    {featureCities.map((city, index)=>(
                        <Button value={city} key={index} onClick={()=>setUserInput(city)} variant="contained"
                                style={{backgroundColor:userInput===city?"#023047":"#FEFEFA",
                                    color:userInput===city?"#FEFEFA":"#000000", marginRight:"1rem"}}>
                            {city}
                        </Button>
                    ))}
                    <Button value="N" onClick={()=>setUserInput("None")} variant="contained"
                            style={{backgroundColor:"#FEFEFA", color:"#000000"}}>
                        Reset selection
                    </Button>
                </Box>
            </section>

            <section style={{backgroundColor:"#F0F8FF", padding:"1rem", height:"5vh"}}>
                <Box textAlign='center'>
                    {featureDuration.map((duration, index)=>(
                        <Button value={duration} key={index} onClick={()=>setUserDurationInput(duration.toString())} variant="contained"
                                style={{backgroundColor:userDurationInput===duration.toString()?"#3a5a40":"#000000",
                                    color:userDurationInput===duration.toString()?"#dad7cd":"#FEFEFA", marginRight:"1rem"}}>
                            {duration} - Day Trip
                        </Button>
                    ))}
                    <Button value="N" onClick={()=>setUserDurationInput("None")} variant="contained"
                            style={{backgroundColor:"#000000", color:"#FEFEFA"}}>
                        Reset selection
                    </Button>
                </Box>
            </section>

            <Grid container spacing={3} padding={10}>
                {filterDurations.map((post, index)=>(
                    <Grid item xs={12} sm={6} md={4} key={index}
                          onClick={() => handleBlogClick(post.article_id)}  alignItems={'center'} justify={'center'}>
                        {Blog({title:post.article_title,abstract:post.article_abstract,imageSrc:post.article_image,content:post.article_content})}
                    </Grid>
                ))}
            </Grid>

        </div>
    );
};

export default TravelGuide;