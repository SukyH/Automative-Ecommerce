import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';
import { useParams, useNavigate } from 'react-router-dom';

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingQuantity, setUpdatingQuantity] = useState({});
  const [removingItem, setRemovingItem] = useState({});
  const [orders, setOrders] = useState([]);

  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
	const loadOrdersAndCart = async () => {
	  const userId = localStorage.getItem("userId");
	  const allOrders = await ApiService.getAllOrders(userId);
	  setOrders(allOrders);

	  const allItems = [];

	  for (const order of allOrders) {
	    try {
	      const items = await ApiService.getDetailedItemsInOrder(order.orderID);
	      allItems.push(...items);
	    } catch (err) {
	      console.error(`Failed to fetch items for order ${order.orderID}:`, err);
	    }
	  }

	  setCartItems(allItems);
	  setLoading(false);
	};


    loadOrdersAndCart();
  }, [orderId]);


  const fetchAllOrders = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) return;

    try {
      const orderList = await ApiService.getAllOrders(userId);
      setOrders(orderList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchCartItems = async (targetOrderId) => {
    try {
      setLoading(true);
      console.log("📦 Fetching cart items for order:", targetOrderId);

      if (targetOrderId === 'guest') {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        setCartItems(guestCart);
      } else {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("🚫 No token found in localStorage!");
          throw new Error('Missing token');
        }

        // ✅ Use the new backend endpoint to get full item info with quantity
        const detailedItems = await ApiService.getDetailedItemsInOrder(targetOrderId);
        console.log("✅ Detailed items:", detailedItems);

        setCartItems(Array.isArray(detailedItems) ? detailedItems : []);
      }

      setError(null);
    } catch (error) {
      console.error('❌ Error fetching items in order:', error);
      setError('Failed to load cart items. Please try again.');
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (item, newQuantity) => {
    if (newQuantity < 1) return;
    const itemId = item.id || item.itemId || item.vid;
    const orderItemId = item.orderItemId;
const orderIdOfItem = item.orderID || orderId;

    try {
      setUpdatingQuantity({ ...updatingQuantity, [itemId]: true });

      if (orderId === 'guest') {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        const updatedCart = guestCart.map(cartItem =>
          cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
        );
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      } else {
        await ApiService.updateOrderItemQuantity(orderIdOfItem, orderItemId, newQuantity);

        // Refresh all items
        const userId = localStorage.getItem("userId");
        const allOrders = await ApiService.getAllOrders(userId);

        const allItems = [];
        for (const order of allOrders) {
          try {
            const items = await ApiService.getDetailedItemsInOrder(order.orderID);
            allItems.push(...items);
          } catch (err) {
            console.error(`Failed to fetch items for order ${order.orderID}:`, err);
          }
        }

        setCartItems(allItems);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity. Please try again.');
    } finally {
      setUpdatingQuantity({ ...updatingQuantity, [itemId]: false });
    }
  };


  const handleRemoveItem = async (item) => {
    const itemId = item.id || item.itemId || item.vid;
    const orderItemId = item.orderItemId || item.id;
    const orderIdOfItem = item.orderID || orderId;

    try {
      setRemovingItem({ ...removingItem, [itemId]: true });

      if (orderId === 'guest') {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        const updatedCart = guestCart.filter(cartItem => cartItem.id !== itemId);
        localStorage.setItem('guestCart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      } else {
        await ApiService.removeItemFromOrder(orderIdOfItem, orderItemId);

        // Refresh all items
        const userId = localStorage.getItem("userId");
        const allOrders = await ApiService.getAllOrders(userId);

        const allItems = [];
        for (const order of allOrders) {
          try {
            const items = await ApiService.getDetailedItemsInOrder(order.orderID);
            allItems.push(...items);
          } catch (err) {
            console.error(`Failed to fetch items for order ${order.orderID}:`, err);
          }
        }

        setCartItems(allItems);
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    } finally {
      setRemovingItem({ ...removingItem, [itemId]: false });
    }
  };


  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price || 0;
      const qty = item.quantity || 1;
      return total + price * qty;
    }, 0).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length > 0) {
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

      <div style={{ marginBottom: '2rem' }}>
        <h2>📦 Order History</h2>
        {orders.length === 0 ? (
          <p>No previous orders.</p>
        ) : (
          <ul>
            {orders.map(order => (
              <li key={order.orderID}>Order #{order.orderID} - {order.status}</li>
            ))}
          </ul>
        )}
      </div>

      {loading ? (
        <p>Loading your cart...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="continue-shopping-button" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.vid || item.id} className="cart-item">
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
                  <p className="item-price">${item.price?.toFixed(2)}</p>
                </div>

                <div className="item-quantity">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                      disabled={item.quantity <= 1 || updatingQuantity[item.id || item.vid]}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                      disabled={updatingQuantity[item.id || item.vid]}
                    >
                      +
                    </button>
                  </div>
                  {updatingQuantity[item.id || item.vid] && <p className="updating-text">Updating...</p>}
                </div>

                <div className="item-subtotal">
                  <p>Subtotal:</p>
                  <p className="subtotal-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <div className="item-actions">
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveItem(item)}
                    disabled={removingItem[item.id || item.vid]}
                  >
                    {removingItem[item.id || item.vid] ? 'Removing...' : '🗑️ Remove'}
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
              <button className="checkout-button" onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </button>
              <button className="continue-shopping" onClick={handleContinueShopping}>
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