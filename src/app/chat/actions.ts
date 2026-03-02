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
  if (!message) return { status: 'error', msg: 'Please enter a message' };

  try {
    const lastMsgData = await redis.get('last_message');
    
    if (!lastMsgData) {
      return { status: 'error', msg: 'No recipient found. Please send a message from LINE first.' };
    }

    const parsedData = JSON.parse(lastMsgData);
    const userId = parsedData.userId;

    if (!userId) {
      return { status: 'error', msg: 'User ID not found' };
    }

    await client.pushMessage(userId, {
      type: 'text',
      text: message,
    });

    return { status: 'success', msg: 'Successfully sent' };
  } catch (error) {
    console.error("Send Message Error:", error);
    return { status: 'error', msg: "Internal server error" };
  }
}