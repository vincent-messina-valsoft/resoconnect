import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLocationClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationClick }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-black/80 text-white w-full pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="ml-2 text-white hover:text-gray-300 focus:outline-none"
          onClick={onLocationClick}
        >
          Current Location
        </button>
      </form>
    </div>
  );
};

export default SearchBar;