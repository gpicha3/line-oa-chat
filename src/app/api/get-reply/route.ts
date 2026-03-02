import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const lastMsg = await kv.get('last_message');
    
    return NextResponse.json(lastMsg || { text: "" });
  } catch (error) {
    console.error("KV Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}