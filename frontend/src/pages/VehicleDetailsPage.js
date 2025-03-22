import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../service/ApiService';

const VehicleDetailsPage = () => {
  const { id: vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loanAmount, setLoanAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(5);  // Default interest rate
  const [loanTerm, setLoanTerm] = useState(60);  // Default loan term (months)
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5)
  const [error, setError] = useState(null);
  const [ipAddress, setIpAddress] = useState('');
  const [isInCart, setIsInCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);

  // Get IP address when component loads
  useEffect(() => {
    const getIp = async () => {
      try {
        const response = await ApiService.getIpAddress();
        setIpAddress(response.ip);
      } catch (error) {
        console.error('Error getting IP:', error);
      }
    };
    getIp();
  }, []);
  
  // Track view when product loads and IP is available
  useEffect(() => {
    if (ipAddress && vehicleId) {
      ApiService.trackVisit(ipAddress, vehicleId, 'VIEW');
    }
  }, [ipAddress, vehicleId]);


  useEffect(() => {
     
    // Fetch vehicle details and reviews
    const fetchVehicleDetails = async () => {
      try {
        const vehicleData = await ApiService.getItemById(vehicleId);
        setVehicle(vehicleData);
        setLoanAmount(vehicleData.price); // Default loan amount is vehicle price
      } catch (err) {
        console.error('Error fetching vehicle details:', err.response || err);
        setError('Failed to load vehicle details.');
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await ApiService.getItemReviews(vehicleId);
        setReviews(response);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews.');
      }
    };

    fetchVehicleDetails();
    fetchReviews();
    fetchCartItems();
  }, [vehicleId]);

  // Fetch cart items to check if vehicle is already in cart
  const fetchCartItems = async () => {
    const userId = localStorage.getItem('userId');
    const activeOrderId = localStorage.getItem('activeOrderId');

    if (activeOrderId) {
      try {
        const items = await ApiService.getAllItemsInOrder(activeOrderId);
        setCartItems(items);
        
        // Check if this vehicle is in the cart
        const inCart = items.some(item => 
          (item.id === vehicleId) || 
          (item.itemId === vehicleId) || 
          (item.vid === vehicleId)
        );
        setIsInCart(inCart);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        // For guest users, fall back to localStorage
        if (!userId) {
          const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
          setCartItems(guestCart);
          
          // Check if this vehicle is in the guest cart
          const inCart = guestCart.some(item => item.id === vehicleId);
          setIsInCart(inCart);
        }
      }
    } else if (!userId) {
      // For guest users without an order, use localStorage
      const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      setCartItems(guestCart);
      
      // Check if this vehicle is in the guest cart
      const inCart = guestCart.some(item => item.id === vehicleId);
      setIsInCart(inCart);
    }
  };
  // Loan Calculator Logic
  const calculateLoan = () => {
    const principal = loanAmount - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numPayments = loanTerm;

    if (monthlyInterestRate === 0) {
      setMonthlyPayment(principal / numPayments);
    } else {
      const payment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numPayments));
      setMonthlyPayment(payment);
    }
  };

  
  // Handle new review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        rating: rating,
        comment: newReview
      };

      await ApiService.submitReview(vehicleId, reviewData); 
      const response = await ApiService.getItemReviews(vehicleId); // Refresh reviews
      setReviews(response);
      setNewReview('');
      setRating(5);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review');
    }
  };
// Add to Cart functionality
const handleAddToCart = async () => {
  try {
    setAddingToCart(true);
    
    // Get user ID if logged in
    const userId = localStorage.getItem('userId');
    
    // Get active order ID from localStorage if exists
    let activeOrderId = localStorage.getItem('activeOrderId');
    let response;
    
    if (activeOrderId) {
      // Add to existing order
      response = await ApiService.addItemToOrder(
        activeOrderId, 
        vehicleId, 
        1 // Quantity
      );
    } else {
      // Create new order
      const orderData = {
        itemId: vehicleId,
        quantity: 1
      };
      
      response = await ApiService.createOrder(userId, orderData);
      
      // Save the new order ID
      if (response && response.id) {
        localStorage.setItem('activeOrderId', response.id);
        activeOrderId = response.id;
      }
    }
    
    // Handle guest cart in localStorage
    if (!userId) {
      const existingCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      
      const newItem = {
        id: vehicleId,
        itemId: vehicleId,
        model: vehicle.model,
        name: vehicle.name || vehicle.model,
        brand: vehicle.brand,
        price: vehicle.price,
        imageUrl: vehicle.imageUrl,
        quantity: 1
      };
      
      // Check if item already exists in cart
      const existingItemIndex = existingCart.findIndex(item => item.id === vehicleId);
      
      if (existingItemIndex >= 0) {
        // Update quantity if already in cart
        existingCart[existingItemIndex].quantity += 1;
      } else {
        // Add new item
        existingCart.push(newItem);
      }
      
      localStorage.setItem('guestCart', JSON.stringify(existingCart));
    }
    
    // Track the cart event
    if (ipAddress && vehicleId) {
      ApiService.trackVisit(ipAddress, vehicleId, 'CART');
    }
    
    // Show success message
    alert("Vehicle added to cart successfully!");
    setIsInCart(true);
    await fetchCartItems();
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Failed to add vehicle to cart. Please try again.");
  } finally {
    setAddingToCart(false);
  }
};

