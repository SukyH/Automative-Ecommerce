import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';

const AnalyticsPage = () => {
  const [usageReport, setUsageReport] = useState(null);
  const [salesReport, setSalesReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ipAddress, setIpAddress] = useState('');
  const [productId, setProductId] = useState(''); // You can set this dynamically based on the product the user is viewing
  const [eventType, setEventType] = useState('VIEW'); // The event type will change based on user interaction

  // Function to get the user's IP address (use a service or server to get the real IP)
  const fetchIpAddress = async () => {
    try {
      const response = await ApiService.getIpAddress(); // This can be a backend call or a third-party service
      setIpAddress(response.data.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  };

  // Trigger a visit tracking event
  const trackVisit = async () => {
    try {
      if (ipAddress && productId && eventType) {
        await ApiService.trackVisit(ipAddress, productId, eventType);
        console.log('Event tracked successfully');
      } else {
        console.log('Missing required data to track the visit');
      }
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
  };

  useEffect(() => {
    // Fetch the user's IP address and track the event on component mount
    fetchIpAddress();

    // Simulate fetching the sales and usage reports
    const fetchReports = async () => {
      try {
        const usageResponse = await ApiService.getApplicationUsageReport();
        const salesResponse = await ApiService.getSalesReport();

        setUsageReport(usageResponse.data);
        setSalesReport(salesResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Failed to load reports.');
        setLoading(false);
      }
    };

    fetchReports();
  }, [ipAddress, productId, eventType]); // Re-run the effect when these values change

  // Example: Call trackVisit when a user clicks "Add to Cart"
  const handleAddToCart = () => {
    setEventType('CART');
    trackVisit();
  };

  // Example: Call trackVisit when a user clicks "Purchase"
  const handlePurchase = () => {
    setEventType('PURCHASE');
    trackVisit();
  };

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="analytics-page">
      <h1>Analytics</h1>
      <div className="report">
        <h2>Application Usage Report</h2>
        <pre>{JSON.stringify(usageReport, null, 2)}</pre>
      </div>
      <div className="report">
        <h2>Sales Report (Monthly)</h2>
        <pre>{JSON.stringify(salesReport, null, 2)}</pre>
      </div>

      <div className="product-actions">
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handlePurchase}>Purchase</button>
      </div>
    </div>
  );
};

export default AnalyticsPage;
