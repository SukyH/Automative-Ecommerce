
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";


const CatalogPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("");
  const [shape, setShape] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [vehicleHistory, setVehicleHistory] = useState("");
  const [hotDeals, setHotDeals] = useState([]);
  const [addingToCart, setAddingToCart] = useState({});
  const navigate = useNavigate();
  const [ipAddress, setIpAddress] = useState('');
  const [cartItems, setCartItems] = useState([]);

  // Fetch vehicles and hot deals on load
  useEffect(() => {
    const fetchVehiclesAndDeals = async () => {
      try {
        setLoading(true);

        const vehicleResponse = await ApiService.getAllItems();
        if (vehicleResponse && Array.isArray(vehicleResponse)) {
          setVehicles(vehicleResponse);
          setFilteredVehicles(vehicleResponse);
        } else if (vehicleResponse && Array.isArray(vehicleResponse.content)) {
          setVehicles(vehicleResponse.content);
          setFilteredVehicles(vehicleResponse.content);
        } else {
          setVehicles([]);
          setFilteredVehicles([]);
        }

        const hotDealsResponse = await ApiService.getAllHotDeals();
        setHotDeals(Array.isArray(hotDealsResponse) ? hotDealsResponse : []);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data.');
        setVehicles([]);
        setFilteredVehicles([]);
        setHotDeals([]);
        setLoading(false);
      }
    };

    fetchVehiclesAndDeals();
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    let filtered = vehicles;
    if (value.trim()) {
      filtered = vehicles.filter((vehicle) =>
        vehicle.model.toLowerCase().includes(value.toLowerCase())
      );
    }
    setFilteredVehicles(filtered);
  };

  // Apply Filters using individual APIs
  const handleFilter = async () => {
    try {
      if (brand) {
        const brandFiltered = await ApiService.getItemsByBrand(brand);
        setFilteredVehicles(brandFiltered);
        return;
      }
      if (shape) {
        const shapeFiltered = await ApiService.getItemsByShape(shape);
        setFilteredVehicles(shapeFiltered);
        return;
      }
      if (modelYear) {
        const yearFiltered = await ApiService.getItemsByModelYear(modelYear);
        setFilteredVehicles(yearFiltered);
        return;
      }
      if (vehicleHistory) {
        if (vehicleHistory === "no-damage" || vehicleHistory === null) {
          const noDamage = await ApiService.getItemsByVehicleHistoryNoDamage();
          setFilteredVehicles(noDamage);
        } else {
          const withDamage = await ApiService.getItemsByVehicleHistoryWithDamage();
          setFilteredVehicles(withDamage);
        }
        return;
      }
      // If no filter applied, show all
      setFilteredVehicles(vehicles);
    } catch (err) {
      console.error("Error applying filter:", err);
      setError("Failed to apply filters.");
    }
  };

  // Sort by Price
  const handleSortByPrice = async (order) => {
    try {
      const sortedData = await ApiService.getSortedItemsByPrice(order);
      setFilteredVehicles(sortedData);
    } catch (error) {
      console.error("Error sorting by price:", error);
      setError("Failed to sort vehicles by price.");
    }
  };

  // Sort by Mileage
  const handleSortByMileage = async (order) => {
    try {
      const sortedData = await ApiService.getSortedItemsByMileage(order);
      setFilteredVehicles(sortedData);
    } catch (error) {
      console.error("Error sorting by mileage:", error);
      setError("Failed to sort vehicles by mileage.");
    }
  };
// Fetch cart items
const fetchCartItems = async () => {
  const userId = localStorage.getItem('userId');
  const activeOrderId = localStorage.getItem('activeOrderId');

  if (activeOrderId) {
    try {
      const items = await ApiService.getAllItemsInOrder(activeOrderId);
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // For guest users, fall back to localStorage
      if (!userId) {
        const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        setCartItems(guestCart);
      }
    }
  } else if (!userId) {
    // For guest users without an order, use localStorage
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    setCartItems(guestCart);
  }
};

const handleAddToWishlist = async (vehicleId) => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("Please log in to use the wishlist feature.");
      return;
    }


    await ApiService.addToWishlist(userId, vehicleId);
    alert("Added to wishlist!");
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    alert("Failed to add to wishlist. Please try again.");
  }
};

