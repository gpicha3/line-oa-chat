import Redis from 'ioredis';
import { NextResponse } from 'next/server';

const redis = new Redis(process.env.REDIS_URL || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const events = body.events;

    for (const event of events) {
      if (event.type === 'message' && event.message.type === 'text') {
        const replyText = event.message.text;
        
        await redis.set('last_message', JSON.stringify({
          text: replyText,
          timestamp: Date.now()
        }));
      }
    }
    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}