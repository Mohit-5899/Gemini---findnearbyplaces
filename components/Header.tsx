import React from 'react';
import { CompassIcon } from './icons/CompassIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-4">
      <div className="flex items-center justify-center mb-2">
        <CompassIcon className="h-10 w-10 text-indigo-400 mr-3" />
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
          Local Discovery AI
        </h1>
      </div>
      <p className="text-lg text-gray-400 mt-2">
        Get AI-powered local recommendations grounded in real-time Google Maps data.
      </p>
    </header>
  );
};
