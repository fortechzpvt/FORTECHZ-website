// app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // This uses the environment variable you defined in next.config.ts
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://fortechz-website.onrender.com";

    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      return new NextResponse('Failed to send message', { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Connection failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
