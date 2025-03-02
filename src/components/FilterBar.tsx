import React from 'react';
import { Users, Calendar, Clock } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const handlePartySizeChange = (size: number) => {
    onFilterChange({ ...filters, partySize: size });
  };

  const handleDateChange = (date: string) => {
    onFilterChange({ ...filters, date });
  };

  const handleTimeChange = (time: string) => {
    onFilterChange({ ...filters, time });
  };

  const handleFilterTypeChange = (filterType: FilterOptions['filterType']) => {
    onFilterChange({ ...filters, filterType });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 text-white">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span className="font-medium">{filters.partySize}</span>
          </div>
          <span>•</span>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="font-medium">{filters.date}</span>
          </div>
          <span>•</span>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span className="font-medium">{filters.time}</span>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filters.filterType === 'available' 
              ? 'bg-white text-black' 
              : 'bg-black/60 text-white'
          }`}
          onClick={() => handleFilterTypeChange('available')}
        >
          Available
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filters.filterType === 'collections' 
              ? 'bg-white text-black' 
              : 'bg-black/60 text-white'
          }`}
          onClick={() => handleFilterTypeChange('collections')}
        >
          Collections
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filters.filterType === 'lists' 
              ? 'bg-white text-black' 
              : 'bg-black/60 text-white'
          }`}
          onClick={() => handleFilterTypeChange('lists')}
        >
          Lists
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filters.filterType === 'events' 
              ? 'bg-white text-black' 
              : 'bg-black/60 text-white'
          }`}
          onClick={() => handleFilterTypeChange('events')}
        >
          Events
        </button>
      </div>
    </div>
  );
};

export default FilterBar;