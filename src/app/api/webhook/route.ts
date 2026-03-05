import Redis from 'ioredis';
import { NextResponse } from 'next/server';

const redis = new Redis(process.env.REDIS_URL || "");

export async function POST(req: Request) {
  const body = await req.json();
  const event = body.events[0];

  if (event?.type === 'message') {
    const userId = event.source.userId;
    const text = event.message.text;

    const newMessage = { id: Date.now(), text, sender: 'bot', timestamp: new Date() };

    await redis.sadd('chat_users', userId); 
    
    await redis.rpush(`messages:${userId}`, JSON.stringify(newMessage));
    
    await redis.set(`last_msg:${userId}`, text);
  }
  return NextResponse.json({ status: 'ok' });
}