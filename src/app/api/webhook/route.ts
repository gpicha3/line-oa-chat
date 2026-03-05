import Redis from 'ioredis';
import { NextResponse } from 'next/server';
import { Client } from '@line/bot-sdk';

const redis = new Redis(process.env.REDIS_URL || "");

const client = new Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const event = body.events[0];

    if (event?.type === 'message') {
      const userId = event.source.userId;
      
      let displayName = "Unknown User";
      let pictureUrl = "";
      
      try {
        const profile = await client.getProfile(userId);
        displayName = profile.displayName;
        pictureUrl = profile.pictureUrl || "";
        
        await redis.set(`user_profile:${userId}`, JSON.stringify({
          displayName,
          pictureUrl
        }));
      } catch (e) {
        console.error("Cannot fetch profile:", e);
      }

      await redis.sadd('chat_users', userId);
      await redis.set(`last_msg:${userId}`, event.message.text);
      
      const newMessage = { id: Date.now(), text: event.message.text, sender: 'bot' };
      await redis.rpush(`messages:${userId}`, JSON.stringify(newMessage));
    }
    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}