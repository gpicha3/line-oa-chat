import Redis from 'ioredis';
import { NextResponse } from 'next/server';

const redis = new Redis(process.env.REDIS_URL || "");

export async function GET() {
  const userIds = await redis.smembers('chat_users');
  
  const usersWithProfiles = await Promise.all(userIds.map(async (id) => {
    const profileData = await redis.get(`user_profile:${id}`);
    const lastMsg = await redis.get(`last_msg:${id}`);
    
    const profile = profileData ? JSON.parse(profileData) : { displayName: id.substring(0, 10) };
    
    return { 
      id, 
      name: profile.displayName,
      picture: profile.pictureUrl,
      lastMessage: lastMsg || "" 
    };
  }));

  return NextResponse.json(usersWithProfiles);
}