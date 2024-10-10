// src/app/admin/components/OrderList.jsx

"use client";

import { useEffect, useState } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await fetch('/api/admin/orders');
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Order List</h2>
      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order._id} className="border p-2 rounded">
            <h3 className="font-semibold">Order ID: {order._id}</h3>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
