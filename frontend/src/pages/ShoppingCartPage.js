import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';
import { useParams, useNavigate } from 'react-router-dom';


const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingQuantity, setUpdatingQuantity] = useState({});
  const [removingItem, setRemovingItem] = useState({});
  
  const { orderId } = useParams(); // Get the orderId from the URL
  const navigate = useNavigate(); // For navigation after checkout
  
  useEffect(() => {
    fetchCartItems();
  }, [orderId]);
  
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      
      // Check if we're in guest mode
      if (orderId === 'guest') {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        setCartItems(guestCart);
      } else {
        // Use the API to get order items
        const data = await ApiService.getAllItemsInOrder(orderId);
        if (Array.isArray(data)) {
          setCartItems(data);
        } else {
          setCartItems([]);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items in order:', error);
      setError('Failed to load cart items. Please try again.');
      
      // Fall back to guest cart if API fails
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      setCartItems(guestCart);
      
      setLoading(false);
    }
  };
  
  // Handle updating quantity in cart
  const handleUpdateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantities
    
    const itemId = item.id || item.itemId;
    
    try {
      setUpdatingQuantity({ ...updatingQuantity, [itemId]: true });
      
      if (orderId === 'guest') {
        // Update guest cart in localStorage
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        const updatedCart = guestCart.map(cartItem => 
          cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
        );
        
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      } else {
        // Update through API
        // Since we don't have a direct API to update quantity, we'll handle by removing and adding
        const orderItemId = item.orderItemId || item.id;
        
        // Step 1: Remove the item from the order
        await ApiService.removeItemFromOrder(orderId, orderItemId);
        
        // Step 2: Add the item back with the new quantity
        await ApiService.addItemToOrder(orderId, itemId, newQuantity);
        
        // Refresh cart items
        await fetchCartItems();
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity. Please try again.');
    } finally {
      setUpdatingQuantity({ ...updatingQuantity, [itemId]: false });
    }
  };
  
  // Handle removing item from cart
  const handleRemoveItem = async (item) => {
    const itemId = item.id || item.itemId;
    
    try {
      setRemovingItem({ ...removingItem, [itemId]: true });
      
      if (orderId === 'guest') {
        // Remove from guest cart in localStorage
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        const updatedCart = guestCart.filter(cartItem => cartItem.id !== itemId);
        
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      } else {
        // Remove through API
        const orderItemId = item.orderItemId || item.id;
        await ApiService.removeItemFromOrder(orderId, orderItemId);
        
        // Refresh cart items
        await fetchCartItems();
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    } finally {
      setRemovingItem({ ...removingItem, [itemId]: false });
    }
  };
  
  // Calculate the total price of the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };
  
  const handleProceedToCheckout = () => {
    if (cartItems.length > 0) {
      // Pass the orderId to checkout page
      if (orderId === 'guest') {
        navigate('/checkout/guest');
      } else {
        navigate(`/checkout/${orderId}`);
      }
    } else {
      alert('Your cart is empty!');
    }
  };
  
  const handleContinueShopping = () => {
    navigate('/catalog');
  };
  
  return (
    <div className="shopping-cart-container">
      <h1>Your Shopping Cart</h1>
      
      {loading ? (
        <p>Loading your cart...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button 
            className="continue-shopping-button"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id || item.itemId} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name || item.model} 
                    style={{ width: '120px', height: '90px', objectFit: 'cover' }} 
                  />
                </div>
                
                <div className="item-details">
                  <h3>{item.name || item.model}</h3>
                  <p className="item-brand">{item.brand}</p>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="item-quantity">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                      disabled={item.quantity <= 1 || updatingQuantity[item.id || item.itemId]}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                      disabled={updatingQuantity[item.id || item.itemId]}
                    >
                      +
                    </button>
                  </div>
                  {updatingQuantity[item.id || item.itemId] && <p className="updating-text">Updating...</p>}
                </div>
                
                <div className="item-subtotal">
                  <p>Subtotal:</p>
                  <p className="subtotal-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <div className="item-actions">
                  <button 
                    className="remove-button"
                    onClick={() => handleRemoveItem(item)}
                    disabled={removingItem[item.id || item.itemId]}
                  >
                    {removingItem[item.id || item.itemId] ? 'Removing...' : '🗑️ Remove'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>${calculateTotalPrice()}</span>
            </div>
            <div className="summary-line">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-line total">
              <span>Total:</span>
              <span>${calculateTotalPrice()}</span>
            </div>
            
            <div className="cart-actions">
              <button 
                className="checkout-button"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
              <button 
                className="continue-shopping"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartPage;

