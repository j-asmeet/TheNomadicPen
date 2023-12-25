import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import slide1 from '../Images/slide1.jpg';
import slide2 from '../Images/slide2.jpg';
import slide3 from '../Images/slide3.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    overflow: 'hidden',
  },
  slidesContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.5s ease',
  },
  activeSlide: {
    opacity: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    position: 'absolute',
    bottom: '10%',
    width: '80%',
    textAlign: 'center',
    padding: theme.spacing(2),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    borderRadius: theme.spacing(1),
  },
  loginButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex:1
  },
}));

const slides = [
  {
    image: slide1,
    text: 'Unleash your wanderlust with a captivating travel blog platform that connects avid travelers, inspiring bloggers, and a global community of explorers.',
  },
  {
    image: slide2,
    text: 'Empower your travel storytelling with a dynamic platform that enables users to create, manage, and share captivating blogs.',
  },
  {
    image: slide3,
    text: 'Personalize your travel experiences with a tailored travel guide, providing users with valuable insights and recommendations for unforgettable journeys.',
  },
];

const App = () => {
  const classes = useStyles();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.slider}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${classes.slide} ${
              index === activeSlide ? classes.activeSlide : ''
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className={classes.image}
            />
            <div className={classes.content}>
              <Typography style={{fontSize:20}} variant="h5" color="inherit">
                {slide.text}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
