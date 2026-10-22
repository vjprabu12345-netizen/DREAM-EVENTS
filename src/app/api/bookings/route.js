import { NextResponse } from 'next/server';
import { INITIAL_SAMPLE_BOOKINGS } from '../../../data/siteData';

// In-memory fallback for API simulation
let serverBookings = [...INITIAL_SAMPLE_BOOKINGS];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: serverBookings.length,
    bookings: serverBookings
  });
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Generate Booking Reference
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: `DE-2026-${randomNum}`,
      customerName: data.customerName || data.name || 'Valued Client',
      phone: data.phone || '',
      email: data.email || '',
      eventType: data.eventType || 'Celebration',
      eventDate: data.eventDate || data.date || '',
      eventLocation: data.eventLocation || data.location || 'Villupuram / Nearby',
      guestCount: Number(data.guestCount || data.guests || 250),
      services: Array.isArray(data.services) ? data.services : [data.services || 'Signature Package'],
      notes: data.notes || '',
      estimatedTotal: data.estimatedTotal || 'Custom Quote',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    serverBookings.unshift(newBooking);

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      booking: newBooking
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to process booking',
      error: error.message
    }, { status: 400 });
  }
}
