import React from 'react';
import type { GroundingChunk } from '../types';
import { MapPinIcon } from './icons/MapPinIcon';

interface SourcesProps {
  sources: GroundingChunk[];
}

export const Sources: React.FC<SourcesProps> = ({ sources }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-200 mb-3">Sources from Google Maps</h3>
      <ul className="space-y-2">
        {sources.map((source, index) => (
          source.maps && (
            <li key={index}>
              <a
                href={source.maps.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200"
              >
                <MapPinIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{source.maps.title}</span>
              </a>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};
