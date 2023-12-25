// Author: Pakshal Shah
import React, { useState } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import '../styles/FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I create a travel blog on The Nomadic Pen?',
      answer: 'To create a travel blog on The Nomadic Pen, simply sign up for an account and navigate to your profile page. Click on the "Create Blog" button and fill in the required information, such as the blog title, description, and preferred categories. You can then start writing and publishing your travel blog posts for others to discover and enjoy.',
    },
    {
      question: 'Can I follow multiple travel bloggers?',
      answer: 'Yes, you can follow multiple travel bloggers on The Nomadic Pen. Once you find a blogger whose content you enjoy, visit their profile page and click on the "Follow" button. By following them, you will receive notifications whenever they publish new blog posts, allowing you to stay updated with their latest travel adventures.',
    },
    {
      question: 'How can I contact a travel blogger on The Nomadic Pen?',
      answer: 'If you wish to contact a travel blogger on The Nomadic Pen, you can send them a direct message through the platform. Visit their profile page and look for the "Message" or "Send DM" option. Click on it, compose your message, and hit send. The blogger will receive your message and can respond to you directly.',
    },
    {
      question: 'Are the travel bloggers on The Nomadic Pen verified?',
      answer: 'While The Nomadic Pen does not currently have a verification system for travel bloggers, we encourage bloggers to provide authentic information on their profiles and showcase their travel experiences through their blog posts. Users can assess the credibility of bloggers based on their content, engagement, and interactions with the community.',
    },
    {
      question: 'How do I discover new travel destinations on The Nomadic Pen?',
      answer: 'The Nomadic Pen offers various ways to discover new travel destinations. You can explore the "Discover" section of the website, where popular and trending blog posts from different locations are featured. Additionally, you can search for specific destinations using the search bar or browse through bloggers who specialize in a particular region or country.',
    },
    {
      question: 'Can I collaborate with travel bloggers on The Nomadic Pen?',
      answer: 'Yes, collaboration opportunities with travel bloggers on The Nomadic Pen are possible. Many bloggers are open to partnerships, sponsorships, and collaborations with travel-related brands, tourism boards, or fellow travelers. You can reach out to bloggers individually through their profiles to discuss potential collaborations and partnerships.',
    },

    {
      question: 'How can I share my travel experiences on The Nomadic Pen?',
      answer: 'Sharing your travel experiences on The Nomadic Pen is easy. Create an account, set up your travel blog, and start writing engaging blog posts about your adventures. Include captivating photos, insider tips, and personal anecdotes to make your posts more compelling. By sharing your stories, you can inspire and connect with fellow travel enthusiasts on the platform.',
    },
    {
      question: 'What user data do we collect?',
      answer: 'The basic profile information such as Name, Profile Picture, Email, Location, Date of Birth and Contact information are captured. However, these information are only for site\'s use and are not shared with any third party vendors.',
    },
    {
      question: 'About Third-party Integrations',
      answer: 'This website integrates with third-party services like Facebook and Twitter. The user\'s interactions with those services are subject to their respective privacy policies and terms.',
    },
    {
      question: 'The Liability Limitations',
      answer: 'While the application takes reasonable measures to protect user data, the users are responsible for their own interactions, sharing, and content. The application is not liable for user actions beyond its control.',
    },
    {
      question: 'What security measures have we taken?',
      answer: 'The user password and data over the network are transmitted using secured channels. Moreover, the users will be notified via email for their password interactions such as registration and reset.',
    },
    {
      question: 'How can you connect with us?',
      answer: 'We have a dedicated support channel for all types of queries that the user might be having. You can connect with us using the Contact Us menu option.',
    },
  ];

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
      <Box
          sx={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/background_image/boat_bg.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
      >
        <Paper elevation={3} className="faq-container">
          <Typography variant="h4" className="faq-heading" gutterBottom>
            FAQs
          </Typography>
          {faqs.map((faq, index) => (
              <div
                  key={index}
                  className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => handleClick(index)}
              >
                <div className="faq-question">
                  {faq.question}
                  <span className="faq-toggle">
                {activeIndex === index ? '-' : '+'}
              </span>
                </div>
                {activeIndex === index && (
                    <Typography variant="body1" className="faq-answer">
                      {faq.answer}
                    </Typography>
                )}
              </div>
          ))}
        </Paper>
      </Box>
  );
};

export default FAQ;