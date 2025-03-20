import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';  // Import the ApiService for API calls
import { useNavigate, useParams } from 'react-router-dom';  // Import for navigation and route params

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();  // Hook for navigation
  const { orderId } = useParams();  

  useEffect(() => {
    // Fetch the items in the order when the component mounts
    const fetchItemsInOrder = async () => {
      try {
        const data = await ApiService.getAllItemsInOrder(orderId);  // Fetch items by orderId
        setCartItems(data);  // Set cart items to state
      } catch (error) {
        console.error('Error fetching items in order:', error);
      }
    };

    if (orderId) {
      fetchItemsInOrder();  // Only fetch if orderId is available
    }
  }, [orderId]);  // Fetch again if orderId changes

  const handleProceedToCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');  // Navigate to checkout page
    } else {
      alert('Your cart is empty!');  // Display message if cart is empty
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px' }} />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))
      )}
      <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default ShoppingCartPage;
