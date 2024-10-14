// app/api/availableEvents/route.js

import db from '../../../db';
import Availability from '../../../models/availabilityModel'; // تأكد من المسار الصحيح
import { NextResponse } from 'next/server';
export async function GET() {
    try {
      await db();
      const availabilities = await Availability.find();
      // console.log('Fetched availabilities:', availabilities); // Add this line
      return NextResponse.json(availabilities);
    } catch (error) {
      console.error('API route error:', error); // Add this line
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }