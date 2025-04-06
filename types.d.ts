// React and JSX declarations
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Common types for the application
interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  imageUrl?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription?: 'free' | 'premium' | 'enterprise';
}

// Next.js module declarations
declare module 'next/link';
declare module 'next/image';
declare module 'next/font/google';
declare module 'next' {
  export type Metadata = {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

// Declare any missing modules that might be causing errors
declare module '@/components/*';
declare module '@/lib/*'; 