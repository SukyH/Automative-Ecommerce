import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './component/Navigation';
import Footer from './component/Footer';
import Protector from './service/Protector';

// Pages
import CatalogPage from './pages/CatalogPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import VehicleDetailsPage from './pages/VehicleDetailsPage';
import WishListPage from './pages/WishListPage';

// Admin Pages
import AdminDashboard from './admin/AdminDashboard';
import AnalyticsPage from './admin/AnalyticsPage';
import OrderManagement from './admin/OrderManagement';
import VehicleManagement from './admin/VehicleManagementPage';

// Main App
function App() {
  return (
    <Router>
      <Navigation />
      <div className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/cart/:orderId" element={<ShoppingCartPage />} />

          <Route path="/vehicle-details/:id" element={<VehicleDetailsPage />} />
          <Route path="/wishlist" element={<WishListPage />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <Protector
                component={AdminDashboard}
                isAdminRequired={true}
              />
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <Protector
                component={AnalyticsPage}
                isAdminRequired={true}
              />
            }
          />
          <Route
            path="/admin/orders"
            element={
              <Protector
                component={OrderManagement}
                isAdminRequired={true}
              />
            }
          />
          <Route
            path="/admin/vehicles"
            element={
              <Protector
                component={VehicleManagement}
                isAdminRequired={true}
              />
            }
          />

          {/* Catch-all Route for 404 */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
