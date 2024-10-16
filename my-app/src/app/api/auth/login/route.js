// import connectDB from "../../../../db";
// import User from "../../../../models/users";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// connectDB();

// export async function POST(req) {
//   const { email, password } = await req.json();

//   try {
//     const user = await User.findOne({
//       email,
//       isDeleted: false,
//       isActive: true,
//     });
//     if (!user) {
//       return new Response(
//         JSON.stringify({ message: "Invalid credentials or account disabled" }),
//         { status: 401 }
//       );
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return new Response(JSON.stringify({ message: "Invalid credentials" }), {
//         status: 401,
//       });
//     }
//     const v = process.env.JWT_SECRET || "omar";
//     const token = jwt.sign({ id: user._id }, v, { expiresIn: "1h" });
//     console.log("messi");
//     return new Response(JSON.stringify({ token }), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: "Error logging in" }), {
//       status: 500,
//     });
//   }
// }








// import connectDB from '../../../../db';
// import User from '../../../../models/users';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// connectDB();

// export async function POST(req) {
//   const { email, password } = await req.json();

//   try {
//     const user = await User.findOne({ email, isDeleted: false, isActive: true });
//     if (!user) {
//       return new Response(JSON.stringify({ message: 'Invalid credentials or account disabled' }), { status: 401 });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
//     }
//     const v = process.env.JWT_SECRET || "omar";
//     const token = jwt.sign({ id: user._id }, v , { expiresIn: '1h' });
//     console.log("messi");
//     return new Response(JSON.stringify({ token }), { status: 200 });
 
//   } catch (error) {
//     return new Response(JSON.stringify({ message: 'Error logging in' }), { status: 500 });
//   }
// }










 
import { NextResponse } from 'next/server';
import connectDB from '../../../../db';
import User from '../../../../models/users'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';// لتحويل الكوكي إلى سلسلة نصية

export async function POST(req) {//لمعالجة طلب تسجيل الدخول
  console.log('Login route hit');
  await connectDB();

  const { email, password } = await req.json();
  console.log('Login attempt for email:', email);

  try {//تحقق من وجود المستخدم 
    const user = await User.findOne({ email, isDeleted: false, isActive: true });
    if (!user) {
      console.log('User not found or inactive');
      return NextResponse.json({ message: 'Invalid credentials or account disabled' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);//مقارنة كلمة المرور المُدخلة مع كلمة المرور المُشفرة
    if (!isMatch) {
      console.log('Password mismatch');
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    console.log('Login successful, generating token');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });// ينشاء توكن بستخدام معرف المستخدم ويتخزن بتوكن

    const serialized = serialize('token', token, {//يكول لتوكن لكوكي
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
      maxAge: 3600, // مدة صلاحية الكوكي (3600 ثانية = 1 ساعة)
      path: '/', // الكوكي متاحة في جميع المسارات
    });

    console.log('Token serialized');
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });//تم تجهيز الكوكي
    response.headers.set('Set-Cookie', serialized);//يتم تعيين الكوكي في رأس الاستجابة (لتخزين التوكن على جانب العميل).

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Error logging in' }, { status: 500 });
  }
} 