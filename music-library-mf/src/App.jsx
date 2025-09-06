import React from 'react';
import MusicLibrary from './components/MusicLibrary';
import './index.css';

// This is a standalone app that can also be consumed as a micro frontend
const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <MusicLibrary userRole="admin" />
        </div>
      </div>
    </div>
  );
};

export default App;
