import React, { useEffect, useState } from 'react';
import ApiService from '../service/ApiService'; 

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const userData = await ApiService.getLoggedInUserInfo();
        setUser(userData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load user information');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default ProfilePage;

