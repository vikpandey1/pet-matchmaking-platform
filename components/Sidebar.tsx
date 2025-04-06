'use client';

import Link from 'next/link';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'My Pets', href: '/pets', icon: '🐾' },
    { name: 'Matches', href: '/matches', icon: '❤️' },
    { name: 'Health', href: '/health', icon: '🏥' },
    { name: 'Messages', href: '/messages', icon: '💬' },
    { name: 'Profile', href: '/profile', icon: '👤' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen p-4">
      <div className="text-2xl font-bold mb-8 pl-2">PetMatch</div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-blue-50"
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 