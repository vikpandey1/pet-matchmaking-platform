'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'My Pets', href: '/pets', icon: '🐾' },
  { name: 'Matches', href: '/matches', icon: '❤️' },
  { name: 'Messages', href: '/messaging', icon: '💬' },
  { name: 'Calendar', href: '/calendar', icon: '📅' },
  { name: 'Store', href: '/store', icon: '🛒' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <div
      className={`bg-white shadow-soft-xl transition-all duration-300 ${
        expanded ? 'w-64' : 'w-20'
      } flex flex-col`}
    >
      <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-4">
        {expanded ? (
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <Image
                src="/logo.svg"
                alt="PetTech Logo"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
              />
            </div>
            <span className="text-xl font-display font-bold text-primary-600">
              PetTech
            </span>
          </Link>
        ) : (
          <Link href="/dashboard" className="flex items-center justify-center w-full">
            <div className="relative h-8 w-8">
              <Image
                src="/logo.svg"
                alt="PetTech Logo"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
              />
            </div>
          </Link>
        )}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-neutral-500 hover:text-neutral-700"
        >
          {expanded ? (
            <span className="text-lg">◀</span>
          ) : (
            <span className="text-lg">▶</span>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                } ${!expanded && 'justify-center'}`}
              >
                <span className="text-xl">{item.icon}</span>
                {expanded && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-neutral-200 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="relative h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-sm font-medium">
              US
            </div>
          </div>
          {expanded && (
            <div className="ml-3">
              <p className="text-sm font-medium text-neutral-700">User Name</p>
              <p className="text-xs text-neutral-500">user@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 