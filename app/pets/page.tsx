'use client';

import { useState } from 'react';
import Link from 'next/link';

// Sample pet data
const samplePets = [
  {
    id: '1',
    name: 'Max',
    breed: 'Golden Retriever',
    age: 3,
    imageUrl: '🐕',
  },
  {
    id: '2',
    name: 'Coco',
    breed: 'Persian Cat',
    age: 2,
    imageUrl: '🐈',
  },
];

export default function PetsPage() {
  const [pets, setPets] = useState(samplePets);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPet, setNewPet] = useState({
    name: '',
    breed: '',
    age: 1,
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPet({
      ...newPet,
      [name]: name === 'age' ? parseInt(value) || 1 : value,
    });
  };

  // Add new pet
  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (pets.length + 1).toString();
    const petEmoji = Math.random() > 0.5 ? '🐕' : '🐈';
    
    setPets([
      ...pets, 
      { 
        id, 
        ...newPet, 
        imageUrl: petEmoji 
      }
    ]);
    
    setNewPet({ name: '', breed: '', age: 1 });
    setShowAddForm(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Pets</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {showAddForm ? 'Cancel' : 'Add Pet'}
        </button>
      </div>

      {/* Add Pet Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Pet</h2>
          <form onSubmit={handleAddPet}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newPet.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                <input
                  type="text"
                  name="breed"
                  value={newPet.breed}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  min="1"
                  value={newPet.age}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Save Pet
            </button>
          </form>
        </div>
      )}

      {/* Pet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map(pet => (
          <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <span className="text-6xl">{pet.imageUrl}</span>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-1">{pet.name}</h2>
              <p className="text-gray-600">{pet.breed}, {pet.age} {pet.age === 1 ? 'year' : 'years'} old</p>
              <div className="mt-4 flex space-x-2">
                <Link 
                  href={`/pets/${pet.id}`} 
                  className="bg-blue-100 text-blue-800 py-1 px-3 rounded-md text-sm hover:bg-blue-200"
                >
                  View Profile
                </Link>
                <Link 
                  href={`/matches?petId=${pet.id}`}
                  className="bg-pink-100 text-pink-800 py-1 px-3 rounded-md text-sm hover:bg-pink-200"
                >
                  Find Matches
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
} 