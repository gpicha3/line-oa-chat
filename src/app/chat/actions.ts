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
  const lastMsgData = await redis.get('last_message');
  const { userId } = JSON.parse(lastMsgData || "");

  if (!message) return { status: 'error', };

  try {
    await client.pushMessage(userId, {
      type: 'text',
      text: message,
    });
    //For everyone test
    // await client.broadcast({
    //   type: 'text',
    //   text: message
    // });
    return { status: 'success', msg: 'Successfully' };
  } catch (error) {
    console.error(error);
    return { status: 'error', msg: "Error can't send message" };
  }
}