'use server'

import { Client } from '@line/bot-sdk';
import Redis from 'ioredis';

const client = new Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
});

const redis = new Redis(process.env.REDIS_URL || "");

export async function sendMessage(formData: FormData) {
  const message = formData.get('message') as string;
  const isBroadcast = formData.get('isBroadcast') === 'true'; 

  try {
    if (isBroadcast) {
      await client.broadcast({ type: 'text', text: message });
      return { status: 'success' };
    } else {
      const userId = await redis.get('current_user_id');
      if (!userId) return { status: 'error', msg: 'User not found' };
      
      await client.pushMessage(userId, { type: 'text', text: message });
      return { status: 'success' };
    }
  } catch (error) {
    return { status: 'error' };
  }
}