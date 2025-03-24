import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the wishlist from the server
  useEffect(() => {
    const fetchWishlist = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User is not logged in.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const wishlistResponse = await ApiService.getWishlist(userId); // returns array of { productId }

        // Fetch full item details for each productId
        const enrichedWishlist = await Promise.all(
          wishlistResponse.map(async (entry) => {
            const item = await ApiService.getItemById(entry.productId);
            return {
              wishlistId: entry.wishlistId,
			  productId: entry.productId,
			       ...item      
            };
          })
        );

        setWishlist(enrichedWishlist);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        setError('Failed to load wishlist.');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      await ApiService.removeFromWishlist(wishlistId);
      setWishlist(wishlist.filter(item => item.wishlistId !== wishlistId));
    } catch (err) {
      console.error("Error removing vehicle from wishlist:", err);
      setError("Failed to remove vehicle from wishlist.");
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
		    <p>{vehicle.brand}</p>
		    <p>${vehicle.price}</p>
		    <button onClick={() => handleRemoveFromWishlist(vehicle.wishlistId)}>
		      Remove from Wishlist
		    </button>
		  </div>
		))}


        </div>
      )}
    </div>
  );
};

export default WishlistPage;
