import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';

const VehicleDetailsPage = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loanAmount, setLoanAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(5);  // Default interest rate
  const [loanTerm, setLoanTerm] = useState(60);  // Default loan term (months)
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []); // Get cart from localStorage or empty array
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await ApiService.getItemById(vehicleId);
        setVehicle(response.data);
        setLoanAmount(response.data.price); // Default loan amount is vehicle price
      } catch (err) {
        console.error('Error fetching vehicle details:', err);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await ApiService.getItemReviews(vehicleId);
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchVehicleDetails();
    fetchReviews();
  }, [vehicleId]);

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
      const reviewData = { review: newReview, rating: rating };
      await ApiService.submitReview(vehicleId, reviewData); // Submit the review
      setReviews([...reviews, reviewData]); // Optimistic update of reviews
      setNewReview(''); // Clear the input field
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = () => {
    const cartItem = {
      id: vehicle.id,
      name: vehicle.name,
      price: vehicle.price,
      quantity: 1,  // Default quantity
      imageUrl: vehicle.imageUrl,
    };

    const updatedCart = [...cart, cartItem];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));  // Save the cart to localStorage
    alert('Vehicle added to cart!');
  };

  // Show loading message if vehicle is not yet loaded
  if (!vehicle) return <p>Loading...</p>;

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
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review this vehicle!</p>
        ) : (
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

      {/* Add to Cart Button */}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default VehicleDetailsPage;

