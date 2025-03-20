import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';
import { useParams, useNavigate } from 'react-router-dom';

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { orderId } = useParams(); // Get the orderId from the URL
  const navigate = useNavigate(); // For navigation after checkout

  useEffect(() => {
    const fetchItemsInOrder = async () => {
      try {
        const data = await ApiService.getAllItemsInOrder(orderId);
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching items in order:', error);
      }
    };

    if (orderId) {
      fetchItemsInOrder();
    }
  }, [orderId]);

  // Handle updating quantity in cart
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantities
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);


  };

  // Calculate the total price of the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    
    navigate('/checkout'); // Example redirect to checkout page
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} style={{ marginBottom: '20px' }}>
            <div>
              <p><strong>{item.name}</strong></p>
              <p>${item.price}</p>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                  style={{ width: '50px' }}
                />
              </div>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <div>
          <h3>Total: ${calculateTotalPrice()}</h3>
          <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;
