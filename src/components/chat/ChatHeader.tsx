"use client";

import { useState } from 'react';

interface ChatHeaderProps {
  title: string;
  isEnabled: boolean;
  setIsEnabled: (val: boolean) => void;
}

export const ChatHeader = ({ title, isEnabled, setIsEnabled }: ChatHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-green-400 p-4 shadow-sm flex justify-between items-center relative z-20">
      
      <div className="flex items-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
          />
          <img src={isEnabled ? "https://cdn-icons-png.flaticon.com/128/9019/9019234.png" : "https://cdn-icons-png.flaticon.com/128/1041/1041916.png"}
          className='w-9 h-9'/>
        </label>
      </div>

      <h1 className="text-xl font-bold text-black">{title}</h1>

      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 hover:bg-green-500/20 rounded-full transition-colors focus:outline-none"
      >
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute top-full right-4 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-40 overflow-hidden animate-in fade-in zoom-in duration-200">
            <ul className="text-sm">
              <li>
                <a 
                  href="https://lin.ee/BQLlYPE"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-2 transition-colors border-b border-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img 
                    src="https://rocket.in.th/wp-content/uploads/2023/03/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B-Line-Official-Account.png" 
                    className="w-9 h-9 object-cover rounded-full shadow-sm"
                    alt="Line Logo"
                  />
                  <span className="font-medium text-gray-700">Link to LineOA</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/gpicha3/line-oa-chat"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img 
                    src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png" 
                    className="w-9 h-9 object-cover rounded-full shadow-sm"
                    alt="Github Logo"
                  />
                  <span className="font-medium text-gray-700">Link to Github</span>
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
};