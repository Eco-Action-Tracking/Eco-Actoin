import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../db";
import Order from "../../../models/orderModel";
import Payment from "../../../models/paymentModel";

export async function POST(request) {
  try {
    await dbConnect();

    // Get the token from cookies
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const {
      orderProducts,
      totalPrice,
      deliveryAddress,
      paymentIntentId,
      userDiscount,
    } = await request.json();

    // Create payment record
    const payment = await Payment.create({
      user_id: decoded.id,
      value: totalPrice,
      userDiscount: userDiscount || [], // Use the provided discount or an empty array
    });

    // Create order record
    const order = await Order.create({
      userId: decoded.id,
      orderProducts: orderProducts.map((product) => product.productId),
      totalPrice,
      deliveryAddress,
      paymentId: payment._id,
      status: "pending",
    });

    // Update the payment record with the order_id
    await Payment.findByIdAndUpdate(payment._id, { order_id: order._id });

    return NextResponse.json({ order, payment }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Error creating order", error: error.message },
      { status: 500 }
    );
  }
}
