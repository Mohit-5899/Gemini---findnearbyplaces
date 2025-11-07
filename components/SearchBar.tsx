import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex w-full items-center gap-2 sticky top-4 z-10 bg-gray-900/80 backdrop-blur-sm p-2 rounded-xl border border-gray-700">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., parks with playgrounds nearby"
        className="w-full bg-transparent text-lg text-gray-100 placeholder-gray-500 focus:outline-none px-3 py-2"
        disabled={isLoading}
      />
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <SearchIcon className="h-5 w-5 mr-2" />
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};
