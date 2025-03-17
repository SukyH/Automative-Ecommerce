import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';



const AnalyticsPage = () => {
  const [usageReport, setUsageReport] = useState(null);
  const [salesReport, setSalesReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

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
