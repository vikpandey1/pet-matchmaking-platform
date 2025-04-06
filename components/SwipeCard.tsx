'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { Pet } from '@/lib/supabase';

type SwipeCardProps = {
  pet: {
    id: string;
    name: string;
    breed: string;
    age: number;
    matchScore: number;
  };
  onSwipe: (direction: 'left' | 'right', petId: string) => void;
  zIndex?: number;
};

export default function SwipeCard({ pet, onSwipe, zIndex = 10 }: SwipeCardProps) {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    // Call the parent's onSwipe after a short delay to allow animation
    setTimeout(() => {
      onSwipe(direction, pet.id);
      setSwipeDirection(null);
    }, 300);
  };

  return (
    <div 
      className="absolute inset-0 bg-white rounded-lg shadow-md overflow-hidden"
      style={{ 
        zIndex,
        transform: swipeDirection === 'left' 
          ? 'translateX(-120%) rotate(-10deg)' 
          : swipeDirection === 'right'
          ? 'translateX(120%) rotate(10deg)'
          : 'none',
        transition: 'transform 0.3s ease',
      }}
    >
      <div className="h-64 bg-gray-200 flex items-center justify-center">
        <span className="text-4xl">🐶</span>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">{pet.name}</h2>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
            {pet.matchScore}% Match
          </span>
        </div>
        
        <p className="text-gray-600">
          {pet.breed}, {pet.age} {pet.age === 1 ? 'year' : 'years'} old
        </p>
        
        <div className="mt-4 flex justify-between">
          <button 
            onClick={() => handleSwipe('left')}
            className="bg-white border border-red-500 text-red-500 rounded-full h-10 w-10 flex items-center justify-center shadow-sm"
          >
            ✕
          </button>
          
          <button 
            onClick={() => handleSwipe('right')}
            className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center shadow-sm"
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
} 