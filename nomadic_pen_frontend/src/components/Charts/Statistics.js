import React, {useState, useEffect} from 'react';
import Barcharts from './BarCharts';
import PieCharts from './PieCharts';
import TrendingBloggers from './TrendingBloggers';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import axios from "axios";
import '../../styles/Statistics.css';

const Statistics = () => {
  const [userStatistics, setUserStatistics] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsThisMonth, setPostsThisMonth] = useState(0);
  const [activeUsersThisMonth, setActiveUsersThisMonth] = useState(0);
  const [likesStatistics, setLikesStatistics] = useState([]);

  useEffect(() => {
    axios.get('https://nomadic-pen.onrender.com/stats/')
      .then((response) => {
        console.log('response:', response);

        const {
          registeredUsers,
          totalPosts,
          postsThisMonth,
          activeUsersThisMonth,
          userStatistics,
          likesStatistics,
        } = response.data;

        setRegisteredUsers(registeredUsers);
        setTotalPosts(totalPosts);
        setPostsThisMonth(postsThisMonth);
        setActiveUsersThisMonth(activeUsersThisMonth);
        setUserStatistics(userStatistics);
        setLikesStatistics(likesStatistics);
      })
      .catch((error) => {
        console.error('Error fetching profile picture:', error);
      });
  }, []);

  const userBarGraphs = {
    labels:  userStatistics.map(item => item._id.month),
    datasets: [
      {
        label: "Customers added in past 3 months",
        backgroundColor: ["#f3ba2f",
        "#2a71d0",
          "#50AF95"
        ],
        borderColor: "black",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data:userStatistics.map(item => item.enrolled_users),
      },
    ],
  };


  return (
    
    <div>
      <Grid container spacing={2} margin={2.5}>
        <Grid item xs={2.5} margin={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Total Users
              </Typography>
              <Typography variant="h4">{registeredUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2.5} margin={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Posts This Month
              </Typography>
              <Typography variant="h4">{totalPosts}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2.5} margin={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Total Blogs
              </Typography>
              <Typography variant="h4">{postsThisMonth}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2.5} margin={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2">
                Active Users
              </Typography>
              <Typography variant="h4">{activeUsersThisMonth}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box p={2}>
        <Grid container spacing={4} columnSpacing={10}>
        <Grid item xs={0.8} ></Grid>
          <Grid item xs={5}  columnSpacing={10}>
            <Card>
              <CardContent>
                <div style={{ backgroundColor: 'white'}} >
                  <Barcharts UserBarGraphs={userBarGraphs} chartId="user-bar-chart" />
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5}>
          <Card >
          <CardContent>
            <div style={{ backgroundColor: 'white'  }}>
              <PieCharts pieChartData={userBarGraphs} chartId="pie-chart" />
            </div>
          </CardContent>
        </Card>
          </Grid>
        </Grid>
      </Box>

      <div style={{ margin: '20px'  }}>
        <p style={{ color: 'white'  }}>Trending Bloggers:</p>
        <TrendingBloggers data ={likesStatistics}/>
      </div>
  
    </div>
  );
};

export default Statistics;