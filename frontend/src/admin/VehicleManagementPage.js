import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addVehicleError, setAddVehicleError] = useState(null);

  const [newVehicle, setNewVehicle] = useState({
    name: '',
    description: '',
    brand: '',
    model: '',
    imageUrl: '',  // Changed from image file to image URL
    price: '',
    quantity: '',
    mileage: '',
    shape: '',
    modelYear: '',
    vehicleHistory: '',
  });

  // Fetch vehicles from API
  const fetchVehicles = async () => {
    try {
      const response = await ApiService.getAllItems();
      if (Array.isArray(response.data)) {
        setVehicles(response.data);
      } else if (response.data?.content) {
        setVehicles(response.data.content);
      } else {
        setVehicles([]);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError('Failed to load vehicles.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Handle adding a new vehicle
  const handleAddVehicle = async (e) => {
    e.preventDefault();

    if (!newVehicle.name || !newVehicle.model || !newVehicle.price || !newVehicle.quantity || !newVehicle.mileage || !newVehicle.shape || !newVehicle.modelYear || !newVehicle.vehicleHistory || !newVehicle.imageUrl) {
      setAddVehicleError('All fields are required, including an image URL.');
      return;
    }

    try {
      const response = await ApiService.addItem(newVehicle);
      setVehicles((prevVehicles) => [...prevVehicles, response.data]);
      setNewVehicle({
        name: '',
        description: '',
        brand: '',
        model: '',
        imageUrl: '', // Reset the image URL input
        price: '',
        quantity: '',
        mileage: '',
        shape: '',
        modelYear: '',
        vehicleHistory: '',
      });
      setAddVehicleError(null);
      alert('Vehicle added successfully');
    } catch (err) {
      console.error('Error adding vehicle:', err);
      alert('Failed to add vehicle');
    }
  };

  // Handle deleting a vehicle (Restored function)
  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await ApiService.deleteItem(vehicleId);
      setVehicles((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.vid !== vehicleId));
      alert('Vehicle deleted successfully');
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      alert('Failed to delete vehicle');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  if (loading) return <p>Loading vehicles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="vehicle-management">
      <h1>Vehicle Management</h1>

      {/* Add Vehicle Form */}
      <h2>Add New Vehicle</h2>
      <form onSubmit={handleAddVehicle}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={newVehicle.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={newVehicle.description} onChange={handleInputChange} />
        </div>
        <div>
          <label>Brand:</label>
          <input type="text" name="brand" value={newVehicle.brand} onChange={handleInputChange} />
        </div>
        <div>
          <label>Model:</label>
          <input type="text" name="model" value={newVehicle.model} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={newVehicle.price} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" name="quantity" value={newVehicle.quantity} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Mileage:</label>
          <input type="number" name="mileage" value={newVehicle.mileage} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Shape:</label>
          <input type="text" name="shape" value={newVehicle.shape} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Model Year:</label>
          <input type="number" name="modelYear" value={newVehicle.modelYear} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Vehicle History:</label>
          <textarea name="vehicleHistory" value={newVehicle.vehicleHistory} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="imageUrl" value={newVehicle.imageUrl} onChange={handleInputChange} required />
        </div>
        {addVehicleError && <p style={{ color: 'red' }}>{addVehicleError}</p>}
        <button type="submit">Add Vehicle</button>
      </form>

      {/* Vehicle List */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles && vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <tr key={vehicle.vid}>
                <td>{vehicle.name}</td>
                <td>{vehicle.model}</td>
                <td>${vehicle.price}</td>
                <td>{vehicle.quantity}</td>
                <td>
                  {vehicle.imageUrl ? (
                    <img src={vehicle.imageUrl} alt={vehicle.name} style={{ width: '100px', height: 'auto' }} />
                  ) : (
                    'No image available'
                  )}
                </td>
                <td>
                  <button onClick={() => handleDeleteVehicle(vehicle.vid)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No vehicles available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleManagement;
