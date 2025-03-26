import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#222", color: "#fff", paddingTop: "3rem", paddingBottom: "1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem"
        }}>
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>AutoFuture</h3>
            <p style={{ color: "#aaa" }}>Driving innovation and sustainability in the automotive industry.</p>
          </div>
          <div>
            <h4 style={{ fontWeight: "600", marginBottom: "1rem" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}><a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Home</a></li>
              <li style={{ marginBottom: "0.5rem" }}><a href="#" style={{ color: "#aaa", textDecoration: "none" }}>About Us</a></li>
              <li style={{ marginBottom: "0.5rem" }}><a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Vehicles</a></li>
              <li style={{ marginBottom: "0.5rem" }}><a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: "600", marginBottom: "1rem" }}>Support</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}><a href="#" style={{ color: "#aaa", textDecoration: "none" }}>FAQ</a></li>
              <li style={{ marginBottom: "0.5rem" }}><a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Shipping</a></li>
              <li style={{ marginBottom: "0.5rem" }}><a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Returns</a></li>
              <li style={{ marginBottom: "0.5rem" }}><a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: "600", marginBottom: "1rem" }}>Contact Us</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#aaa" }}>
              <li style={{ marginBottom: "0.5rem" }}>123 Auto Way, Car City</li>
              <li style={{ marginBottom: "0.5rem" }}>+1 (555) 123-4567</li>
              <li style={{ marginBottom: "0.5rem" }}>info@autofuture.com</li>
            </ul>
          </div>
        </div>
        <div style={{ 
          borderTop: "1px solid #444", 
          paddingTop: "1.5rem",
          textAlign: "center"
        }}>
          <p style={{ color: "#aaa", margin: 0 }}>&copy; {currentYear} AutoFuture Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
