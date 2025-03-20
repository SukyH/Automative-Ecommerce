import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const userRole = localStorage.getItem('role');  // Get role from localStorage

  // Check if the user is an admin
  if (userRole !== 'ADMIN') {
    return <Navigate to="/" />;  // Redirect to home if not an admin
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/admin/analytics">Analytics</Link>
        <Link to="/admin/orders">Order Management</Link>
        <Link to="/admin/vehicles">Vehicle Management</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

