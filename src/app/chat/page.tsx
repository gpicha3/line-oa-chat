"use client";

import React, { useEffect, useState } from 'react';

import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatMessageList } from '@/components/chat/ChatMessageList';
import { ChatInput } from '@/components/chat/ChatInput';
import { Message } from '@/types/message';
import { sendMessage } from './actions';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/get-reply', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        const data = await res.json();
        
        if (data && data.text) {
          setMessages(prev => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg?.text === data.text && lastMsg?.sender === 'bot') {
              return prev;
            }
            
            return [...prev, { 
              id: Date.now(), 
              text: data.text, 
              sender: 'bot' 
            }];
          });
        }
      } catch (err) {
        console.error(err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(formData: FormData) {
    const text = formData.get('message') as string;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);
    setInput('');

    await sendMessage(formData);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <ChatHeader title="Line OA" />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <ChatMessageList messages={messages} />
      </div>

      <ChatInput input={input} setInput={setInput} onSend={handleSubmit} />
    </div>
  );
}