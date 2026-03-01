"use client";

import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: "Your message is : " + input,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans text-gray-900">
      
      <header className="bg-green-400 p-4 shadow-sm flex justify-between items-center relative z-20">
        <div className="w-10"></div> 

        <h1 className="text-xl font-bold text-black">Line OA</h1>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
        >
          <svg 
            className="w-6 h-6 text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-30" 
              onClick={() => setIsMenuOpen(false)}
            ></div>
            
            <div className="absolute top-full right-4 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-40 overflow-hidden animate-in fade-in zoom-in duration-200">
              <ul className="text-sm">
                <li 
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors"
                  onClick={() => { alert("ไปหน้าโปรไฟล์"); setIsMenuOpen(false); }}
                >
                  ข้อมูลโปรไฟล์
                </li>
                <li 
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors"
                  onClick={() => { alert("ไปหน้าตั้งค่า"); setIsMenuOpen(false); }}
                >
                  การตั้งค่า
                </li>
                <li 
                  className="px-4 py-3 hover:bg-red-50 text-red-500 cursor-pointer transition-colors font-medium"
                  onClick={() => { alert("Logout"); setIsMenuOpen(false); }}
                >
                  ออกจากระบบ
                </li>
              </ul>
            </div>
          </>
        )}
      </header>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-white">
              <img 
                src={msg.sender === 'user' 
                  ? "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" 
                  : "https://rocket.in.th/wp-content/uploads/2023/03/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B-Line-Official-Account.png"
                } 
                alt={msg.sender} 
                className="w-full h-full object-cover"
              />
            </div>

            <div 
              className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-green-500 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form 
        onSubmit={handleSend}
        className="p-4 bg-white border-t border-gray-200 flex items-center gap-3 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2.5 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent px-5 transition-all"
        />
        <button 
          type="submit"
          className="bg-green-500 hover:bg-blue-600 active:scale-95 text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-md"
        >
          Send
        </button>
      </form>
    </div>
  );
}