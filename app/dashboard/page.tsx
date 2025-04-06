'use client';

import Link from 'next/link';

// Simple dashboard card component
function DashboardCard({ 
  title, 
  description, 
  icon, 
  href 
}: { 
  title: string; 
  description: string; 
  icon: string; 
  href: string; 
}) {
  return (
    <Link href={href} className="block">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  // Dashboard sections data
  const sections = [
    {
      id: 'pets',
      title: 'My Pets',
      description: 'Manage your pet profiles and information',
      icon: '🐾',
      href: '/pets'
    },
    {
      id: 'matches',
      title: 'Match Finder',
      description: 'Find perfect companions for your pets',
      icon: '❤️',
      href: '/matches'
    },
    {
      id: 'health',
      title: 'Health Analytics',
      description: 'Track and monitor your pets\' health',
      icon: '📊',
      href: '/health'
    },
    {
      id: 'appointments',
      title: 'Appointments',
      description: 'Schedule vet visits and playdates',
      icon: '📅',
      href: '/appointments'
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'Chat with other pet owners and vets',
      icon: '💬',
      href: '/messages'
    },
    {
      id: 'premium',
      title: 'Premium Features',
      description: 'Upgrade to access exclusive services',
      icon: '⭐',
      href: '/premium'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pet Matchmaking Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your PetMatch dashboard. Explore the features below to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <DashboardCard
            key={section.id}
            title={section.title}
            description={section.description}
            icon={section.icon}
            href={section.href}
          />
        ))}
      </div>
    </div>
  );
} 