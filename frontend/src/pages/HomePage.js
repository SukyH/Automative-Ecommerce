import React, { useEffect, useState } from "react";
import ApiService from '../service/ApiService';
import { Link } from "react-router-dom"; // Add this import
const HomePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await ApiService.getAllItems();
        setVehicles(response);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicles.");
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Common styles
  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#f7f7f7", color: "#333" },
    section: { padding: "3rem 1rem", maxWidth: "1200px", margin: "0 auto" },
    heading: { fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "2rem" },
    button: {
      padding: "0.75rem 1.5rem",
      backgroundColor: "#1e90ff",
      color: "#fff",
      border: "none",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease"
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "0.75rem",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      overflow: "hidden",
      transition: "box-shadow 0.3s ease"
    }
  };

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ 
        width: "3rem", 
        height: "3rem", 
        border: "4px solid #f3f3f3", 
        borderTop: "4px solid #3498db", 
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }}>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
  
  if (error) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ 
        backgroundColor: "#ffebee", 
        border: "1px solid #f44336", 
        borderLeft: "5px solid #f44336", 
        color: "#c62828", 
        padding: "1rem" 
      }}>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={{
        position: "relative",
        height: "28rem",
        backgroundImage: "url('/images/hero-car.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          color: "#fff"
        }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", textAlign: "center", margin: 0 }}>Drive into the Future</h1>
          <p style={{ 
            marginTop: "1rem", 
            fontSize: "1.5rem", 
            maxWidth: "700px", 
            textAlign: "center" 
          }}>
            Explore our latest electric vehicles and unbeatable deals
          </p>
          <Link to="/catalog">
    <button style={{ ...styles.button, marginTop: "2rem", fontSize: "1.25rem", padding: "1rem 2rem" }}>
      Shop Now
    </button>
     </Link>
        </div>
      </div>

      {/* Featured Vehicles Section */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Featured Cars</h2>
        
        {vehicles.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem"
          }}>
            {vehicles.map((vehicle, index) => (
              <div key={index} style={styles.card}>
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      transition: "transform 0.3s ease"
                    }}
                    onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                  />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", margin: 0 }}>{vehicle.name}</h3>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    marginTop: "0.75rem" 
                  }}>
                    <p style={{ color: "#555", fontWeight: "500", margin: 0 }}>
                      Starting at <span style={{ color: "#1e90ff" }}>${vehicle.price?.toLocaleString() || vehicle.price}</span>
                    </p>
                    {vehicle.electric && (
                      <span style={{ 
                        backgroundColor: "#e6f7ed", 
                        color: "#2e7d32", 
                        fontSize: "0.75rem",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px"
                      }}>
                        Electric
                      </span>
                    )}
                  </div>
                 
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            ...styles.card,
            padding: "2rem",
            textAlign: "center"
          }}>
            <p style={{ fontSize: "1.125rem", color: "#555" }}>No vehicles available at the moment.</p>
            <p style={{ marginTop: "0.5rem" }}>Please check back later for our latest inventory.</p>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section style={{
        padding: "4rem 1rem",
        backgroundColor: "#1e90ff",
        color: "#fff",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Ready for a Test Drive?</h2>
          <p style={{ 
            fontSize: "1.25rem", 
            marginBottom: "1.5rem", 
            maxWidth: "700px", 
            margin: "0 auto 1.5rem" 
          }}>
            Experience the performance and comfort of our vehicles firsthand. Schedule your test drive today.
          </p>
          <button style={{
            padding: "0.75rem 2rem",
            backgroundColor: "#fff",
            color: "#1e90ff",
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: "600",
            cursor: "pointer"
          }}>
            Schedule Now
          </button>
        </div>
      </section>

      {/* Popular Brands Section */}
      <section style={{
        padding: "3rem 1rem",
        backgroundColor: "#f0f0f0"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={styles.heading}>Popular Brands</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem"
          }}>
            {["Tesla", "Nissan", "BMW", "Rivian"].map((brand, index) => (
              <div key={index} style={{
                ...styles.card,
                padding: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100px"
              }}>
                <img
                  src={`/images/${brand.toLowerCase()}.png`}
                  alt={brand}
                  style={{ height: "3rem", maxWidth: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.section}>
        <h2 style={styles.heading}>Why Choose Us?</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem"
        }}>
          <div style={{
            ...styles.card,
            padding: "2rem",
            textAlign: "center"
          }}>
            <div style={{
              width: "4rem",
              height: "4rem",
              backgroundColor: "#e6f0ff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem"
            }}>
              <svg style={{ width: "2rem", height: "2rem", color: "#1e90ff" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.75rem" }}>Best Prices</h3>
            <p style={{ color: "#555" }}>We offer competitive pricing and flexible financing options to fit your budget.</p>
          </div>
          
          <div style={{
            ...styles.card,
            padding: "2rem",
            textAlign: "center"
          }}>
            <div style={{
              width: "4rem",
              height: "4rem",
              backgroundColor: "#e6f4ea",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem"
            }}>
              <svg style={{ width: "2rem", height: "2rem", color: "#2e7d32" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.75rem" }}>Eco-Friendly Options</h3>
            <p style={{ color: "#555" }}>Browse our selection of electric and hybrid vehicles to reduce your carbon footprint.</p>
          </div>
          
          <div style={{
            ...styles.card,
            padding: "2rem",
            textAlign: "center"
          }}>
            <div style={{
              width: "4rem",
              height: "4rem",
              backgroundColor: "#f3e5f5",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem"
            }}>
              <svg style={{ width: "2rem", height: "2rem", color: "#7b1fa2" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.75rem" }}>Fast Delivery</h3>
            <p style={{ color: "#555" }}>Get your new vehicle delivered to your doorstep within days of purchase.</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

