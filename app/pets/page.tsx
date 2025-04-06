'use client';

import Link from 'next/link';
import Image from 'next/image';

const pets = [
  {
    id: '1',
    name: 'Max',
    species: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: 32,
    imageUrl: '/placeholder-dog-1.jpg',
  },
  {
    id: '2',
    name: 'Luna',
    species: 'dog',
    breed: 'Border Collie',
    age: 2,
    weight: 22,
    imageUrl: '/placeholder-dog-2.jpg',
  },
  {
    id: '3',
    name: 'Whiskers',
    species: 'cat',
    breed: 'Maine Coon',
    age: 4,
    weight: 8,
    imageUrl: '/placeholder-cat-1.jpg',
  },
];

export default function PetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">My Pets</h1>
        <Link 
          href="/pets/add" 
          className="btn btn-primary"
        >
          Add New Pet
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <Link 
            key={pet.id}
            href={`/pets/${pet.id}`}
            className="card-hover group"
          >
            <div className="relative h-48 w-full mb-4">
              <Image
                src={pet.imageUrl}
                alt={`${pet.name} - ${pet.breed}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end p-4">
                <span className="text-white font-medium">View Profile</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">{pet.name}</h3>
                <p className="text-sm text-neutral-600">
                  {pet.breed} • {pet.age} {pet.age === 1 ? 'year' : 'years'} old
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl">
                {pet.species === 'dog' ? '🐶' : '🐱'}
              </div>
            </div>
          </Link>
        ))}
        
        <div className="card flex flex-col items-center justify-center text-center h-64 border-2 border-dashed border-neutral-300">
          <div className="h-16 w-16 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 text-2xl mb-4">
            +
          </div>
          <h3 className="text-lg font-medium">Add New Pet</h3>
          <p className="text-sm text-neutral-600 mt-1 mb-4">
            Register a new dog or cat
          </p>
          <Link href="/pets/add" className="btn btn-outline">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
} 