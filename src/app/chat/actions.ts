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
  const userId = formData.get('userId') as string;

  try {
    const adminMsg = JSON.stringify({ 
      id: Date.now(), 
      text: message, 
      sender: 'user',
      timestamp: new Date() 
    });
      if (!userId) return { status: 'error', msg: 'User not selected' };
      
      await client.pushMessage(userId, { type: 'text', text: message });
      
      await redis.rpush(`messages:${userId}`, adminMsg);
      
      return { status: 'success' };

  } catch (error) {
    console.error(error);
    return { status: 'error' };
  }
}