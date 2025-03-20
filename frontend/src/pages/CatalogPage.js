import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';



const CatalogPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hotDeals, setHotDeals] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const history = useNavigate();
  
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getAllItems();
        setVehicles(response.data.content);
        setFilteredVehicles(response.data.content); // Initial vehicles to display
        setHotDeals(response.data.content.filter(vehicle => vehicle.hotDeal)); // Hot deals filtering
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError('Failed to load vehicles.');
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterVehicles(e.target.value, selectedCategory);
  };

  // Handle Category Selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    filterVehicles(searchTerm, e.target.value);
  };

  // Filter vehicles based on search and category
  const filterVehicles = (search, category) => {
    let filtered = vehicles;

    // Filter by search term
    if (search) {
      filtered = filtered.filter(vehicle =>
        vehicle.model.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter(vehicle => vehicle.category === category);
    }

    setFilteredVehicles(filtered);
  };
   // Handle Select Vehicle for Comparison
   const handleSelectVehicle = (vehicle) => {
    if (selectedVehicles.length < 3) {
      setSelectedVehicles([...selectedVehicles, vehicle]);
    } else {
      alert("You can only compare up to 3 vehicles.");
    }
  };

 // Function to remove a vehicle from comparison
 const handleRemoveVehicle = (vehicleId) => {
  setSelectedVehicles(selectedVehicles.filter(vehicle => vehicle.id !== vehicleId));
};
 // Render comparison details
 const comparisonDetails = selectedVehicles.length > 0 && (
  <div>
    <h2>Comparison</h2>
    <div className="comparison-table">
      {selectedVehicles.map(vehicle => (
        <div key={vehicle.id} className="vehicle-comparison">
          <h3>{vehicle.model}</h3>
          <img src={vehicle.imageUrl} alt={vehicle.model} />
          <p><strong>Brand:</strong> {vehicle.brand}</p>
          <p><strong>Price:</strong> ${vehicle.price}</p>
          <p><strong>Model Year:</strong> {vehicle.modelYear}</p>
          <p><strong>Rating:</strong> {vehicle.rating}</p>
          <p><strong>Reviews:</strong> {vehicle.reviews}</p>
          <button onClick={() => handleRemoveVehicle(vehicle.id)}>Remove from Comparison</button>
        </div>
      ))}
    </div>
  </div>
);
 
  return (
    <div>
      <h1>Catalog</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by model"
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Category Dropdown */}
      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">All Categories</option>
        <option value="SUV">SUV</option>
        <option value="Sedan">Sedan</option>
        <option value="Truck">Truck</option>
        <option value="Electric">Electric</option>
        {/* Add more categories as needed */}
      </select>

      {/* Hot Deals Section */}
      <div>
        <h2>Hot Deals</h2>
        <div className="vehicle-grid">
          {hotDeals.length === 0 ? (
            <p>No hot deals available at the moment.</p>
          ) : (
            hotDeals.map(vehicle => (
              <Link key={vehicle.id} to={`/vehicle/${vehicle.id}`}>
                <div className="vehicle-card">
                  <img src={vehicle.imageUrl} alt={vehicle.model} />
                  <p>{vehicle.model}</p>
                  <p>${vehicle.price}</p>
                  <span>Hot Deal!</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="vehicle-grid">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          filteredVehicles.map(vehicle => (
            <Link key={vehicle.id} to={`/vehicle/${vehicle.id}`}>
              <div className="vehicle-card">
                <img src={vehicle.imageUrl} alt={vehicle.model} />
                <p>{vehicle.model}</p>
                <p>${vehicle.price}</p>
                <button onClick={() => handleSelectVehicle(vehicle)}>Compare</button>
              </div>
            </Link>
          ))
        )}
      </div>
    {/* Display comparison details*/}
    {comparisonDetails}
    </div>
  );
};



export default CatalogPage;
