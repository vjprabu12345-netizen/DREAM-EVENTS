import { NextResponse } from 'next/server';

let serverInquiries = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    inquiries: serverInquiries
  });
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newInq = {
      id: `INQ-${Date.now().toString().slice(-5)}`,
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
      createdAt: new Date().toISOString()
    };
    serverInquiries.unshift(newInq);
    return NextResponse.json({ success: true, inquiry: newInq }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
