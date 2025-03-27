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
        setAddress(userData.address || { street: '', city: '', province: '', zipCode: '', country: '' });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError('Failed to load user information');
        // Log the user out if fetching fails (e.g., due to expired token)
        ApiService.logout();
        window.location.href = '/login';  // Redirect to login page
      } finally {
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

  // Validate address form
  const validateAddress = () => {
    const { street, city, province, zipCode, country } = address;
    if (!street || !city || !province || !zipCode || !country) {
      setAddressError("All fields are required.");
      return false;
    }
    setAddressError(null);  // Clear any previous errors
    return true;
  };

  // Save address to the server
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!validateAddress()) {
      return; // Stop if validation fails
    }
    setAddressLoading(true);
    setAddressError(null);
    
    try {
      const response = await ApiService.saveAddress(address);  // Call saveAddress API
      alert(response.message || 'Address saved successfully!');
    } catch (err) {
      console.error("Error saving address:", err);
      setAddressError('Failed to save address');
    } finally {
      setAddressLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    ApiService.logout();  // Call logout API method
    //window.location.href = '/login';  // Redirect to login page
  };

  // Loading and error handling
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-text">{error}</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>

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
