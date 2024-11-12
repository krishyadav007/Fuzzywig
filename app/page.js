import Link from 'next/link';
import { Search, Settings } from 'lucide-react';

const mockChats = [
  { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '10:30 AM', unread: 2 },
  { id: 2, name: 'Jane Smith', lastMessage: 'See you tomorrow!', time: '9:15 AM', unread: 0 },
  { id: 3, name: 'Team Alpha', lastMessage: 'Meeting at 3 PM', time: 'Yesterday', unread: 5 }
];

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-indigo-200 shadow">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Chats</h1>
          <Link href="/settings" className="p-2">
            <Settings size={24} />
          </Link>
        </div>
        {/* <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full p-2 pl-10 rounded-lg bg-gray-100"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div> */}
      </div>
      
      <div className="flex-1 overflow-y-auto">
      <Link
            key="new_id"
            href="/chat/new"
            className="p-4 border-b flex items-center hover:bg-gray-50 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white">
              +
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <h2 className="font-semibold">Create new bot</h2>
                <span className="text-sm text-gray-500">Less go</span>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600 text-sm truncate">Add documents and make your own SOP</p>
                {1> 0 && (
                  <span className="bg-blue-500 text-white rounded-full px-2 text-xs">
                    1
                  </span>
                )}
              </div>
            </div>
          </Link>
        {mockChats.map(chat => (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            className="p-4 border-b flex items-center hover:bg-gray-50 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {chat.name.charAt(0)}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <h2 className="font-semibold">{chat.name}</h2>
                <span className="text-sm text-gray-500">{chat.time}</span>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600 text-sm truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="bg-blue-500 text-white rounded-full px-2 text-xs">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}