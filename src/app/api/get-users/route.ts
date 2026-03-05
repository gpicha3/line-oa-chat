import Redis from 'ioredis';
import { NextResponse } from 'next/server';

const redis = new Redis(process.env.REDIS_URL || "");

export async function GET() {
  try {
    const userIds = await redis.smembers('chat_users');
    
    const usersWithLastMsg = await Promise.all(userIds.map(async (id) => {
      const lastMsg = await redis.get(`last_msg:${id}`);
      return { id, lastMessage: lastMsg || "" };
    }));

    return NextResponse.json(usersWithLastMsg);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}