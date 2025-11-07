import React, { useState, useEffect, useCallback } from 'react';
import { fetchLocalRecommendations } from './services/geminiService';
import type { GeminiResponse, Coordinates } from './types';
import { SearchBar } from './components/SearchBar';
import { ResponseDisplay } from './components/ResponseDisplay';
import { LocationHandler } from './components/LocationHandler';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Header } from './components/Header';
import { ErrorDisplay } from './components/ErrorDisplay';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('Good coffee shops near me with outdoor seating');
  const [geminiResponse, setGeminiResponse] = useState<GeminiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setError("Please enter a search query.");
      return;
    }
    if (!location) {
      setError("Location is not available. Please grant permission and try again.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeminiResponse(null);

    try {
      const response = await fetchLocalRecommendations(query, location);
      setGeminiResponse(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [query, location]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl flex flex-col h-full">
        <Header />
        
        <main className="flex-grow flex flex-col mt-6">
          <LocationHandler
            onLocationSuccess={setLocation}
            onLocationError={setLocationError}
          />

          {!location && !locationError && (
             <div className="flex items-center justify-center p-4 bg-gray-800 rounded-lg">
                <LoadingSpinner />
                <span className="ml-3 text-lg">Waiting for location permission...</span>
             </div>
          )}

          {locationError && (
            <ErrorDisplay message={locationError} />
          )}

          {location && (
            <>
              <SearchBar
                query={query}
                setQuery={setQuery}
                onSearch={handleSearch}
                isLoading={isLoading}
              />
              
              {isLoading && (
                <div className="flex items-center justify-center mt-8">
                  <LoadingSpinner />
                  <span className="ml-4 text-xl">Discovering places for you...</span>
                </div>
              )}
              
              {error && <ErrorDisplay message={error} className="mt-6" />}
              
              {geminiResponse && (
                <ResponseDisplay response={geminiResponse} />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
