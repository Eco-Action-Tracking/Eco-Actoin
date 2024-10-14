// import { NextResponse } from 'next/server';
// import connectDB from '../../../../../db';
// import Order from '../../../../../models/orderModel';
// // import Product from '../../../../../models/orderModel'
// import jwt from 'jsonwebtoken';

// export async function GET(request, { params }) {
//   await connectDB();

//   // جلب التوكين من الكوكيز
//   const token = request.cookies.get('token')?.value;
//   if (!token) {
//     return NextResponse.json({ error: 'No token provided' }, { status: 401 });
//   }

//   try {
//     // التحقق من التوكين
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.id !== params.userId) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
//     }

//     // جلب الطلبات بناءً على userId
// //     const orders = await Order.find({ userId: params.userId });
  
// // console.log(orders)
// // const product = await Product.findById('6707c62ce4679ff9289deb91');
// // console.log(product);
// // console.log(typeof orders[0].orderProducts[0]); // تأكد من أن المعرف ObjectId وليس String
// const orders = await Order.find({ userId: params.userId });
// // const productIds = orders[0].orderProducts; 
// // console.log(productIds)
// // const products = await Product.find({ _id: { $in: productIds } });

// // console.log(products); // طباعة المنتجات المرتبطة يدويًا

//     const scheduledOrders = orders.filter(order => order.status === 'pending');
//     const completedOrders = orders.filter(order => order.status === 'completed');

//     // إرجاع البيانات
//     return NextResponse.json({ scheduled: scheduledOrders, completed: completedOrders });
//   } catch (error) {
//     return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
//   }
// }

// import { NextResponse } from 'next/server';
// import connectDB from '../../../../../db';
// import Order from '../../../../../models/orderModel';
// import jwt from 'jsonwebtoken';

// export async function GET(request, { params }) {
//   await connectDB();
  
//   // جلب التوكين من الكوكيز
//   const token = request.cookies.get('token')?.value;
//   if (!token) {
//     return NextResponse.json({ error: 'No token provided' }, { status: 401 });
//   }

//   try {
//     // التحقق من التوكين
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.id !== params.userId) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
//     }

//     // جلب الطلبات بناءً على userId مع populate لعرض أسماء المنتجات
//     const orders = await Order.find({ userId: params.userId }).populate('orderProducts', 'name');
//     const scheduledOrders = orders.filter(order => order.status === 'pending');
//     const completedOrders = orders.filter(order => order.status === 'completed');

//     // إرجاع البيانات
//     return NextResponse.json({ scheduled: scheduledOrders, completed: completedOrders });
//   } catch (error) {
//     return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
//   }
// }




import { NextResponse } from 'next/server';
import connectDB from '../../../../../db';
import Order from '../../../../../models/orderModel';
import Product from '../../../../../models/productsModel'
import jwt from 'jsonwebtoken';

export async function GET(request, { params }) {
  await connectDB();
  
  // جلب التوكين من الكوكيز
  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    // التحقق من التوكين
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id !== params.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // جلب الطلبات بناءً على userId مع ملء بيانات المنتجات
    const orders = await Order.find({ userId: params.userId })
      .populate('orderProducts', 'name');

    const scheduledOrders = orders.filter(order => order.status === 'pending');
    const completedOrders = orders.filter(order => order.status === 'completed');

    // إرجاع البيانات
    return NextResponse.json({ scheduled: scheduledOrders, completed: completedOrders });
  } catch (error) {
    console.error('Error verifying token or fetching orders:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
