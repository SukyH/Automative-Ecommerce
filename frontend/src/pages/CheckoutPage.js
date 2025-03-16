// CheckoutPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For checking if user is logged in
  const [creditCard, setCreditCard] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  const handleCheckout = () => {
    // Mimicking payment service
    if (Math.random() > 0.67) {
      setErrorMessage('Credit Card Authorization Failed');
    } else {
      setErrorMessage('Order Successfully Completed');
      history.push('/order-success'); // Redirect to order success page
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {isLoggedIn ? (
        <div>
          <h2>Billing and Shipping Info</h2>
          {/* Form for shipping info */}
          <input
            type="text"
            placeholder="Credit Card Number"
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
          />
          <button onClick={handleCheckout}>Confirm Order</button>
        </div>
      ) : (
        <div>
          <p>You need to log in or create an account to proceed</p>
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CheckoutPage;
