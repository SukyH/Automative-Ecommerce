import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await ApiService.getAllItems();
        setVehicles(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vehicles:', err);
        setError('Failed to load vehicles.');
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleUpdateVehicle = async (vehicleId) => {
    // Implement logic to update vehicle, you may open a modal or a form
    console.log(`Updating vehicle ID: ${vehicleId}`);
    // Example update request
    try {
      const updatedVehicle = {
        // updated fields here
        price: 10000, // Example: updating price
      };
      await ApiService.updateItem(vehicleId, updatedVehicle);
      setVehicles(vehicles.map(vehicle => 
        vehicle.id === vehicleId ? { ...vehicle, ...updatedVehicle } : vehicle
      ));
      alert('Vehicle updated successfully');
    } catch (err) {
      console.error('Error updating vehicle:', err);
      alert('Failed to update vehicle');
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      await ApiService.deleteItem(vehicleId);
      setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
      alert('Vehicle deleted successfully');
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      alert('Failed to delete vehicle');
    }
  };

  if (loading) return <p>Loading vehicles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="vehicle-management">
      <h1>Vehicle Management</h1>
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.model}</td>
              <td>${vehicle.price}</td>
              <td>{vehicle.stock}</td>
              <td>
                <button onClick={() => handleUpdateVehicle(vehicle.id)}>
                  Update
                </button>
                <button onClick={() => handleDeleteVehicle(vehicle.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleManagement;
