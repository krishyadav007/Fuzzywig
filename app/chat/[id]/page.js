'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MoreVertical, Send } from 'lucide-react';
import Link from 'next/link'

const mockMessages = [
  { id: 1, text: 'Hey, how are you?', sender: 'other', time: '10:30 AM' },
  { id: 2, text: 'I\'m good, thanks! How about you?', sender: 'me', time: '10:31 AM' },
  { id: 3, text: 'Pretty good! Want to grab lunch?', sender: 'other', time: '10:32 AM' }
];

export default function ChatPage({ params }) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  
  // Mock chat data - in real app, fetch based on params.id
  const currentChat = {
    id: params.id,
    name: 'John Doe',
    status: 'Online'
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-2 bg-indigo-200 shadow flex items-center">
        <button onClick={() => router.push('/')} className="mr-2">
          <ArrowLeft size={24} />
        </button>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
          {currentChat.name.charAt(0)}
        </div>
        <div className="ml-3 flex-1">
          <h2 className="font-semibold">{currentChat.name}</h2>
          <p className="text-sm text-gray-500">{currentChat.status}</p>
        </div>
        <button>
        <Link href={`/chat/${params.id}/settings`} className="p-2">
          <MoreVertical size={24} />
          </Link>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {mockMessages.map(message => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-lg p-3 ${
                message.sender === 'me'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 rounded-lg bg-gray-100 focus:outline-none"
          />
          <button className="ml-2 p-2 bg-blue-500 rounded-full text-white">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}