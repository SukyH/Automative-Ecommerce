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

  useEffect(() => {
    // Fetch vehicle details and reviews
    const fetchVehicleDetails = async () => {
      try {
        const vehicleData = await ApiService.getItemById(vehicleId);
        setVehicle(vehicleData);
        setLoanAmount(vehicleData.price); // Default loan amount is vehicle price
      } 		catch (err) {
		  console.error('Error fetching vehicle details:', err.response || err);
		  setError('Failed to load vehicle details.');
		}

    };

    const fetchReviews = async () => {
      try {
        const response = await ApiService.getItemReviews(vehicleId);
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews.');
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
      const reviewData = { review: newReview };
      await ApiService.submitReview(vehicleId, reviewData); // Submit the review
      setReviews([...reviews, reviewData]); // Optimistic update of reviews
      setNewReview(''); // Clear the input field
    } catch (err) {
      console.error('Error submitting review:', err);
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

