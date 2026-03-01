"use client";

import React, { useState } from 'react';

import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatMessageList } from '@/components/chat/ChatMessageList';
import { ChatInput } from '@/components/chat/ChatInput';
import { Message } from '@/types/message';
import { sendMessage } from './actions';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome to Chat With LineOA", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');


  async function handleSubmit(formData: FormData) {
    const text = formData.get('message') as string;
    if (!text.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);
    setInput('');

    const result = await sendMessage(formData);
    
    const botMsg: Message = { id: Date.now() + 1, text: result.msg || "Error something wrong" , sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
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