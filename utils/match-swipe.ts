import { Pet } from '@/lib/supabase';
import { calculateMatchScore } from './matchmaking';

/**
 * Types for swipe interactions
 */
export type SwipeDirection = 'left' | 'right';
export type SwipeRecord = Record<string, SwipeDirection>;

/**
 * Checks if two pets have a mutual match (both swiped right on each other)
 */
export function checkMutualMatch(
  myPetId: string,
  otherPetId: string,
  mySwipes: SwipeRecord,
  theirSwipes: SwipeRecord
): boolean {
  return (
    mySwipes[otherPetId] === 'right' && 
    theirSwipes[myPetId] === 'right'
  );
}

/**
 * Saves a swipe action to local storage for persistence
 */
export function saveSwipe(
  myPetId: string,
  targetPetId: string,
  direction: SwipeDirection
): void {
  try {
    // Get existing swipes from storage
    const storedSwipes = localStorage.getItem(`pet_swipes_${myPetId}`);
    const swipes = storedSwipes ? JSON.parse(storedSwipes) : {};
    
    // Add new swipe
    swipes[targetPetId] = direction;
    
    // Save back to storage
    localStorage.setItem(`pet_swipes_${myPetId}`, JSON.stringify(swipes));
  } catch (error) {
    console.error('Error saving swipe:', error);
  }
}

/**
 * Gets all swipes from local storage for a pet
 */
export function getSwipes(petId: string): SwipeRecord {
  try {
    const storedSwipes = localStorage.getItem(`pet_swipes_${petId}`);
    return storedSwipes ? JSON.parse(storedSwipes) : {};
  } catch (error) {
    console.error('Error getting swipes:', error);
    return {};
  }
}

/**
 * Gets all pets that have been liked (swiped right)
 */
export function getLikedPets(petId: string, allPets: Pet[]): Pet[] {
  const swipes = getSwipes(petId);
  
  return allPets.filter(pet => 
    swipes[pet.id] === 'right' && pet.id !== petId
  );
}

/**
 * Gets mutual matches for a pet
 */
export function getMutualMatches(
  petId: string,
  allPets: Pet[],
  allSwipes: Record<string, SwipeRecord>
): Pet[] {
  const mySwipes = getSwipes(petId);
  
  return allPets.filter(otherPet => 
    otherPet.id !== petId &&
    mySwipes[otherPet.id] === 'right' && 
    allSwipes[otherPet.id]?.[petId] === 'right'
  );
}

/**
 * Generate match data with score
 */
export function generateMatchData(
  myPet: Pet,
  otherPet: Pet
): {
  id: string;
  petName: string;
  petImage: string;
  breed: string;
  age: number;
  matchScore: number;
  matchDate: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
} {
  const matchScore = calculateMatchScore(myPet, otherPet);
  
  return {
    id: otherPet.id,
    petName: otherPet.name,
    petImage: otherPet.photos?.[0] || '/placeholder-dog-1.jpg',
    breed: otherPet.breed || 'Mixed',
    age: otherPet.age_years || 0,
    matchScore,
    matchDate: new Date().toISOString(),
    status: 'pending',
  };
}

/**
 * Checks if a pet has been seen/swiped on before
 */
export function isPetSeen(petId: string, targetPetId: string): boolean {
  const swipes = getSwipes(petId);
  return swipes[targetPetId] !== undefined;
}

/**
 * Gets a list of pets that haven't been swiped on yet
 */
export function getUnseenPets(myPetId: string, allPets: Pet[]): Pet[] {
  const swipes = getSwipes(myPetId);
  
  return allPets.filter(
    pet => pet.id !== myPetId && !swipes[pet.id]
  );
} 