import { NextResponse } from 'next/server';
import connectDB from '../../../../db'; // Ensure this is the correct path to your DB connection
import Product from '@/models/productsModel'; // Ensure this is the correct path to your Product model

// POST request to create a new product
export async function POST(request) {
  try {
    // Connect to the database
    await connectDB();
    
    // Parse the request body
    const body = await request.json();

    // Create a new product instance with the provided data
    const newProduct = new Product(body);
    
    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Return a successful response with the saved product data
    return NextResponse.json({ success: true, data: savedProduct }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    // Return an error response with the error message
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
