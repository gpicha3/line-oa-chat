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
  const userId = formData.get('userId') as string; // รับ userId จาก client

  try {
    const adminMsg = JSON.stringify({ 
      id: Date.now(), 
      text: message, 
      sender: 'user', // ในมุมมอง Dashboard admin คือ user
      timestamp: new Date() 
    });

    if (isBroadcast) {
      await client.broadcast({ type: 'text', text: message });
      // บรอดแคสต์อาจจะไม่ต้องบันทึกลงแชทรายคน หรือวนลูปบันทึกก็ได้
      return { status: 'success' };
    } else {
      if (!userId) return { status: 'error', msg: 'User not selected' };
      
      // 1. ส่งเข้า LINE
      await client.pushMessage(userId, { type: 'text', text: message });
      
      // 2. บันทึกลง Redis ของ User คนนั้น
      await redis.rpush(`messages:${userId}`, adminMsg);
      
      return { status: 'success' };
    }
  } catch (error) {
    console.error(error);
    return { status: 'error' };
  }
}