import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ApiService.getAllOrders();
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const updatedOrder = await ApiService.updateOrderStatus(orderId, status);
      // Update the orders list with the updated order
      setOrders(orders.map(order => (order.id === orderId ? updatedOrder : order)));
      alert(`Order ID: ${orderId} status updated to ${status}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status.");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="order-management">
      <h1>Order Management</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleUpdateOrderStatus(order.id, 'SHIPPED')}>
                  Update to Shipped
                </button>
                <button onClick={() => handleUpdateOrderStatus(order.id, 'DELIVERED')}>
                  Update to Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
