'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SwipeCard from '@/components/SwipeCard';
import { motion, AnimatePresence } from 'framer-motion';

// Sample pet matches data (would be fetched from the API in a real app)
const sampleMatches = [
  {
    id: '1',
    name: 'Luna',
    species: 'dog',
    breed: 'Border Collie',
    age: 2,
    imageUrl: '/placeholder-dog-2.jpg',
    matchScore: 95,
  },
  {
    id: '2',
    name: 'Rocky',
    species: 'dog',
    breed: 'German Shepherd',
    age: 4,
    imageUrl: '/placeholder-dog-3.jpg',
    matchScore: 88,
  },
  {
    id: '3',
    name: 'Bella',
    species: 'dog',
    breed: 'Labrador Retriever',
    age: 1,
    imageUrl: '/placeholder-dog-4.jpg',
    matchScore: 82,
  },
  {
    id: '4',
    name: 'Whiskers',
    species: 'cat',
    breed: 'Maine Coon',
    age: 3,
    imageUrl: '/placeholder-cat-1.jpg',
    matchScore: 79,
  },
  {
    id: '5',
    name: 'Charlie',
    species: 'dog',
    breed: 'Beagle',
    age: 2,
    imageUrl: '/placeholder-dog-5.jpg',
    matchScore: 76,
  },
];

export default function MatchesPage() {
  const [matches, setMatches] = useState(sampleMatches);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatchDialog, setShowMatchDialog] = useState(false);
  const [matchedPet, setMatchedPet] = useState<typeof sampleMatches[0] | null>(null);
  const [swipedPets, setSwipedPets] = useState<Record<string, 'left' | 'right'>>({});
  
  // Handle swipe action
  const handleSwipe = (direction: 'left' | 'right', petId: string) => {
    // Record swipe direction
    setSwipedPets(prev => ({
      ...prev,
      [petId]: direction,
    }));
    
    // If swiped right (liked), show match dialog
    if (direction === 'right') {
      const pet = matches.find(m => m.id === petId);
      if (pet) {
        setMatchedPet(pet);
        
        // Show match dialog after animation completes
        setTimeout(() => {
          setShowMatchDialog(true);
        }, 500);
      }
    }
    
    // Move to next card after a delay
    setTimeout(() => {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }, 300);
  };
  
  // Check if we've reached the end of matches
  const isFinished = currentIndex >= matches.length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-display font-bold">Find Matches</h1>
        <Link 
          href="/matches/history"
          className="btn btn-outline"
        >
          Match History
        </Link>
      </div>
      
      {/* Main swipe container */}
      <div className="relative h-[70vh] max-h-[600px] w-full max-w-md mx-auto my-8">
        {isFinished ? (
          <div className="card flex flex-col items-center justify-center h-full text-center">
            <h2 className="text-xl font-bold mb-4">No More Matches</h2>
            <p className="text-neutral-600 mb-6">You've gone through all available matches for now.</p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSwipedPets({});
              }}
              className="btn btn-primary"
            >
              Start Over
            </button>
          </div>
        ) : (
          matches
            // Display current card and several next ones (for stack effect)
            .slice(currentIndex, currentIndex + 3)
            .map((pet, index) => (
              <SwipeCard
                key={pet.id}
                pet={pet}
                onSwipe={handleSwipe}
                zIndex={matches.length - index}
              />
            ))
        )}
      </div>
      
      {/* SwipeCard controls for non-touch devices (optional) */}
      {!isFinished && (
        <div className="flex justify-center gap-8">
          <button 
            onClick={() => handleSwipe('left', matches[currentIndex].id)}
            className="btn btn-outline px-6 border-error-400 text-error-500 hover:bg-error-50"
          >
            Skip
          </button>
          <button 
            onClick={() => handleSwipe('right', matches[currentIndex].id)}
            className="btn btn-primary px-6"
          >
            Like
          </button>
        </div>
      )}
      
      {/* Match stats */}
      <div className="flex justify-center gap-4 mt-4">
        <div className="text-center">
          <div className="text-xl font-bold text-error-500">
            {Object.values(swipedPets).filter(d => d === 'left').length}
          </div>
          <div className="text-sm text-neutral-500">Skipped</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-success-500">
            {Object.values(swipedPets).filter(d => d === 'right').length}
          </div>
          <div className="text-sm text-neutral-500">Liked</div>
        </div>
      </div>
      
      {/* Match Dialog */}
      <AnimatePresence>
        {showMatchDialog && matchedPet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 text-center"
            >
              <div className="text-3xl mb-4">🎉</div>
              <h2 className="text-2xl font-display font-bold text-primary-600 mb-2">It's a Match!</h2>
              <p className="text-neutral-600 mb-6">
                You and {matchedPet.name} might be a great match!
              </p>
              
              <div className="flex justify-center gap-4 mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary-200">
                  <img 
                    src="/placeholder-dog-1.jpg" 
                    alt="Your pet" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary-200">
                  <img 
                    src={matchedPet.imageUrl} 
                    alt={matchedPet.name} 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowMatchDialog(false)}
                  className="btn btn-outline flex-1"
                >
                  Keep Swiping
                </button>
                <Link
                  href={`/matches/chat/${matchedPet.id}`}
                  className="btn btn-primary flex-1"
                >
                  Send Message
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 