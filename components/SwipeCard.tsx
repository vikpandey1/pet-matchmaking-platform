'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { Pet } from '@/lib/supabase';

interface SwipeCardProps {
  pet: {
    id: string;
    name: string;
    species: string;
    breed: string;
    age: number;
    imageUrl: string;
    matchScore?: number;
  };
  onSwipe: (direction: 'left' | 'right', petId: string) => void;
  zIndex?: number;
}

export default function SwipeCard({ pet, onSwipe, zIndex = 0 }: SwipeCardProps) {
  const controls = useAnimation();
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100; // Minimum drag distance to trigger swipe
    
    if (info.offset.x > threshold) {
      // Swiped right (like)
      setDirection('right');
      controls.start({ 
        x: window.innerWidth + 200,
        rotate: 20,
        transition: { duration: 0.5 }
      });
      onSwipe('right', pet.id);
    } else if (info.offset.x < -threshold) {
      // Swiped left (dislike)
      setDirection('left');
      controls.start({ 
        x: -window.innerWidth - 200,
        rotate: -20,
        transition: { duration: 0.5 }
      });
      onSwipe('left', pet.id);
    } else {
      // Not enough to trigger swipe, reset position
      controls.start({ x: 0, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  return (
    <motion.div 
      className="absolute w-full h-[70vh] max-h-[600px]"
      style={{ zIndex }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ scale: 0.95, opacity: 0.5 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-soft-2xl bg-white">
        <div className="relative w-full h-4/5">
          <Image
            src={pet.imageUrl}
            alt={`${pet.name} - ${pet.breed}`}
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
            priority
          />
          
          {/* Match score badge */}
          {pet.matchScore && (
            <div className="absolute right-4 top-4 bg-white/90 rounded-full px-3 py-1.5 text-sm font-medium shadow-md">
              {pet.matchScore}% Match
            </div>
          )}
          
          {/* Like/Dislike indicators */}
          <div 
            className={`absolute left-6 top-6 rounded-lg px-4 py-2 text-xl font-bold rotate-[-25deg] border-4 border-success-500 text-success-500 opacity-0 transition-opacity
            ${direction === 'right' ? 'opacity-100' : ''}`}
          >
            LIKE
          </div>
          
          <div 
            className={`absolute right-6 top-6 rounded-lg px-4 py-2 text-xl font-bold rotate-[25deg] border-4 border-error-500 text-error-500 opacity-0 transition-opacity
            ${direction === 'left' ? 'opacity-100' : ''}`}
          >
            NOPE
          </div>
          
          {/* Pet details gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-display font-bold">{pet.name}</h2>
              <p className="text-lg">
                {pet.breed} • {pet.age} {pet.age === 1 ? 'year' : 'years'} old
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom action buttons */}
        <div className="absolute bottom-0 inset-x-0 h-1/5 bg-white flex items-center justify-center space-x-8 px-4">
          <button 
            onClick={() => {
              setDirection('left');
              controls.start({ 
                x: -window.innerWidth - 200, 
                rotate: -20,
                transition: { duration: 0.5 }
              });
              onSwipe('left', pet.id);
            }}
            className="h-14 w-14 flex items-center justify-center rounded-full bg-white border-2 border-error-400 text-error-400 text-2xl shadow-lg hover:bg-error-50"
            aria-label="Dislike"
          >
            ✕
          </button>
          
          <button 
            onClick={() => {
              setDirection('right');
              controls.start({ 
                x: window.innerWidth + 200, 
                rotate: 20,
                transition: { duration: 0.5 }
              });
              onSwipe('right', pet.id);
            }}
            className="h-16 w-16 flex items-center justify-center rounded-full bg-primary-500 text-white text-3xl shadow-lg hover:bg-primary-600"
            aria-label="Like"
          >
            ❤️
          </button>
          
          <button className="h-14 w-14 flex items-center justify-center rounded-full bg-white border-2 border-neutral-300 text-neutral-500 text-xl shadow-lg hover:bg-neutral-50">
            ℹ️
          </button>
        </div>
      </div>
    </motion.div>
  );
} 