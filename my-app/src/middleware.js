import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from './models/users';
import connectDB from './db';

export async function middleware(req) {
  const token = req.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Connect to DB
    await connectDB();

    // Check if user is active and not deleted
    const user = await User.findById(decoded.id);
    if (!user || user.isDeleted || !user.isActive) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/profile/:path*'],
};
