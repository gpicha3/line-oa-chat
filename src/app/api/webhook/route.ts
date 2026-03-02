export const dynamic = 'force-dynamic';
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const events = body.events;

  for (const event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      const replyText = event.message.text;
      
      await kv.set('last_message', {
        text: replyText,
        timestamp: Date.now()
      });
    }
  }
  return NextResponse.json({ status: 'ok' });
}