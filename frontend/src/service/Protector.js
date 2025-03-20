import React, { useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';

const Protector = ({ component: Component, isAdminRequired, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('token');  // Use 'token' to check auth status
    const role = localStorage.getItem('role');  // Role stored in localStorage

    if (authToken) {
      setIsAuthenticated(true);
      if (role) {
        setIsAdmin(role === 'ADMIN');  // Check if the role is 'ADMIN'
      }
    }
  }, []);

  return (
    <Route
      {...rest}
      element={
        isAuthenticated && (!isAdminRequired || isAdmin) ? (
          <Component />
        ) : isAuthenticated ? (
          <div>
            <h2>Not Authorized</h2>
            <p>You don't have permission to access this page.</p>
          </div>
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default Protector;
