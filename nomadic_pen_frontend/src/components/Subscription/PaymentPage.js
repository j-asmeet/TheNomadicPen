// Author: Pakshal Shah
import React, { useState } from 'react';
import '../../styles/PaymentPage.css';

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCardNumberChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, '');
    setCardNumber(numericValue);
    setErrorMessage('');
  };

  const handleExpiryDateChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, '');
    setExpiryDate(numericValue);
    setErrorMessage('');
  };

  const handleCVVChange = (event) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, '');
    setCVV(numericValue);
    setErrorMessage('');
  };

  const handleNameOnCardChange = (event) => {
    const { value } = event.target;
    const alphanumericValue = value.replace(/[^a-zA-Z0-9 ]/g, '');
    setNameOnCard(alphanumericValue);
    setErrorMessage('');
  };

  const handlePayment = () => {
    if (cardNumber === '' || expiryDate === '' || cvv === '' || nameOnCard === '') {
      setErrorMessage('Please fill in all the required fields.');
    } else {
      // Perform payment logic here
      // Redirect to the Stripe payment link
      window.location.href = 'https://buy.stripe.com/test_aEUdRl5xO5gd8so144';
    }
  };

  return (
    <div className="PaymentPage">
      <div className="enter-details">
        <h2>Enter Details Here</h2>
      </div>
      <form className="payment-form">
        <label>
          Card Number:
          <input
            type="text"
            placeholder="Enter card number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
          />
        </label>
        <label>
          Expiry Date:
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            required
          />
        </label>
        <label>
          CVV:
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={handleCVVChange}
            required
          />
        </label>
        <label>
          Name on Card:
          <input
            type="text"
            placeholder="Enter name on card"
            value={nameOnCard}
            onChange={handleNameOnCardChange}
            required
          />
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="button" onClick={handlePayment}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
