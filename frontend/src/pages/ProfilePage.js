import React, { useEffect, useState } from 'react';
import ApiService from '../service/ApiService'; 

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    province: '',
    zipCode: '',
    country: '',
  });
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await ApiService.getLoggedInUserInfo();
        setUser(userData);
        setAddress(userData.address || {});  // Populate the address form if available
        setLoading(false);
      } catch (err) {
        setError('Failed to load user information');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle address input change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  // Save address to the server
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setAddressLoading(true);
    setAddressError(null);
    
    try {
      const response = await ApiService.saveAddress(address);  // Call saveAddress API
      alert(response.message || 'Address saved successfully!');
      setAddressLoading(false);
    } catch (err) {
      setAddressError('Failed to save address');
      setAddressLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear the token and redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');  // If using refresh token as well
    window.location.href = '/login';  // Redirect to login page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>

          <h2>Address</h2>
          <form onSubmit={handleSaveAddress}>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleAddressChange}
              placeholder="Street"
            />
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              placeholder="City"
            />
            <input
              type="text"
              name="province"
              value={address.province}
              onChange={handleAddressChange}
              placeholder="Province/State"
            />
            <input
              type="text"
              name="zipCode"
              value={address.zipCode}
              onChange={handleAddressChange}
              placeholder="Zip Code"
            />
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleAddressChange}
              placeholder="Country"
            />
            <button type="submit" disabled={addressLoading}>
              {addressLoading ? 'Saving...' : 'Save Address'}
            </button>
          </form>
          {addressError && <p className="error-text">{addressError}</p>}

          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ProfilePage;
