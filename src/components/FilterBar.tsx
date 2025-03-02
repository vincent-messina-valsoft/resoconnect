import React from 'react';
import { Users, Calendar, Clock, Check } from 'lucide-react';
import { FilterOptions, VenueType } from '../types';

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

  const toggleFilterType = (filterType: VenueType) => {
    const currentFilters = [...filters.selectedFilters];
    
    if (currentFilters.includes(filterType)) {
      // Remove the filter if it's already selected
      const updatedFilters = currentFilters.filter(type => type !== filterType);
      onFilterChange({ ...filters, selectedFilters: updatedFilters.length ? updatedFilters : ['available'] });
    } else {
      // Add the filter if it's not already selected
      const updatedFilters = [...currentFilters, filterType];
      onFilterChange({ ...filters, selectedFilters: updatedFilters });
    }
  };

  const isFilterSelected = (filterType: VenueType) => {
    return filters.selectedFilters.includes(filterType);
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
      
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
              isFilterSelected('available') 
                ? 'bg-white text-black' 
                : 'bg-black/60 text-white'
            }`}
            onClick={() => toggleFilterType('available')}
          >
            {isFilterSelected('available') && <Check className="h-3 w-3 mr-1" />}
            Available
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
              isFilterSelected('nightclub') 
                ? 'bg-white text-black' 
                : 'bg-black/60 text-white'
            }`}
            onClick={() => toggleFilterType('nightclub')}
          >
            {isFilterSelected('nightclub') && <Check className="h-3 w-3 mr-1" />}
            Nightclub
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
              isFilterSelected('lounge') 
                ? 'bg-white text-black' 
                : 'bg-black/60 text-white'
            }`}
            onClick={() => toggleFilterType('lounge')}
          >
            {isFilterSelected('lounge') && <Check className="h-3 w-3 mr-1" />}
            Lounge
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
              isFilterSelected('bar') 
                ? 'bg-white text-black' 
                : 'bg-black/60 text-white'
            }`}
            onClick={() => toggleFilterType('bar')}
          >
            {isFilterSelected('bar') && <Check className="h-3 w-3 mr-1" />}
            Bar
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
              isFilterSelected('events') 
                ? 'bg-white text-black' 
                : 'bg-black/60 text-white'
            }`}
            onClick={() => toggleFilterType('events')}
          >
            {isFilterSelected('events') && <Check className="h-3 w-3 mr-1" />}
            Events
          </button>
        </div>
        <p className="text-xs text-gray-400 px-1">Select multiple venue types to narrow results</p>
      </div>
    </div>
  );
};

export default FilterBar;