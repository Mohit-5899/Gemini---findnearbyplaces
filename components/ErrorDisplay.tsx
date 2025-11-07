import React from 'react';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';

interface ErrorDisplayProps {
  message: string;
  className?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, className = '' }) => {
  return (
    <div
      className={`flex items-center p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg ${className}`}
      role="alert"
    >
      <AlertTriangleIcon className="h-6 w-6 mr-3 flex-shrink-0" />
      <div>
        <span className="font-semibold">Error:</span> {message}
      </div>
    </div>
  );
};
