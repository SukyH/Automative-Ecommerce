import React, { useState, useEffect } from 'react';
import Item from './Item';
import Pagination from './Pagination';
import { apiService } from '../services/apiService';

const ItemList = ({ vehicles = [], totalPages = 1, currentPage = 1, onPageChange, loading = false, addToCart, addToWishlist }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await apiService.getWishlist();
          setWishlistItems(response.data.map(item => item.vehicleId));
        } catch (error) {
          console.error('Error fetching wishlist:', error);
          setWishlistItems([]);
        }
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div>
        <div></div> /* Add any spinner component or something */
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div>
        <h3>No vehicles found</h3>
        <p>Try adjusting your search or filter options</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        {vehicles.map(vehicle => (
          <Item 
            key={vehicle.id} 
            vehicle={vehicle} 
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            isInWishlist={wishlistItems.includes(vehicle.id)}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ItemList;
