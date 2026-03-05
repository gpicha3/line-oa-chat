import Redis from 'ioredis';
import { NextResponse } from 'next/server';

const redis = new Redis(process.env.REDIS_URL || "");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json([]);

  try {
    const rawMessages = await redis.lrange(`messages:${userId}`, 0, -1);
    const messages = rawMessages.map(m => JSON.parse(m));

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json([]);
  }
}