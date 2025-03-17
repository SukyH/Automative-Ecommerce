import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>
        <div>
          <div>
            <h4>EV Store</h4>
            <h5>Leading the way in electric vehicle retail</h5>
            <div>
              <button type="button">
                <i className="fab fa-twitter"></i>
              </button>
              <button type="button">
                <i className="fab fa-facebook-square"></i>
              </button>
              <button type="button">
                <i className="fab fa-instagram"></i>
              </button>
              <button type="button">
                <i className="fab fa-github"></i>
              </button>
            </div>
          </div>
          <div>
            <div>
              <div>
                <span>Useful Links</span>
                <ul>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link to="/catalog">Catalog</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
              <div>
                <span>Customer Service</span>
                <ul>
                  <li>
                    <Link to="/faq">FAQ</Link>
                  </li>
                  <li>
                    <Link to="/shipping">Shipping & Delivery</Link>
                  </li>
                  <li>
                    <Link to="/returns">Returns Policy</Link>
                  </li>
                  <li>
                    <Link to="/privacy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
              <div>
                <span>Other Resources</span>
                <ul>
                  <li>
                    <Link to="/loan-calculator">Loan Calculator</Link>
                  </li>
                  <li>
                    <Link to="/compare">Compare Vehicles</Link>
                  </li>
                  <li>
                    <Link to="/hot-deals">Hot Deals</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div>
            <div>
              Copyright © {currentYear} EV Store. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;