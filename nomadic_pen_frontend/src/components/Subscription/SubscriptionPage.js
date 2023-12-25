// Author: Pakshal Shah
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/SubscriptionPage.css';

const SubscriptionPage = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://nomadic-pen.onrender.com/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubscribed(true);
        navigate('/manage-subscription', { state: { userEmail: email } }); // Pass the user email as state
      } else {
        console.log('Failed to subscribe');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="subscription-page">
      {!isSubscribed ? (
        <form className="subscription-form" onSubmit={handleSubmit}>
          <h1>Subscribe to The Nomadic Pen!</h1>
          <h2 className="subheading">Ready to Turn Your Travels into Tales?</h2>
          <p className="description">
            Embark on a journey that allows you to uncover the secrets of bustling city markets, 
            the tranquility of remote mountain villages, the mouth-watering delicacies of street foods worldwide, 
            and the thrill of adventures off the beaten path.
            But we offer more than just stories. At Nomadic Pen, we are a community. A community of avid travelers, 
            curious explorers, and passionate writers. We share our travel tips, advice, and experiences, so you too can explore 
            the world, one story at a time.
          </p>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} required />
          </label>
          <button type="submit">Explore Plans</button>
          <h3 className="features">Benefits of Subscription:</h3>
          <ul className="features-list">
  <li>
    <strong>Worldwide Wandering:</strong> 
    <span>Discover hidden places around the globe and get lost in our vibrant storytelling.</span>
  </li>
  <li>
    <strong>Smart Travels:</strong> 
    <span>Access tips and tricks to make your journey budget-friendly, yet unforgettable.</span>
  </li>
  <li>
    <strong>Culinary Journey:</strong> 
    <span>Join us as we explore and savor unique cuisines and local delicacies around the world.</span>
  </li>
  <li>
    <strong>Off-the-Beaten-Path:</strong> 
    <span>Dare to explore beyond the tourist crowds and dive into truly unique experiences.</span>
  </li>
  <li>
    <strong>Exclusive Perks:</strong> 
    <span>Enjoy exclusive offers, discounts, and partner promotions, making your travel experiences even more rewarding.</span>
  </li>
</ul>
        </form>
      ) : (
        <div className="subscription-success">
          <h2>Thank you for subscribing!</h2>
          <p>You will now be part of our global narrative. Get ready to discover the world, one story at a time with The Nomadic Pen.</p>
        </div>
      )}
      <footer className="footer">Copyright © 2023 The Nomadic Pen. All rights reserved.</footer>
    </div>
  );
};

export default SubscriptionPage;