// CheckoutPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [paymentAttempts, setPaymentAttempts] = useState(0);
    const history = useNavigate();
    const [creditCard, setCreditCard] = useState('');
  
    const handleCheckout = () => {
      // Mimicking payment service
      if (paymentAttempts % 3 === 2) {
        // Every 3rd request fails
        setErrorMessage('Credit Card Authorization Failed');
      } else {
        setErrorMessage('Order Successfully Completed');
        history.push('/order-success'); // Redirect to order success page
      }
  
      // Increment the payment attempts
      setPaymentAttempts(paymentAttempts + 1);
    };

  
  return (
    <div>
      <h1>Checkout</h1>
     (
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
      )
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CheckoutPage;
