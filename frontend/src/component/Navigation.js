import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import "../index.css";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  // Cart count loader
  useEffect(() => {
    const loadCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    loadCartCount();
    window.addEventListener("cartUpdate", loadCartCount);

    return () => window.removeEventListener("cartUpdate", loadCartCount);
  }, []);

  // Login status checker
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("userRole");
      setIsLoggedIn(!!token);
      setIsAdmin(userRole === "ADMIN");
    };

    checkLoginStatus();
    window.addEventListener("authChange", checkLoginStatus);

    return () => window.removeEventListener("authChange", checkLoginStatus);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await ApiService.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      window.dispatchEvent(new Event("authChange"));
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src="/logo.svg" alt="EV Store Logo" />
          <span>EV Store</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/catalog" className="nav-link">
            Catalog
          </Link>
          <Link to="/wishlist" className="nav-link">
            <i className="fas fa-heart"></i> Wishlist
          </Link>
          <Link to="/checkout" className="nav-link">
            <i className="fas fa-credit-card"></i> Checkout
          </Link>

          {/* Shopping Cart Button */}
          <Link to="/cart" className="nav-link">
            <i className="fas fa-shopping-cart"></i> Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/profile" className="nav-link">
                <i className="fas fa-user"></i> My Account
              </Link>
              <button onClick={handleLogout} className="nav-button">
                Sign Out
              </button>
              {isAdmin && (
                <Link to="/admin" className="nav-link">
                  Admin Panel
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-icon">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link">
            Home
          </Link>
          <Link to="/catalog" className="mobile-nav-link">
            Catalog
          </Link>
          <Link to="/wishlist" className="mobile-nav-link">
            <i className="fas fa-heart"></i> Wishlist
          </Link>
          <Link to="/checkout" className="mobile-nav-link">
            <i className="fas fa-credit-card"></i> Checkout
          </Link>
          <Link to="/cart" className="mobile-nav-link">
            Cart
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="mobile-nav-link">
                <i className="fas fa-user"></i> My Account
              </Link>
              <button onClick={handleLogout} className="mobile-nav-button">
                Sign Out
              </button>
              {isAdmin && (
                <Link to="/admin" className="mobile-nav-link">
                  Admin Panel
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-nav-link">
                Sign In
              </Link>
              <Link to="/register" className="mobile-nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
