'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TopNav() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New match found!',
      description: 'Bella has a new potential match with Max.',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'Appointment reminder',
      description: 'Your vet appointment is scheduled for tomorrow.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 3, 
      title: 'Health report available',
      description: 'Fluffy\'s health analysis is ready for you to review.',
      time: '1 day ago',
      read: true,
    },
  ]);
  
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-neutral-200">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-display font-bold">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-neutral-500">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="input pl-10 py-1.5 w-64"
            />
          </div>
          
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-1 rounded-full text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <span className="text-xl">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-error-500 text-xs text-white text-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-soft-xl z-10 animate-fade-in">
                <div className="p-3 border-b border-neutral-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Notifications</h3>
                    <button
                      onClick={() => {
                        setNotifications(notifications.map(n => ({ ...n, read: true })));
                      }}
                      className="text-xs text-primary-600 hover:text-primary-700"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-neutral-500 text-sm">
                      No notifications yet
                    </div>
                  ) : (
                    <div className="divide-y divide-neutral-200">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 flex hover:bg-neutral-50 ${
                            !notification.read ? 'bg-neutral-50' : ''
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-800">
                              {notification.title}
                            </p>
                            <p className="text-xs text-neutral-600 mt-0.5">
                              {notification.description}
                            </p>
                            <p className="text-xs text-neutral-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="ml-2">
                              <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-neutral-200">
                  <Link 
                    href="/notifications"
                    className="block w-full text-center text-xs text-primary-600 hover:text-primary-700 p-1"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Help */}
          <button className="p-1 rounded-full text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <span className="text-xl">❓</span>
          </button>
        </div>
      </div>
    </header>
  );
} 