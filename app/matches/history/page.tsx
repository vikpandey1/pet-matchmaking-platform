'use client';

import Link from 'next/link';

// Sample match history data
const matchHistory = [
  {
    id: '1',
    petName: 'Max',
    matchedWith: 'Luna',
    date: '2023-11-15',
    status: 'active',
  },
  {
    id: '2',
    petName: 'Coco',
    matchedWith: 'Rocky',
    date: '2023-11-10',
    status: 'pending',
  },
  {
    id: '3',
    petName: 'Max',
    matchedWith: 'Bella',
    date: '2023-11-05',
    status: 'active',
  }
];

export default function MatchHistoryPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Match History</h1>
        <Link href="/matches" className="text-blue-500 flex items-center hover:underline">
          <span>Find New Matches</span>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-blue-50 border-b border-blue-100 flex justify-between font-medium text-blue-800">
          <div className="w-2/5">Pets</div>
          <div className="w-1/5">Date</div>
          <div className="w-1/5">Status</div>
          <div className="w-1/5">Action</div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {matchHistory.map(match => (
            <div key={match.id} className="p-4 flex justify-between items-center">
              <div className="w-2/5 flex items-center">
                <div>
                  <div className="font-medium">{match.petName} & {match.matchedWith}</div>
                  <div className="text-sm text-gray-500">Match ID: {match.id}</div>
                </div>
              </div>
              
              <div className="w-1/5 text-gray-600">
                {match.date}
              </div>
              
              <div className="w-1/5">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  match.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {match.status === 'active' ? 'Active' : 'Pending'}
                </span>
              </div>
              
              <div className="w-1/5">
                <Link 
                  href={`/messages?matchId=${match.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Message
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
} 