
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



  const navigate = useNavigate();

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

  // Apply Filters
  const handleFilter = () => {
    let filtered = vehicles;

    if (brand) filtered = filtered.filter((v) => v.brand === brand);
    if (shape) filtered = filtered.filter((v) => v.shape === shape);
    if (modelYear) filtered = filtered.filter((v) => v.modelYear === modelYear);
    if (vehicleHistory)
      filtered = filtered.filter((v) => v.vehicleHistory === vehicleHistory);

    setFilteredVehicles(filtered);
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
	            <p className="original-price">${deal.item?.price}</p>
	            <p className="discounted-price">
	              ${deal.item?.price - deal.item?.price * (deal.discount / 100)}
	            </p>
	            <span className="deal-tag">🔥 {deal.discount}% OFF!</span>
	            <button
	              className="view-details-button"
	              onClick={() => navigate(`/vehicle-details/${deal.item?.id}`)}
	            >
	              View Details
	            </button>
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
        	<div key={vehicle.id} className="vehicle-card">
          	<img src={vehicle.imageUrl} alt={vehicle.model} />
          	<h3>{vehicle.model}</h3>
          	<p>{vehicle.brand}</p>
          	<p>${vehicle.price}</p>
          	<button
            	className="view-details-button"
            	onClick={() => navigate(`/vehicle-details/${vehicle.id}`)}
          	>
            	View Details
          	</button>
        	</div>
      	))
    	)}
  	</div>
	</div>
  );
};

export default CatalogPage;
