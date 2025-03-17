import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';


const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      setIsLoggedIn(!!token);
      setIsAdmin(userRole === 'ADMIN');
    };

    checkLoginStatus();
    window.addEventListener('authChange', checkLoginStatus);

    return () => {
      window.removeEventListener('authChange', checkLoginStatus);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await ApiService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      window.dispatchEvent(new Event('authChange'));
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav>
      <div>
        <div>
          <div>
            <Link to="/">
              <img src="/logo.svg" alt="EV Store Logo" />
              <span>EV Store</span>
            </Link>
          </div>

          <div>
            <Link to="/">Home</Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/hot-deals">Hot Deals</Link>
            <Link to="/compare">Compare Vehicles</Link>
            <Link to="/loan-calculator">Loan Calculator</Link>
            {isLoggedIn ? (
              <>
                <Link to="/wishlist">
                  <i className="fas fa-heart"></i>
                </Link>
                <Link to="/cart">
                  <i className="fas fa-shopping-cart"></i>
                </Link>
                <Link to="/profile">
                  <i className="fas fa-user"></i> My Account
                </Link>
                <button onClick={handleLogout}>Sign Out</button>
                {isAdmin && <Link to="/admin">Admin Panel</Link>}
              </>
            ) : (
              <>
                <Link to="/cart">
                  <i className="fas fa-shopping-cart"></i>
                </Link>
                <Link to="/login">Sign In</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>

          <div>
            <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showMobileMenu && (
        <div>
          <div>
            <Link to="/">Home</Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/hot-deals">Hot Deals</Link>
            <Link to="/compare">Compare Vehicles</Link>
            <Link to="/loan-calculator">Loan Calculator</Link>
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/wishlist">
                  <i className="fas fa-heart"></i> Wishlist
                </Link>
                <Link to="/profile">
                  <i className="fas fa-user"></i> My Account
                </Link>
                <button onClick={handleLogout}>Sign Out</button>
                {isAdmin && <Link to="/admin">Admin Panel</Link>}
              </>
            ) : (
              <>
                <Link to="/login">Sign In</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
