import React from 'react';
import type { GeminiResponse } from '../types';
import { Sources } from './Sources';
import { MarkdownContent } from './MarkdownContent';

interface ResponseDisplayProps {
  response: GeminiResponse;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  return (
    <div className="mt-6 bg-gray-800/50 rounded-xl border border-gray-700 p-6 animate-fade-in">
      <MarkdownContent content={response.text} />
      {response.groundingChunks && response.groundingChunks.length > 0 && (
        <>
          <hr className="my-6 border-gray-600" />
          <Sources sources={response.groundingChunks} />
        </>
      )}
    </div>
  );
};
