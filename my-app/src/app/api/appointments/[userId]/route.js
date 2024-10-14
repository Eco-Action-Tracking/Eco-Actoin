// // app/api/appointments/[userId]/route.js
// import connectDB from "../../../../db";
// import Appointment from "../../../../models/appointmentModel";
// import Availability from "../../../../models/availabilityModel";
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken"; // إضافة هذا للاستيراد

// export async function POST(request, { params }) {
//   await connectDB();
  
//   const { available_id } = await request.json();
//   console.log("Params userId:", params.userId); // إضافة سطر لتتبع userId
//   console.log("Available ID:", available_id); // إضافة سطر لتتبع available_id
//   try {
//     const token = request.cookies.get("token")?.value; // الحصول على التوكن من الكوكيز
//     if (!token) {
//       return NextResponse.json({ error: "No token provided" }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // فك تشفير التوكن
//     console.log(decoded.userId); // تأكد من أن لديك userId هنا

//     // Check if availability exists
//     const availability = await Availability.findById(available_id);
//     if (!availability) {
//       return NextResponse.json(
//         { error: "Availability not found" },
//         { status: 404 }
//       );
//     }

//     // Create a new appointment
//     const newAppointment = new Appointment({
//       available_id,
//       user_id: decoded.userId, // استخدم userId من التوكن
//     });

//     const savedAppointment = await newAppointment.save();

//     return NextResponse.json(savedAppointment, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }



// app/api/appointments/[userId]/route.js

// app/api/appointments/[userId]/route.js

import connectDB from "../../../../db";
import Appointment from "../../../../models/appointmentModel";
import Availability from "../../../../models/availabilityModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  const { available_id } = await request.json();

  // الحصول على userId من ترويسة الطلب
  const userId = request.headers.get("userId");
  console.log("Params userId:", userId); // إضافة هذا السطر لتأكيد وجود userId
  console.log("Available ID:", available_id);

  if (!userId) {
    return NextResponse.json({ error: "User ID not found" }, { status: 400 });
  }

  try {
    // Check if availability exists
    const availability = await Availability.findById(available_id);
    if (!availability) {
      return NextResponse.json(
        { error: "Availability not found" },
        { status: 404 }
      );
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      available_id,
      user_id: userId, // استخدم userId الذي استخرجته من الترويسة
    });

    const savedAppointment = await newAppointment.save();

    return NextResponse.json(savedAppointment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
