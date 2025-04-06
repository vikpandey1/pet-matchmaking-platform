// Mock AI functions for pet health summary

/**
 * Generates a health summary for a pet based on provided data
 */
export const generateHealthSummary = async (petData: any, healthData?: any) => {
  // In a real app, this would call an AI service like OpenAI or Anthropic
  // Here we just return mock data
  const { name, age, species, breed, weight } = petData;
  
  const recommendations = [
    `Regular exercise - ${species === 'dog' ? '30 minutes twice daily' : '15 minutes of play daily'}`,
    `Weight is ${weight > 20 ? 'slightly above' : 'within'} the typical range for a ${breed}`,
    'Schedule regular dental checkups',
    `Diet should consist of high-quality ${species} food appropriate for ${age < 2 ? 'puppies/kittens' : 'adult dogs/cats'}`,
  ];
  
  return {
    overallHealth: Math.floor(85 + Math.random() * 10),
    summary: `${name} appears to be in good health overall. Based on the breed (${breed}) and age (${age}), ${name} has a normal development pattern. Regular checkups and exercise are recommended.`,
    recommendations,
    lastUpdated: new Date().toISOString(),
  };
};

/**
 * Finds potential matches for a pet
 */
export const findPetMatches = async (pet: any, otherPets: any[]) => {
  // In a real app, this would use AI to find compatible pets
  // Here we simulate by giving random match scores
  return otherPets.map(otherPet => {
    // Don't match with self or different species
    if (otherPet.id === pet.id || otherPet.species !== pet.species) {
      return { ...otherPet, matchScore: 0 };
    }
    
    // Generate a random match score between 60 and 99
    const matchScore = Math.floor(60 + Math.random() * 40);
    
    return {
      ...otherPet,
      matchScore,
    };
  })
  .filter(match => match.matchScore > 0)
  .sort((a, b) => b.matchScore - a.matchScore);
}; 