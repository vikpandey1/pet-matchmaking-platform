'use client';

import Link from 'next/link';

export default function TopNav() {
  return (
    <div className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <div className="font-medium">Welcome back, User!</div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-xl">🔔</button>
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          👤
        </div>
      </div>
    </div>
  );
} 