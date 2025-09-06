import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Function to load the micro frontend with retry logic
const loadMicroFrontend = () => {
  return new Promise((resolve, reject) => {
    const load = (attempt = 1) => {
      import('music-library/MusicLibrary')
        .then(module => {
          console.log('MusicLibrary module loaded successfully');
          resolve(module);
        })
        .catch(error => {
          console.error(`Attempt ${attempt} failed to load MusicLibrary:`, error);
          if (attempt < 3) {
            console.log(`Retrying... (${attempt + 1}/3)`);
            setTimeout(() => load(attempt + 1), 1000 * attempt);
          } else {
            reject(error);
          }
        });
    };
    load();
  });
};

// Lazy load the MusicLibrary component with error boundary and retry logic
const MusicLibrary = lazy(() => 
  loadMicroFrontend().catch(error => ({
    default: () => (
      <div className="text-center p-8">
        <p className="text-red-600 font-medium">
          Failed to load Music Library after multiple attempts.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Please ensure the micro frontend is running on port 4173.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    )
  }))
);

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Music Library</h1>
            </div>
            <div className="flex items-center">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-3 relative">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700">
                      Welcome, <span className="font-medium">{user?.username}</span>
                      {user?.role === 'admin' && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Admin
                        </span>
                      )}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }>
          <MusicLibrary userRole={user?.role || 'user'} />
        </Suspense>
      </main>
    </div>
  );
};

export default Dashboard;
