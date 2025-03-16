import React, { useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';

const Protector = ({ component: Component, isAdminRequired, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      const decodedToken = decodeJwt(authToken);
      if (decodedToken) {
        setIsAuthenticated(true);
        setIsAdmin(decodedToken.isAdmin);
      }
    }
  }, []);

  const decodeJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Error decoding JWT:', e);
      return null;
    }
  };

  return (
    <Route
      {...rest}
      element={
        isAuthenticated && (!isAdminRequired || isAdmin) ? (
          <Component />
        ) : isAuthenticated ? (
          <Navigate to="/not-authorized" />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default Protector;
