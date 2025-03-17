import React, { useState } from 'react';

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleProceedToCheckout = () => {
    // Redirect to checkout
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        ))
      )}
      <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default ShoppingCartPage;
