import db from '../../../db';
import Availability from '../../../models/availabilityModel'; // Ensure correct path
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await db();
    
    // Fetch all fields relevant to the event
    const availabilities = await Availability.find(
      {}, 
      'name img_url available_date available_start_time available_end_time numSubscribers'
    );

    // Log the fetched availabilities to the console
    console.log('Fetched availabilities:', availabilities);

    // Return the fetched availabilities as a JSON response
    return NextResponse.json(availabilities);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
