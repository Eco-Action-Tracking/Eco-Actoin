
import Product from '../../../../models/productsModel';
import User from '../../../../models/users';
import Payment from '../../../../models/paymentModel';

import { NextResponse } from 'next/server'; 
import Order from '../../../../models/orderModel'; 
import db from '../../../../db';

// Connect to the database
db();

export async function GET(request) {
  try {
    // Fetch all orders with populated fields
    const orders = await Order.find()
      .populate('orderProducts') // Populate the products associated with the order
      .populate('userId')        // Populate the user information
      .populate('paymentId');    // Populate the payment information
    
    return NextResponse.json(orders); // Return orders in JSON format
  } catch (error) {
    console.error('Error fetching orders:', error); // Log the error for debugging
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 }); // Return error response
  }
}

export async function PUT(request) {
  const { id } = request.nextUrl.pathname.split('/').pop(); // Extract the ID from the URL
  const orderData = await request.json(); // Get the new order data from the request body

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      orderData,
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(updatedOrder); // Return the updated order
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
