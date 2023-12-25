// Author: Pakshal Shah
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/ManageSubscriptionPage.css';

const ManageSubscriptionPage = () => {
  const [isSubscribed, setSubscribed] = useState(false);
  const [preferences, setPreferences] = useState([]);
  const location = useLocation();
  const userEmail = location.state?.userEmail || '';
  const [isMonthly, setMonthly] = useState(true);

  const handlePreferenceChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setPreferences((prevPreferences) => [...prevPreferences, name]);
    } else {
      setPreferences((prevPreferences) =>
        prevPreferences.filter((preference) => preference !== name)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Updated preferences:', preferences);
  };

  const handlePayNow = (plan) => {
    let paymentLink = '';
    setSubscribed(true);
    alert("Subscription Successful. Please Pay for your subscription.");

    // Payment Links for Monthly Plans
    const monthlyLinks = {
      basic: 'https://buy.stripe.com/test_eVa00vd0geQNdMI4gh',
      standard: 'https://buy.stripe.com/test_14k5kP6BS4c9240eUY',
      premium: 'https://buy.stripe.com/test_9AQ5kP8K08spbEA8wz'
    };

    // Payment Links for Annual Plans
    const annualLinks = {
      basic: 'https://buy.stripe.com/test_28o7sXe4k9wt4c87sy',
      standard: 'https://buy.stripe.com/test_5kAcNh2lC6kh9ws28d',
      premium: 'https://buy.stripe.com/test_aEU14zbWc2415gc6ov'
    };

    if (isMonthly) {
      paymentLink = monthlyLinks[plan];
    } else {
      paymentLink = annualLinks[plan];
    }

    window.location.href = paymentLink;
  };

  const toggleSubscriptionPeriod = () => {
    setMonthly(!isMonthly);
  };

  const getPrice = (basePrice) => {
    return isMonthly ? basePrice : (basePrice * 12 * 0.8).toFixed(2);
  };

  return (
    <div className="manage-subscription-page">

      <form onSubmit={handleSubmit}>
        <div className="subscription-plans author-card">
          <div className='row'>
            <div className='col-md-12'>
              <h1>Hey, {userEmail}!</h1>
              <p className="description"><h2>Select your subscription preferences:</h2></p>
              <div className="toggle-subscription-period">
                <label>
                  Subscription Period:
                  <select
                    value={isMonthly ? 'monthly' : 'annual'}
                    onChange={e => setMonthly(e.target.value === 'monthly')}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className=''>
              <div className="plan">
                <div className="plan-header">
                  <h3>Basic Plan</h3>
                  <div className="price">CA${getPrice(9.99)}/{isMonthly ? "month" : "year"}</div>
                </div>
                <div className="plan-body">
                  <ul>
                    <li>Access to a variety of blogger profiles</li>
                    <li>Travel inspiration through captivating stories and itineraries</li>
                    <li>Community interaction with bloggers and fellow travelers</li>
                    <li>Regular email newsletters with travel tips and updates</li>
                    <li>Travel deals and Discounts </li>
                    <li>Travel Tips and advices for newbies</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <button onClick={() => handlePayNow('basic')}>Pay Now</button>
                </div>
              </div>
              <div className="plan">
                <div className="plan-header">
                  <h3>Standard Plan</h3>
                  <div className="price">CA${getPrice(19.99)}/{isMonthly ? "month" : "year"}</div>
                </div>
                <div className="plan-body">
                  <ul>
                    <li>All benefits of the Basic plan</li>
                    <li>Enhanced blogger content including in-depth guides and insider tips</li>
                    <li>Early access to new blog posts and travel recommendations</li>
                    <li>Exclusive events and meet-ups with bloggers</li>
                    <li>Priority support for inquiries and assistance</li>
                    <li>Meetup with the Bloggers to have a chat at annual feast</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <button onClick={() => handlePayNow('standard')}>Pay Now</button>
                </div>
              </div>
              <div className="plan">
                <div className="plan-header">
                  <h3>Premium Plan</h3>
                  <div className="price">CA${getPrice(29.99)}/{isMonthly ? "month" : "year"}</div>
                </div>
                <div className="plan-body">
                  <ul>
                    <li>All benefits of the Basic and Standard plans</li>
                    <li>Personalized travel recommendations based on preferences</li>
                    <li>Access to exclusive content such as private blog posts and videos</li>
                    <li>VIP experiences like guided tours and luxury accommodations</li>
                    <li>Premium support with dedicated account managers</li>
                  </ul>
                </div>
                <div className="plan-footer">
                  <button onClick={() => handlePayNow('premium')}>Pay Now</button>
                </div>
              </div>
            </div>
          </div>


        </div>
      </form>
      {/* <footer className="footer">Copyright © 2023 The Nomadic Pen. All rights reserved.</footer> */}
    </div>
  );
};

export default ManageSubscriptionPage;