// Remove from Cart functionality
const handleRemoveFromCart = async () => {
  try {
    setAddingToCart(true);
    
    const userId = localStorage.getItem('userId');
    const activeOrderId = localStorage.getItem('activeOrderId');
    
    if (activeOrderId) {
      // Find the orderItemId from the cart items
      const itemInCart = cartItems.find(item => 
        item.id === vehicleId || item.itemId === vehicleId || item.vid === vehicleId
      );
      
      if (itemInCart) {
        // Use the order item ID for removal
        const orderItemId = itemInCart.orderItemId || itemInCart.id;
        await ApiService.removeItemFromOrder(activeOrderId, orderItemId);
      }
    }
    
    // Update guest cart in localStorage if needed
    if (!userId) {
      let guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      guestCart = guestCart.filter(item => item.id !== vehicleId);
      localStorage.setItem('guestCart', JSON.stringify(guestCart));
    }
    
    // Show success message
    alert("Vehicle removed from cart successfully!");
    setIsInCart(false);
    await fetchCartItems();
  } catch (error) {
    console.error("Error removing from cart:", error);
    alert("Failed to remove vehicle from cart. Please try again.");
  } finally {
    setAddingToCart(false);
  }
};


  // Show error message if API failed
  if (error) {
    return <div>{error}</div>;
  }

  if (!vehicle) return <p>Loading...</p>; // Show loading if vehicle data is not yet loaded

  return (
    <div>
      <h1>{vehicle.name} ({vehicle.modelYear})</h1>
      <img src={vehicle.imageUrl} alt={vehicle.model} />
      <p><strong>Brand:</strong> {vehicle.brand}</p>
      <p><strong>Description:</strong> {vehicle.description}</p>
      <p><strong>Mileage:</strong> {vehicle.mileage} miles</p>
      <p><strong>Shape:</strong> {vehicle.shape}</p>
      <p><strong>Vehicle History:</strong> {vehicle.vehicleHistory}</p>
      <p><strong>Price:</strong> ${vehicle.price.toLocaleString()}</p> {/* Price formatted as currency */}
       

       {/* Cart Action Buttons */}
      <div className="cart-actions">
        {isInCart ? (
          <button
            className="remove-from-cart-button"
            onClick={handleRemoveFromCart}
            disabled={addingToCart}
            style={{ backgroundColor: '#e74c3c', color: 'white', padding: '10px 15px', margin: '10px 0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {addingToCart ? "Removing..." : "Remove from Cart"}
          </button>
        ) : (
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={addingToCart}
            style={{ backgroundColor: '#2ecc71', color: 'white', padding: '10px 15px', margin: '10px 0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {addingToCart ? "Adding..." : "Add to Cart"}
          </button>
        )}
      </div>

      {/* Loan Calculator Section */}
      <div>
        <h3>Loan Calculator</h3>
        <label>Loan Amount: ${loanAmount}</label>
        <br />
        <label>Down Payment: </label>
        <input
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
        />
        <br />
        <label>Interest Rate (%): </label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
        />
        <br />
        <label>Loan Term (Months): </label>
        <input
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(Number(e.target.value))}
        />
        <br />
        <button onClick={calculateLoan}>Calculate</button>
        <p><strong>Monthly Payment:</strong> ${monthlyPayment.toFixed(2)}</p>
      </div>

      {/* Reviews Section */}
      <div>
        <h3>Reviews</h3>
        {Array.isArray(reviews) && reviews.length === 0 ? (
          <p>No reviews yet...</p>
        ) : (
          Array.isArray(reviews) &&
          reviews.map((review, index) => (
            <div key={index}>
              <p><strong>Rating:</strong> {"⭐".repeat(review.rating)}</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}

        <form onSubmit={handleReviewSubmit}>
          <h4>Leave a Review</h4>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
          ></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};
export default VehicleDetailsPage;
