import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';

const AnalyticsPage = () => {
  const [usageReport, setUsageReport] = useState(null);
  const [salesReport, setSalesReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ipAddress, setIpAddress] = useState('');

  // Function to get the user's IP address
  const fetchIpAddress = async () => {
    try {
      const response = await ApiService.getIpAddress();
      setIpAddress(response.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  };

  // Load initial data
  useEffect(() => {
    const initializeAnalytics = async () => {
      await fetchIpAddress();
      
      try {
        const usageResponse = await ApiService.getApplicationUsageReport();
        const salesResponse = await ApiService.getSalesReport();
        setUsageReport(usageResponse.data);
        setSalesReport(salesResponse);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Failed to load reports.');
        setLoading(false);
      }
    };

    initializeAnalytics();
  }, []);

  // This function should be called whenever an item is viewed
  const trackItemView = async (itemId) => {
    if (ipAddress && itemId) {
      try {
        await ApiService.trackVisit(ipAddress, itemId, 'VIEW');
        console.log(`View event tracked for item ${itemId}`);
      } catch (error) {
        console.error('Error tracking view event:', error);
      }
    }
  };

  // This function should be called whenever an item is added to cart
  const trackAddToCart = async (itemId) => {
    if (ipAddress && itemId) {
      try {
        await ApiService.trackVisit(ipAddress, itemId, 'CART');
        console.log(`Cart event tracked for item ${itemId}`);
      } catch (error) {
        console.error('Error tracking cart event:', error);
      }
    }
  };

  // This function should be called whenever an item is purchased
  const trackPurchase = async (itemId) => {
    if (ipAddress && itemId) {
      try {
        await ApiService.trackVisit(ipAddress, itemId, 'PURCHASE');
        console.log(`Purchase event tracked for item ${itemId}`);
      } catch (error) {
        console.error('Error tracking purchase event:', error);
      }
    }
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
    </div>
  );
};

export default AnalyticsPage;