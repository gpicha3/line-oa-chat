'use server'

import { Client } from '@line/bot-sdk';

const client = new Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
});

export async function sendMessage(formData: FormData) {
  const message = formData.get('message') as string;
  const userId = process.env.LINE_USER_ID || '';

  if (!message) return { status: 'error', };

  try {
    await client.pushMessage(userId, {
      type: 'text',
      text: message,
    });
    return { status: 'success', msg: 'Successfully' };
  } catch (error) {
    console.error(error);
    return { status: 'error', msg: "Error can't send message" };
  }
}