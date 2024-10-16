'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


const Orders = ({ userId }) => {
  const [orders, setOrders] = useState({ scheduled: [], completed: [] });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/profile/orders/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Orders</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-indigo-500">Scheduled Orders</h3>
          {orders.scheduled.map(order => (
            <div key={order._id} className="border p-4 rounded-md mb-2 bg-indigo-50">
           <p className="text-gray-700">Products: {order.orderProducts.map(product => (
                    <span key={product._id}>{product.name}</span> 
                  ))}</p>
              <p className="text-gray-700">Total Price: ${order.totalPrice}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-indigo-500">Completed Orders</h3>
          {orders.completed.map(order => (
            <div key={order._id} className="border p-4 rounded-md mb-2 bg-indigo-50">
              
              <p className="text-gray-700">Products: {order.orderProducts.map(product => (
                    <span key={product._id}>{product.name}</span> 
                  ))}</p>
              <p className="text-gray-700">Total Price: ${order.totalPrice}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Orders;