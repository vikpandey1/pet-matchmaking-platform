'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Sample match data (would come from API in real implementation)
const getSampleMatch = (id: string) => ({
  id,
  petName: 'Luna',
  petImage: '/placeholder-dog-2.jpg',
  breed: 'Border Collie',
  age: 2,
  matchScore: 95,
  matchDate: '2023-10-12T14:30:00',
  status: 'accepted',
  ownerName: 'Alex Smith',
  ownerImage: '/placeholder-owner.jpg',
  messages: [
    {
      id: '1',
      senderId: 'them',
      text: 'Hi there! Luna seems like a great match for my Max!',
      timestamp: '2023-10-12T15:10:00',
    },
    {
      id: '2',
      senderId: 'you',
      text: 'Hi Alex! Yes, they look very compatible. Max is adorable!',
      timestamp: '2023-10-12T15:15:00',
    },
    {
      id: '3',
      senderId: 'them',
      text: 'Would you be interested in scheduling a playdate at the Central Park dog area sometime this weekend?',
      timestamp: '2023-10-12T15:20:00',
    },
    {
      id: '4',
      senderId: 'you',
      text: 'That sounds great! How about Saturday around 2pm?',
      timestamp: '2023-10-12T15:25:00',
    },
    {
      id: '5',
      senderId: 'them',
      text: 'Perfect! Luna loves to play fetch with other dogs. Does Max have any favorite activities?',
      timestamp: '2023-10-12T15:30:00',
    },
  ],
});

export default function MatchChatPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params.id as string;
  
  const [match, setMatch] = useState(getSampleMatch(matchId));
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [match.messages]);
  
  // Send a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: `${match.messages.length + 1}`,
      senderId: 'you',
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };
    
    setMatch(prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
    
    setNewMessage('');
  };
  
  // Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-neutral-50">
      {/* Chat header */}
      <div className="bg-white shadow-sm border-b border-neutral-200 px-4 py-3 flex items-center">
        <Link 
          href="/matches/history"
          className="mr-4 text-neutral-500 hover:text-neutral-700"
        >
          ←
        </Link>
        
        <div className="flex-shrink-0 relative h-10 w-10 rounded-full overflow-hidden">
          <Image
            src={match.petImage}
            alt={match.petName}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        
        <div className="ml-3">
          <h2 className="font-medium">{match.petName}</h2>
          <p className="text-xs text-neutral-500">
            {match.ownerName} • {match.matchScore}% Match
          </p>
        </div>
        
        <div className="ml-auto flex space-x-4">
          <button className="text-neutral-500 hover:text-primary-600">
            📅
          </button>
          <button className="text-neutral-500 hover:text-primary-600">
            ℹ️
          </button>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {match.messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.senderId === 'you' ? 'justify-end' : 'justify-start'}`}
          >
            {message.senderId !== 'you' && (
              <div className="flex-shrink-0 relative h-8 w-8 rounded-full overflow-hidden mr-2 mt-1">
                <Image
                  src={match.ownerImage}
                  alt={match.ownerName}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="max-w-[70%]">
              <div 
                className={`px-4 py-2 rounded-2xl text-sm ${
                  message.senderId === 'you' 
                    ? 'bg-primary-500 text-white rounded-tr-none'
                    : 'bg-white shadow-sm border border-neutral-200 rounded-tl-none'
                }`}
              >
                {message.text}
              </div>
              <div 
                className={`text-xs mt-1 text-neutral-500 ${
                  message.senderId === 'you' ? 'text-right mr-1' : 'ml-1'
                }`}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="bg-white border-t border-neutral-200 p-3">
        <div className="flex items-end space-x-2">
          <button className="text-neutral-500 hover:text-primary-600 mb-2">
            📷
          </button>
          <div className="flex-1 bg-neutral-100 rounded-2xl overflow-hidden">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full border-none bg-transparent px-4 py-3 resize-none focus:ring-0 text-sm"
              rows={1}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`rounded-full p-2 ${
              newMessage.trim() 
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-200 text-neutral-400'
            }`}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
} 