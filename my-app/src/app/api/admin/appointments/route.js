import Availability from '../../../../models/availabilityModel';
import db from '../../../../db';
import { NextResponse } from 'next/server';

db();

export async function GET() {
  try {
    const availabilities = await Availability.find();
    return NextResponse.json(availabilities);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, available_date, available_start_time, available_end_time, img_url, numSubscribers } = await req.json();

    if (!name || !available_date || !available_start_time || !available_end_time) {
      return NextResponse.json({ error: 'name, available_date, available_start_time, and available_end_time are required.' }, { status: 400 });
    }

    const availability = new Availability({ 
      name,
      available_date, 
      available_start_time, 
      available_end_time, 
      img_url,
      numSubscribers 
    });

    await availability.save();
    return NextResponse.json(availability, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