// Check if item is in cart
const isItemInCart = (itemId) => {
  return cartItems.some(item => 
    (item.id === itemId) || (item.itemId === itemId) || (item.vid === itemId)
  );
};
const handleAddToCart = async (vehicle, isDeal = false) => {
  try {
    const vehicleId = isDeal ? vehicle.item?.id : vehicle.id || vehicle.itemId || vehicle.vid;
    setAddingToCart(prev => ({ ...prev, [vehicleId]: true }));

    const userId = localStorage.getItem('userId');
    console.log("Adding to cart - User ID:", userId);

  
    const createdOrder = await ApiService.createOrder(userId);
    if (!createdOrder || !createdOrder.orderID) {
      throw new Error("Order creation failed.");
    }

    const orderId = createdOrder.orderID.toString();
    console.log("New order created. Order ID:", orderId);

    const quantityInput = prompt("Enter quantity to add:");
    const quantity = parseInt(quantityInput);

    if (!quantityInput || isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    console.log("🛒 Adding item to order:", {
      orderId,
      vehicleId,
      quantity
    });

    await ApiService.addItemToOrder(orderId, vehicleId, quantity);

    if (ipAddress && vehicleId) {
      ApiService.trackVisit(ipAddress, vehicleId, 'CART');
    }

    alert("Item successfully added to cart");

  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Failed to add vehicle to cart. Please try again.");
  } finally {
    const vehicleId = isDeal ? vehicle.item?.id : vehicle.id || vehicle.itemId || vehicle.vid;
    setAddingToCart(prev => ({ ...prev, [vehicleId]: false }));
  }
};

  // Remove from Cart functionality
  const handleRemoveFromCart = async (vehicle, isDeal = false) => {
    try {
      const vehicleId = isDeal ? vehicle.item?.id : vehicle.vid;
      setAddingToCart({ ...addingToCart, [vehicleId]: true });
      
      const userId = localStorage.getItem('userId');
      const activeOrderId = localStorage.getItem('activeOrderId');
      
      if (activeOrderId) {
        // Find the orderItemId from the cart items
        const itemInCart = cartItems.find(item => 
          item.id === vehicleId || item.itemId === vehicleId
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
      
      // Refresh cart items
      await fetchCartItems();
      
      alert("Vehicle removed from cart successfully!");
    } catch (error) {
      console.error("Error removing from cart:", error);
      alert("Failed to remove vehicle from cart. Please try again.");
    } finally {
      const vehicleId = isDeal ? vehicle.item?.id : vehicle.vid;
      setAddingToCart({ ...addingToCart, [vehicleId]: false });
    }
  };

  // View Cart
  const handleViewCart = () => {
    const activeOrderId = localStorage.getItem('activeOrderId');
    if (activeOrderId) {
      navigate(`/cart/${activeOrderId}`);
    } else {
      navigate('/cart/guest');
    }
  };

  return (
    <div>
      <h1>Catalog</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search vehicles..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Filter Section */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Shape"
          value={shape}
          onChange={(e) => setShape(e.target.value)}
        />
        <input
          type="number"
          placeholder="Model Year"
          value={modelYear}
          onChange={(e) => setModelYear(e.target.value)}
        />
        <select
          onChange={(e) => setVehicleHistory(e.target.value)}
          value={vehicleHistory}
        >
          <option value="">Vehicle History</option>
          <option value="no-damage">No Damage</option>
          <option value="with-damage">With Damage</option>
        </select>

        <button className="filter-button" onClick={handleFilter}>
          Apply Filters
        </button>
      </div>


      
  	{/* Sorting Buttons */}
  	<div className="sorting-buttons">
    	<button onClick={() => handleSortByPrice("asc")}>Sort by Price ↑</button>
    	<button onClick={() => handleSortByPrice("desc")}>Sort by Price ↓</button>
    	<button onClick={() => handleSortByMileage("asc")}>Sort by Mileage ↑</button>
    	<button onClick={() => handleSortByMileage("desc")}>Sort by Mileage ↓</button>
  	</div>

	  {/* Hot Deals Section */}
    <div>
        <h2>🔥 Hot Deals</h2>
        <div className="vehicle-grid">
          {Array.isArray(hotDeals) && hotDeals.length > 0 ? (
            hotDeals.map((deal) => (
              <div key={deal.id} className="vehicle-card hot-deal-card">
                <img src={deal.item?.imageUrl} alt={deal.item?.model || 'Vehicle'} />
                <h3>{deal.item?.model}</h3>
				<p className="original-price">
				  ${deal.item?.price?.toFixed(2)}
				</p>
				<p className="discounted-price">
				  ${(
				    deal.item?.price -
				    deal.item?.price * (parseFloat(deal.discountPercentage) / 100)
				  ).toFixed(2)}
				</p>
				<span className="deal-tag">🔥 {parseFloat(deal.discountPercentage)}% OFF!</span>
                <div className="button-group">
                  <button
                    className="view-details-button"
                    onClick={() => navigate(`/vehicle-details/${deal.item?.id}`)}
                  >
                    View Details
                  </button>
				  
			
                  
                  {isItemInCart(deal.item?.id) ? (
                    <button
                      className="remove-from-cart-button"
                      onClick={() => handleRemoveFromCart(deal, true)}
                      disabled={addingToCart[deal.item?.id]}
                      style={{ backgroundColor: '#e74c3c' }}
                    >
                      {addingToCart[deal.item?.id] ? "Removing..." : "Remove from Cart"}
                    </button>
                  ) : (
                    <button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(deal, true)}
                      disabled={addingToCart[deal.item?.id]}
                    >
                      {addingToCart[deal.item?.id] ? "Adding..." : "Add to Cart"}
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No hot deals available at the moment.</p>
          )}
        </div>
      </div>

      {/* All Vehicles Section */}
      <h2>🚘 All Vehicles</h2>
      <div className="vehicle-grid">
        {loading ? (
          <p>Loading vehicles...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          filteredVehicles.map((vehicle) => (
            <div key={vehicle.vid} className="vehicle-card">
              <img src={vehicle.imageUrl} alt={vehicle.model} />
              <h3>{vehicle.model}</h3>
              <p>{vehicle.brand}</p>
              <p>${vehicle.price}</p>
              <div className="button-group">
                <button
                  className="view-details-button"
                  onClick={() => navigate(`/vehicle-details/${vehicle.vid}`)}
                >
                  View Details
                </button>
				
				<button
				  className="wishlist-button"
				  onClick={() => handleAddToWishlist(vehicle.vid)}
				>
				  🤍 Add to Wishlist
				</button>
                
                {isItemInCart(vehicle.vid) ? (
                  <button
                    className="remove-from-cart-button"
                    onClick={() => handleRemoveFromCart(vehicle, false)}
                    disabled={addingToCart[vehicle.vid]}
                    style={{ backgroundColor: '#e74c3c' }}
                  >
                    {addingToCart[vehicle.vid] ? "Removing..." : "Remove from Cart"}
                  </button>
                ) : (
                  <button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(vehicle, false)}
                    disabled={addingToCart[vehicle.vid]}
                  >
                    {addingToCart[vehicle.vid] ? "Adding..." : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CatalogPage;