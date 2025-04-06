'use client';

import { useState } from 'react';
import Link from 'next/link';

// Sample pet health data
const healthData = [
  {
    id: '1',
    petName: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: 30,
    lastCheckup: '2023-10-15',
    healthScore: 92,
    recommendations: [
      'Regular exercise - 30 minutes twice daily',
      'Maintain current diet plan',
      'Schedule dental cleaning in the next 3 months'
    ]
  },
  {
    id: '2',
    petName: 'Coco',
    species: 'Cat',
    breed: 'Persian',
    age: 2,
    weight: 4.5,
    lastCheckup: '2023-11-05',
    healthScore: 88,
    recommendations: [
      'Increase playtime to prevent boredom',
      'Brushing needed 3 times per week',
      'Consider dental treats for oral health'
    ]
  }
];

export default function HealthPage() {
  const [selectedPet, setSelectedPet] = useState(healthData[0].id);
  
  // Get the currently selected pet
  const currentPet = healthData.find(pet => pet.id === selectedPet) || healthData[0];
  
  // Calculate health status based on score
  const getHealthStatus = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 75) return { label: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (score >= 60) return { label: 'Fair', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Needs Attention', color: 'bg-red-100 text-red-800' };
  };
  
  const healthStatus = getHealthStatus(currentPet.healthScore);
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Pet Health Dashboard</h1>
        <Link href="/health/schedule" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Schedule Checkup
        </Link>
      </div>
      
      {/* Pet selector */}
      <div className="flex space-x-2 mb-8">
        {healthData.map(pet => (
          <button
            key={pet.id}
            onClick={() => setSelectedPet(pet.id)}
            className={`px-4 py-2 rounded-md ${
              selectedPet === pet.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {pet.petName}
          </button>
        ))}
      </div>
      
      {/* Health overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{currentPet.petName}</h2>
            <p className="text-gray-600">
              {currentPet.breed} • {currentPet.age} years • {currentPet.weight} kg
            </p>
            <p className="text-gray-500 mt-1">Last checkup: {currentPet.lastCheckup}</p>
          </div>
          <div className={`px-4 py-2 rounded-full ${healthStatus.color}`}>
            {healthStatus.label} ({currentPet.healthScore}%)
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Health Summary</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-500 h-4 rounded-full" 
              style={{ width: `${currentPet.healthScore}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
          <ul className="space-y-2">
            {currentPet.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
          <p className="text-gray-500">No upcoming appointments scheduled.</p>
          <button className="mt-4 text-blue-500 hover:underline">
            Schedule an appointment
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="pb-2 border-b border-gray-100">
              <p className="text-sm text-gray-500">November 5, 2023</p>
              <p>Vaccination: Rabies (3-year)</p>
            </div>
            <div className="pb-2 border-b border-gray-100">
              <p className="text-sm text-gray-500">October 12, 2023</p>
              <p>Wellness Exam</p>
            </div>
          </div>
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