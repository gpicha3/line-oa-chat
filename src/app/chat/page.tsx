"use client";

import React, { useEffect, useState } from 'react';

import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatMessageList } from '@/components/chat/ChatMessageList';
import { ChatInput } from '@/components/chat/ChatInput';
import { Message } from '@/types/message';
import { sendMessage } from './actions';
import { ChatSidebar } from '@/components/chat/ChatSidebar';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
       const res = await fetch('/api/get-users');
       const data = await res.json();
       setUsers(data);
    };
    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;
    
    const fetchMessages = async () => {
      const res = await fetch(`/api/get-messages?userId=${selectedUserId}`);
      const data = await res.json();
      setMessages(data);
    };
    
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [selectedUserId]);

  async function handleSubmit(formData: FormData) {
  const text = formData.get('message') as string;
  if (!text.trim() || !selectedUserId) return;

  formData.append('userId', selectedUserId);

  setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);
  setInput('');

  await sendMessage(formData);
}

  return (
    <div className="flex h-screen bg-gray-100 font-sans">

      <ChatSidebar 
        users={users} 
        activeUser={selectedUserId} 
        onSelectUser={setSelectedUserId} 
      />


      <div className="flex-1 flex flex-col">
        {selectedUserId ? (
          <>
            <ChatHeader title={`Chat: ${selectedUserId.substring(0,8)}`} />
            <div className="flex-1 overflow-y-auto p-4"><ChatMessageList messages={messages} /></div>
            <ChatInput 
              input={input}
              setInput={setInput}
              onSend={handleSubmit} 
              disabled={!selectedUserId} 
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}