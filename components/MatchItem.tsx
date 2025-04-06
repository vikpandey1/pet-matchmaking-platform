'use client';

import Image from 'next/image';
import Link from 'next/link';

interface MatchItemProps {
  match: {
    id: string;
    petName: string;
    petImage: string;
    breed: string;
    age: number;
    matchScore: number;
    matchDate: string;
    status: 'pending' | 'accepted' | 'rejected' | 'completed';
    lastMessage?: string;
  };
}

export default function MatchItem({ match }: MatchItemProps) {
  const statusColors = {
    pending: 'bg-warning-100 text-warning-800',
    accepted: 'bg-success-100 text-success-800',
    rejected: 'bg-error-100 text-error-800',
    completed: 'bg-neutral-100 text-neutral-800',
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-xl shadow-soft-xl mb-4 hover:shadow-soft-2xl transition-shadow">
      <div className="flex-shrink-0 relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary-100">
        <Image
          src={match.petImage}
          alt={match.petName}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg truncate">{match.petName}</h3>
            <p className="text-sm text-neutral-600">
              {match.breed} • {match.age} {match.age === 1 ? 'year' : 'years'} old
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[match.status]}`}>
              {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              {new Date(match.matchDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        {match.lastMessage && (
          <p className="mt-1 text-sm text-neutral-600 truncate">
            {match.lastMessage}
          </p>
        )}
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-sm font-medium text-primary-600">
              {match.matchScore}% Match
            </div>
          </div>
          
          <div className="flex space-x-2">
            {match.status === 'pending' && (
              <>
                <button className="btn-sm btn-outline border-error-400 text-error-500 hover:bg-error-50">
                  Reject
                </button>
                <button className="btn-sm btn-primary">
                  Accept
                </button>
              </>
            )}
            
            {match.status !== 'rejected' && (
              <Link 
                href={`/matches/chat/${match.id}`}
                className="btn-sm btn-outline"
              >
                <span className="mr-1">💬</span> Chat
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 