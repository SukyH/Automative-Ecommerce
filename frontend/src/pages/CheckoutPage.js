// CheckoutPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';

const CheckoutPage = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [paymentAttempts, setPaymentAttempts] = useState(0);
    const history = useNavigate();
    const [creditCard, setCreditCard] = useState('');
	const { orderId } = useParams();

	
  
	const handleCheckout = async () => {
	  if (paymentAttempts % 3 === 2) {
	    setErrorMessage('Credit Card Authorization Failed');
	  } else {
	    try {
	      await ApiService.updateOrderStatus(orderId, "ORDERED");
	      setErrorMessage('Order Successfully Completed');
	    } catch (error) {
	      console.error("Failed to update order status:", error);
	      setErrorMessage('Order failed to process. Please try again.');
	    }
	  }

	  setPaymentAttempts(paymentAttempts + 1);
	};

  
	return (
	  <div>
	    <h1>Checkout</h1>
	    <div>
	      <h2>Billing and Shipping Info</h2>
	      <input
	        type="text"
	        placeholder="Credit Card Number"
	        value={creditCard}
	        onChange={(e) => setCreditCard(e.target.value)}
	      />
	      <button onClick={handleCheckout}>Confirm Order</button>
	    </div>
	    {errorMessage && <p>{errorMessage}</p>}
	  </div>
	);
};

export default CheckoutPage;
