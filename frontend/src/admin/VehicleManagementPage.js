import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for adding new vehicle
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    description: '',
    brand: '',
    model: '',
    image: null,
    price: '',
    quantity: '',
    mileage: '',
    shape: '',
    modelYear: '',
    vehicleHistory: '',
    categoryId: '', // assuming categoryId is needed
  });

  // State for error messages
  const [addVehicleError, setAddVehicleError] = useState(null);

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

  const handleUpdateVehicle = async (vehicleId, updatedFields) => {
    try {
      const updatedVehicle = { ...updatedFields };
      if (updatedFields.image) {
        const formData = new FormData();
        formData.append('file', updatedFields.image);
        const uploadResponse = await ApiService.uploadVehicleImage(formData);
        updatedVehicle.imageUrl = uploadResponse.data;
      }

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

  const handleAddVehicle = async (e) => {
    e.preventDefault();

    if (!newVehicle.name || !newVehicle.model || !newVehicle.price || !newVehicle.quantity || !newVehicle.mileage || !newVehicle.shape || !newVehicle.modelYear || !newVehicle.vehicleHistory) {
      setAddVehicleError('All fields are required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newVehicle.name);
      formData.append('description', newVehicle.description);
      formData.append('brand', newVehicle.brand);
      formData.append('model', newVehicle.model);
      formData.append('price', newVehicle.price);
      formData.append('quantity', newVehicle.quantity);
      formData.append('mileage', newVehicle.mileage);
      formData.append('shape', newVehicle.shape);
      formData.append('modelYear', newVehicle.modelYear);
      formData.append('vehicleHistory', newVehicle.vehicleHistory);
      formData.append('categoryId', newVehicle.categoryId);

      if (newVehicle.image) {
        formData.append('file', newVehicle.image);
      }

      const response = await ApiService.createItem(formData);
      setVehicles([...vehicles, response.data]);
      setNewVehicle({
        name: '',
        description: '',
        brand: '',
        model: '',
        image: null,
        price: '',
        quantity: '',
        mileage: '',
        shape: '',
        modelYear: '',
        vehicleHistory: '',
        categoryId: '',
      });
      setAddVehicleError(null);
      alert('Vehicle added successfully');
    } catch (err) {
      console.error('Error adding vehicle:', err);
      alert('Failed to add vehicle');
    }
  };

  const handleImageChange = (e) => {
    setNewVehicle({ ...newVehicle, image: e.target.files[0] });
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
          <input
            type="text"
            name="name"
            value={newVehicle.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={newVehicle.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={newVehicle.brand}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            name="model"
            value={newVehicle.model}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={newVehicle.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={newVehicle.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Mileage:</label>
          <input
            type="number"
            name="mileage"
            value={newVehicle.mileage}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Shape:</label>
          <input
            type="text"
            name="shape"
            value={newVehicle.shape}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Model Year:</label>
          <input
            type="number"
            name="modelYear"
            value={newVehicle.modelYear}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Vehicle History:</label>
          <textarea
            name="vehicleHistory"
            value={newVehicle.vehicleHistory}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Category ID:</label>
          <input
            type="text"
            name="categoryId"
            value={newVehicle.categoryId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} />
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.vid}>
              <td>{vehicle.name}</td>
              <td>{vehicle.model}</td>
              <td>${vehicle.price}</td>
              <td>{vehicle.quantity}</td>
              <td>
                <button onClick={() => handleUpdateVehicle(vehicle.vid, { price: 12000, image: vehicle.imageUrl })}>
                  Update
                </button>
                <button onClick={() => handleDeleteVehicle(vehicle.vid)}>
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
