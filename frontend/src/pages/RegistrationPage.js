import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      province: '',
      country: '',
      postalCode: '', // Added postalCode
    },
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle changes for both user and address fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [addressField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const registrationPayload = {
      ...formData,
      role: 'USER', // Default role still "USER"
    };

    try {
      const response = await ApiService.registerUser(registrationPayload);

      if (response && response.status === 200) {
        alert('Registration successful! Please log in.');
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        {/* User Info */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />

        <h2>Address</h2>
        {/* Address Fields */}
        <input
          type="text"
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
          placeholder="Street"
          required
        />
        <input
          type="text"
          name="address.city"
          value={formData.address.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <input
          type="text"
          name="address.province"
          value={formData.address.province}
          onChange={handleChange}
          placeholder="Province/State"
          required
        />
        <input
          type="text"
          name="address.postalCode" // Added postalCode input
          value={formData.address.postalCode}
          onChange={handleChange}
          placeholder="Postal Code"
          required
        />
        <input
          type="text"
          name="address.country"
          value={formData.address.country}
          onChange={handleChange}
          placeholder="Country"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default RegistrationPage;
