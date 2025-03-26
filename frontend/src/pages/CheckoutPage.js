import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';

const CheckoutPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentAttempts, setPaymentAttempts] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [savedAddress, setSavedAddress] = useState(null);
  const [formData, setFormData] = useState({
    address: {
      street: '',
      city: '',
      province: '',
      postalCode: '',
      country: '',
    },
    creditCard: '',
  });
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await ApiService.getAllItemsInOrder(orderId);
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchUserAddress = async () => {
      try {
        const user = await ApiService.getLoggedInUserInfo();
        if (user && user.address) {
          setSavedAddress(user.address);
          setFormData(prevData => ({
            ...prevData,
            address: user.address,
          }));
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchCartItems();
    fetchUserAddress();
  }, [orderId]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty. Please add items to your cart.');
      return;
    }

    if (paymentAttempts % 3 === 2) {
      setErrorMessage('Credit Card Authorization Failed');
    } else {
      try {
        setLoading(true);
        await ApiService.updateOrderStatus(orderId, 'ORDERED');
        setErrorMessage('Order Successfully Completed');
      } catch (error) {
        console.error("Failed to update order status:", error);
        setErrorMessage('Order failed to process. Please try again.');
      }
    }

    setPaymentAttempts(paymentAttempts + 1);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. Please add items to your cart.</p>
        ) : (
          <>
            <h2>Billing and Shipping Info</h2>
            <form>
              <h3>Address</h3>
              {savedAddress ? (
                <div>
                  <p><strong>Saved Address:</strong></p>
                  <p>{`${savedAddress.street}, ${savedAddress.city}, ${savedAddress.province}, ${savedAddress.postalCode}, ${savedAddress.country}`}</p>
                  <p>
                    If you need to change your address, please update it in your{' '}
                    <a href="/profile">profile page</a>.
                  </p>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    name="street"
                    value={formData.address.street}
                    onChange={handleChange}
                    placeholder="Street"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.address.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                  <input
                    type="text"
                    name="province"
                    value={formData.address.province}
                    onChange={handleChange}
                    placeholder="Province/State"
                    required
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.address.postalCode}
                    onChange={handleChange}
                    placeholder="Postal Code"
                    required
                  />
                  <input
                    type="text"
                    name="country"
                    value={formData.address.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                  />
                </div>
              )}

              <h3>Credit Card Information</h3>
              <input
                type="text"
                name="creditCard"
                value={formData.creditCard}
                onChange={(e) => setFormData({ ...formData, creditCard: e.target.value })}
                placeholder="Credit Card Number"
                required
              />
              <button type="button" onClick={handleCheckout} disabled={loading}>
                {loading ? 'Processing...' : 'Confirm Order'}
              </button>
            </form>
          </>
        )}
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CheckoutPage;
