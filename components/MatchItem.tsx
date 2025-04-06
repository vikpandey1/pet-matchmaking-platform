'use client';

import Link from 'next/link';

type MatchItemProps = {
  match: {
    id: string;
    petName: string;
    matchedWith?: string;
    date?: string;
    status?: string;
    matchDate?: string;
    lastMessage?: string;
  };
};

export default function MatchItem({ match }: MatchItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div>
          <div className="font-medium">
            {match.petName} {match.matchedWith ? `& ${match.matchedWith}` : ''}
          </div>
          <div className="text-sm text-gray-500">Match ID: {match.id}</div>
          {match.lastMessage && (
            <div className="text-sm text-gray-600 mt-1">"{match.lastMessage}"</div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-500">
          {match.date || match.matchDate?.substring(0, 10) || 'No date'}
        </div>
        
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          match.status === 'active' || match.status === 'accepted'
            ? 'bg-green-100 text-green-800' 
            : match.status === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {match.status || 'Unknown'}
        </span>
        
        <Link 
          href={`/messages?matchId=${match.id}`}
          className="text-blue-500 hover:underline"
        >
          Message
        </Link>
      </div>
    </div>
  );
} 