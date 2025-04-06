'use client';

import { useState } from 'react';
import Link from 'next/link';

// Sample match data (would be fetched from API)
const sampleMatches = [
  {
    id: '1',
    name: 'Luna',
    breed: 'Border Collie',
    age: 2,
    matchScore: 95,
  },
  {
    id: '2',
    name: 'Rocky',
    breed: 'German Shepherd',
    age: 4,
    matchScore: 88,
  },
  {
    id: '3',
    name: 'Bella',
    breed: 'Labrador Retriever',
    age: 1,
    matchScore: 82,
  },
];

export default function MatchesPage() {
  const [currentMatch, setCurrentMatch] = useState(0);
  const [swipedRight, setSwipedRight] = useState<string[]>([]);
  const [swipedLeft, setSwipedLeft] = useState<string[]>([]);
  
  // Handle swipe action
  const handleSwipe = (direction: 'left' | 'right') => {
    const currentPet = sampleMatches[currentMatch];
    
    if (direction === 'right') {
      setSwipedRight([...swipedRight, currentPet.id]);
    } else {
      setSwipedLeft([...swipedLeft, currentPet.id]);
    }
    
    // Move to next match
    if (currentMatch < sampleMatches.length - 1) {
      setCurrentMatch(currentMatch + 1);
    }
  };
  
  // Get current pet
  const currentPet = sampleMatches[currentMatch];
  const isFinished = currentMatch >= sampleMatches.length;
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Pet Matchmaker</h1>
        <Link href="/matches/history" className="btn btn-outline">Match History</Link>
      </div>
      
      {isFinished ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">No More Matches</h2>
          <p className="text-gray-600 mb-6">You've gone through all available matches.</p>
          <button 
            onClick={() => {
              setCurrentMatch(0);
              setSwipedLeft([]);
              setSwipedRight([]);
            }}
            className="btn btn-primary"
          >
            Start Over
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Card */}
          <div className="bg-white rounded-lg shadow-md w-full max-w-md mb-6 overflow-hidden">
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-4xl">🐶</span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold">{currentPet.name}</h2>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {currentPet.matchScore}% Match
                </span>
              </div>
              <p className="text-gray-600">
                {currentPet.breed}, {currentPet.age} {currentPet.age === 1 ? 'year' : 'years'} old
              </p>
            </div>
          </div>
          
          {/* Swipe buttons */}
          <div className="flex space-x-4">
            <button 
              onClick={() => handleSwipe('left')}
              className="bg-white border border-red-500 text-red-500 rounded-full h-14 w-14 flex items-center justify-center text-2xl shadow-md"
            >
              ✕
            </button>
            <button 
              onClick={() => handleSwipe('right')}
              className="bg-blue-500 text-white rounded-full h-14 w-14 flex items-center justify-center text-2xl shadow-md"
            >
              ❤️
            </button>
          </div>
          
          {/* Stats */}
          <div className="flex justify-center w-full max-w-md mt-6">
            <div className="text-center px-4">
              <div className="text-xl font-bold text-red-500">{swipedLeft.length}</div>
              <div className="text-sm text-gray-500">Passed</div>
            </div>
            <div className="text-center px-4">
              <div className="text-xl font-bold text-blue-500">{swipedRight.length}</div>
              <div className="text-sm text-gray-500">Liked</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
} 