import Redis from 'ioredis';
import { NextResponse } from 'next/server';

const redis = new Redis(process.env.REDIS_URL || "");

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await redis.get('last_message');
    
    if (!data) {
      return NextResponse.json({ text: "" });
    }

    return NextResponse.json(JSON.parse(data));
  } catch (error: any) {
    console.error("Redis Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}