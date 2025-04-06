import { Pet } from '@/lib/supabase';

/**
 * Calculate match score between two pets based on various factors
 * 
 * Scoring Logic:
 * - Same breed: +20 points
 * - Age proximity: +10 points max (decreases as age gap increases)
 * - Overlapping genetic risks: -15 points
 * - Compatible temperament (activity, friendliness): +5 points
 * 
 * @param pet1 The first pet
 * @param pet2 The second pet
 * @returns A score from 0-100 representing compatibility
 */
export function calculateMatchScore(pet1: Pet, pet2: Pet): number {
  // Base score starts at 50 (neutral)
  let score = 50;
  
  // Same breed bonus (+20)
  if (pet1.breed && pet2.breed && pet1.breed.toLowerCase() === pet2.breed.toLowerCase()) {
    score += 20;
  }
  
  // Age proximity bonus (up to +10)
  if (pet1.age_years && pet2.age_years) {
    const ageDiff = Math.abs(pet1.age_years - pet2.age_years);
    if (ageDiff <= 0.5) {
      score += 10; // Very close in age
    } else if (ageDiff <= 1) {
      score += 8;
    } else if (ageDiff <= 2) {
      score += 5;
    } else if (ageDiff <= 3) {
      score += 2;
    }
  }
  
  // Genetic risk penalty (up to -15)
  if (pet1.health_data && pet2.health_data) {
    try {
      const pet1Risks = pet1.health_data.genetic_risks || [];
      const pet2Risks = pet2.health_data.genetic_risks || [];
      
      // Find overlapping genetic risks
      const overlappingRisks = pet1Risks.filter((risk: GeneticRisk) => 
        pet2Risks.some((r: GeneticRisk) => r.condition === risk.condition)
      );
      
      // Penalty based on number and severity of overlapping risks
      const penaltyPerRisk = Math.min(15, 5 * overlappingRisks.length);
      score -= penaltyPerRisk;
    } catch (error) {
      console.error('Error parsing health data for genetic risks:', error);
    }
  }
  
  // Activity level compatibility (+5)
  if (pet1.activity_level && pet2.activity_level) {
    if (pet1.activity_level === pet2.activity_level) {
      score += 5; // Same activity level
    } else if (
      (pet1.activity_level === 'medium' && pet2.activity_level === 'high') ||
      (pet1.activity_level === 'high' && pet2.activity_level === 'medium') ||
      (pet1.activity_level === 'medium' && pet2.activity_level === 'low') ||
      (pet1.activity_level === 'low' && pet2.activity_level === 'medium')
    ) {
      score += 2; // Adjacent activity levels
    }
    // Opposite activity levels get no bonus
  }
  
  // Friendliness compatibility (+5)
  if (pet1.friendliness && pet2.friendliness) {
    if (pet1.friendliness === pet2.friendliness) {
      score += 5; // Same friendliness level
    } else if (
      (pet1.friendliness === 'selective' && pet2.friendliness === 'friendly') ||
      (pet1.friendliness === 'friendly' && pet2.friendliness === 'selective')
    ) {
      score += 3; // Good compatibility
    }
    // Shy with friendly gets no bonus
  }
  
  // Ensure score stays within 0-100 range
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Find top matches for a given pet from a pool of candidates
 * 
 * @param targetPet The pet to find matches for
 * @param candidatePets Array of potential matches
 * @param limit Maximum number of matches to return (default: 5)
 * @returns Array of matches sorted by score (highest first)
 */
export function findTopMatches(
  targetPet: Pet,
  candidatePets: Pet[],
  limit: number = 5
): Array<{ pet: Pet; score: number }> {
  // Filter out the target pet itself if it's in the candidate list
  const filteredCandidates = candidatePets.filter(pet => pet.id !== targetPet.id);
  
  // Calculate match scores for all candidates
  const scoredMatches = filteredCandidates.map(pet => ({
    pet,
    score: calculateMatchScore(targetPet, pet)
  }));
  
  // Sort by score (highest first) and limit results
  return scoredMatches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Define the risk type interface
interface GeneticRisk {
  condition: string;
  probability: number;
}

// Mock function to generate random match scores
export function generateRandomMatches(currentPet: any, otherPets: any[]) {
  return otherPets.map(pet => {
    // Don't match with self
    if (pet.id === currentPet.id) {
      return { ...pet, matchScore: 0 };
    }
    
    // Generate a score between 60-99
    const matchScore = 60 + Math.floor(Math.random() * 40);
    
    return {
      ...pet,
      matchScore
    };
  }).filter(pet => pet.matchScore > 0);
} 