'use client';

import Image from 'next/image';
import Link from 'next/link';

interface MatchSuggestionCardProps {
  petName: string;
  breed: string;
  age: number;
  matchScore: number;
  imageUrl: string;
}

export default function MatchSuggestionCard({
  petName,
  breed,
  age,
  matchScore,
  imageUrl,
}: MatchSuggestionCardProps) {
  return (
    <div className="card-hover overflow-hidden">
      <div className="relative h-48 w-full mb-4">
        <Image
          src={imageUrl}
          alt={`${petName} - ${breed}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover rounded-lg"
        />
        <div className="absolute right-2 top-2 bg-white/90 rounded-full px-2 py-1 text-xs font-medium">
          {matchScore}% Match
        </div>
      </div>
      
      <h3 className="text-lg font-medium">{petName}</h3>
      <p className="text-sm text-neutral-600">
        {breed}, {age} {age === 1 ? 'year' : 'years'} old
      </p>
      
      <div className="mt-4 flex space-x-2">
        <button className="btn btn-primary flex-1">
          View Match
        </button>
        <button className="btn btn-outline">
          ❤️
        </button>
      </div>
    </div>
  );
} 