'use client';

import { useState } from 'react';
import Link from 'next/link';
import MatchItem from '@/components/MatchItem';

// Sample match history data (would be fetched from the API in a real app)
const sampleMatchHistory = [
  {
    id: '101',
    petName: 'Luna',
    petImage: '/placeholder-dog-2.jpg',
    breed: 'Border Collie',
    age: 2,
    matchScore: 95,
    matchDate: '2023-10-12T14:30:00',
    status: 'accepted',
    lastMessage: 'Should we meet at the dog park this weekend?',
  },
  {
    id: '102',
    petName: 'Rocky',
    petImage: '/placeholder-dog-3.jpg',
    breed: 'German Shepherd',
    age: 4,
    matchScore: 88,
    matchDate: '2023-10-10T09:15:00',
    status: 'pending',
  },
  {
    id: '103',
    petName: 'Bella',
    petImage: '/placeholder-dog-4.jpg',
    breed: 'Labrador Retriever',
    age: 1,
    matchScore: 82,
    matchDate: '2023-10-08T16:45:00',
    status: 'rejected',
  },
  {
    id: '104',
    petName: 'Whiskers',
    petImage: '/placeholder-cat-1.jpg',
    breed: 'Maine Coon',
    age: 3,
    matchScore: 79,
    matchDate: '2023-10-05T11:20:00',
    status: 'completed',
    lastMessage: 'The playdate was great! Let\'s do it again soon.',
  },
];

export default function MatchHistoryPage() {
  const [matchHistory, setMatchHistory] = useState(sampleMatchHistory);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Filter matches based on selected status
  const filteredMatches = statusFilter === 'all' 
    ? matchHistory
    : matchHistory.filter(match => match.status === statusFilter);
    
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Match History</h1>
        <Link 
          href="/matches"
          className="btn btn-outline"
        >
          Back to Matching
        </Link>
      </div>
      
      {/* Filter tabs */}
      <div className="flex space-x-1 bg-neutral-100 p-1 rounded-lg mb-6">
        {['all', 'pending', 'accepted', 'rejected', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors
              ${statusFilter === status 
                ? 'bg-white shadow-sm font-medium text-primary-700' 
                : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
              }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Match list */}
      <div className="space-y-4">
        {filteredMatches.length === 0 ? (
          <div className="card text-center py-12">
            <h3 className="text-lg font-medium text-neutral-700 mb-2">No matches found</h3>
            <p className="text-neutral-500">
              {statusFilter === 'all' 
                ? 'You haven\'t matched with any pets yet.'
                : `You don't have any ${statusFilter} matches.`}
            </p>
          </div>
        ) : (
          filteredMatches.map(match => (
            <MatchItem key={match.id} match={match} />
          ))
        )}
      </div>
      
      {/* Quick actions */}
      <div className="pt-4 border-t border-neutral-200">
        <h2 className="text-lg font-display font-bold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link 
            href="/matches" 
            className="card p-4 flex flex-col items-center justify-center text-center hover:shadow-soft-2xl transition-shadow"
          >
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl mb-2">
              ❤️
            </div>
            <h3 className="font-medium">Find New Matches</h3>
          </Link>
          
          <Link 
            href="/calendar/schedule" 
            className="card p-4 flex flex-col items-center justify-center text-center hover:shadow-soft-2xl transition-shadow"
          >
            <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 text-2xl mb-2">
              📅
            </div>
            <h3 className="font-medium">Schedule Playdate</h3>
          </Link>
        </div>
      </div>
    </div>
  );
} 