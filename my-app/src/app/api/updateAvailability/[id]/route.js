// // app/api/updateAvailability/[id]/route.js
// import connectDB from '../../../../db';
// import Availability from '../../../../models/availabilityModel';
// import { NextResponse } from 'next/server';

// export async function PUT(request, { params }) {
//   await connectDB();
//   const { id } = params;

//   try {
//     const availability = await Availability.findById(id);
//     if (!availability) {
//       return NextResponse.json({ error: 'Event not found' }, { status: 404 });
//     }

//     if (availability.numSubscribers > 0) {
//       availability.numSubscribers -= 1;
//     }

//     const updatedAvailability = await availability.save();
//     return NextResponse.json(updatedAvailability);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
// app/api/updateAvailability/[id]/route.js
import connectDB from '../../../../db';
import Availability from '../../../../models/availabilityModel';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // إضافة هذا للاستيراد

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const token = request.cookies.get("token")?.value; // الحصول على التوكن من الكوكيز
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // فك تشفير التوكن

    const availability = await Availability.findById(id);
    if (!availability) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // تقليل عدد المشتركين إذا كان أكبر من 0
    if (availability.numSubscribers > 0) {
      availability.numSubscribers -= 1;
    }

    const updatedAvailability = await availability.save();
    return NextResponse.json(updatedAvailability);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
