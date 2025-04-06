import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-6 text-blue-600">Welcome to PetMatch</h1>
        <div className="text-8xl mb-8">🐕 ❤️ 🐈</div>
        <p className="text-xl mb-10 text-gray-700">
          Find perfect companions for your pets with our advanced matchmaking platform.
          Connect, share, and create lasting friendships for your furry friends!
        </p>
        <Link 
          href="/dashboard" 
          className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg text-xl hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-bold mb-2">Find Matches</h2>
          <p className="text-gray-600">Browse and match with compatible pets in your area</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-xl font-bold mb-2">Health Insights</h2>
          <p className="text-gray-600">Track your pet's health with AI-powered analytics</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-4xl mb-4">💬</div>
          <h2 className="text-xl font-bold mb-2">Connect</h2>
          <p className="text-gray-600">Chat with other pet owners and schedule playdates</p>
        </div>
      </div>
    </div>
  );
} 