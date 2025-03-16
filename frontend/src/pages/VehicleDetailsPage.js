import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../service/ApiService';


const VehicleDetailsPage = () => {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loanAmount, setLoanAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(5);  // Default interest rate
  const [loanTerm, setLoanTerm] = useState(60);  // Default loan term (months)
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await ApiService.getVehicle(vehicleId);
        setVehicle(response.data);
        setLoanAmount(response.data.price); // Default loan amount is the vehicle price
      } catch (err) {
        console.error('Error fetching vehicle details:', err);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await ApiService.getVehicleReviews(vehicleId);
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
      const reviewData = { review: newReview };
      await ApiService.submitReview(vehicleId, reviewData);
      setReviews([...reviews, reviewData]); // Optimistically update the reviews list
      setNewReview(''); // Clear the review input
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  if (!vehicle) return <p>Loading...</p>;

  return (
    <div>
      <h1>{vehicle.model}</h1>
      <img src={vehicle.imageUrl} alt={vehicle.model} />
      <p>{vehicle.description}</p>
      <p>${vehicle.price}</p>

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
        <p>Monthly Payment: ${monthlyPayment.toFixed(2)}</p>
      </div>

      {/* Reviews Section */}
      <div>
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review this vehicle!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index}>
              <p>{review.review}</p>
            </div>
          ))
        )}

        {/* Submit New Review */}
        <form onSubmit={handleReviewSubmit}>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write a review..."
          ></textarea>
          <br />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;

