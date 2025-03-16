import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';
 
const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the wishlist from the server
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getWishlist(); // Assuming this fetches the user's wishlist
        setWishlist(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        setError('Failed to load wishlist.');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Remove vehicle from wishlist
  const handleRemoveFromWishlist = async (vehicleId) => {
    try {
      await ApiService.removeFromWishlist(vehicleId); // API call to remove the vehicle
      setWishlist(wishlist.filter(vehicle => vehicle.id !== vehicleId)); // Optimistically update the UI
    } catch (err) {
      console.error('Error removing vehicle from wishlist:', err);
      setError('Failed to remove vehicle from wishlist.');
    }
  };

  return (
    <div>
      <h1>Your Wishlist</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="vehicle-grid">
          {wishlist.map(vehicle => (
            <div key={vehicle.id} className="vehicle-card">
              <img src={vehicle.imageUrl} alt={vehicle.model} />
              <h3>{vehicle.model}</h3>
              <p>${vehicle.price}</p>
              <button onClick={() => handleRemoveFromWishlist(vehicle.id)}>Remove from Wishlist</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
