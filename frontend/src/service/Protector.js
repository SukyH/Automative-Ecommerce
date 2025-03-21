import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Protector = ({ Component, isAdminRequired }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (authToken) {
      setIsAuthenticated(true);
      if (role) {
        setIsAdmin(role === 'ADMIN');
      }
    }

    setCheckedAuth(true);
  }, []);

  if (!checkedAuth) {
    return <div>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdminRequired && !isAdmin) {
    return (
      <div>
        <h2>Not Authorized</h2>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return <Component />;
};

export default Protector;
