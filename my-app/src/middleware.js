
// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose"; // مكتبة jose للتحقق من JWT

// export async function middleware(request) {
//   console.log("Middleware executing");

//   // استخراج الكوكي الخاصة بالرمز
//   const token = request.cookies.get("token")?.value;
//   console.log("Token from cookies:", token);

//   // إذا لم يكن هناك رمز JWT، قم بتوجيه المستخدم إلى صفحة تسجيل الدخول
//   if (!token) {
//     console.log("No token found, redirecting to login");
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   try {
//     console.log("Attempting to verify token");

//     // التحقق من صحة الرمز باستخدام مكتبة jose
//     const { payload } = await jwtVerify(
//       token,
//       new TextEncoder().encode(process.env.JWT_SECRET)
//     );

//     // عرض المحتوى المشفر من الـ JWT
//     console.log("Token verified, payload:", payload);

//     // السماح بالمرور إلى الصفحة المطلوبة إذا كان الرمز صالحاً
//     const response = NextResponse.next();

//     // إضافة بيانات المستخدم إلى ترويسة الرد
//     response.headers.set("user", JSON.stringify(payload));
//     return response;
//   } catch (error) {
//     // في حالة فشل التحقق، يتم توجيه المستخدم إلى صفحة تسجيل الدخول
//     console.error("Token verification failed:", error);
//     return NextResponse.redirect(new URL("/login", request.url));

//   }
// }
// middleware.js
// middleware.js

import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // مكتبة jose للتحقق من JWT

export async function middleware(request) {
  console.log("Middleware executing");

  // استخراج الكوكي الخاصة بالرمز
  const token = request.cookies.get("token")?.value;
  console.log("Token from cookies:", token);

  // إذا لم يكن هناك رمز JWT، قم بتوجيه المستخدم إلى صفحة تسجيل الدخول
  if (!token) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    console.log("Attempting to verify token");

    // التحقق من صحة الرمز باستخدام مكتبة jose
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    // عرض المحتوى المشفر من الـ JWT
    console.log("Token verified, payload:", payload);

    // السماح بالمرور إلى الصفحة المطلوبة إذا كان الرمز صالحاً
    const response = NextResponse.next();

    // إضافة userId إلى ترويسة الطلب
    response.headers.set("userId", payload.id); // تأكد من استخدام 'id' بدلاً من 'userId'
    return response;
  } catch (error) {
    // في حالة فشل التحقق، يتم توجيه المستخدم إلى صفحة تسجيل الدخول
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// تحديد المسارات التي يتم تطبيق الـ middleware عليها
export const config = {
  matcher: [

    "/profile/:path*", // مسار الملف الشخصي
    "/api/user/:path*", // مسارات API المتعلقة بالمستخدم
    "/api/orders/:path*", // مسارات API الخاصة بالطلبات
    "/api/appointments/:path*", // مسارات API الخاصة بالمواعيد
    "/api/discounts/:path*", // مسارات API الخاصة بالخصومات

  ],
};
