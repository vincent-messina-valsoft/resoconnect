import React, { useState, useEffect } from 'react';
import { Venue } from '../types';
import { ChevronUp, ChevronDown, MapPin, List } from 'lucide-react';
import { pointsOfInterest } from '../data/pointsOfInterest';

interface VenueListProps {
  venues: Venue[];
  onVenueSelect: (venue: Venue) => void;
  onExpandChange?: (isExpanded: boolean) => void;
  showPOIs?: boolean;
  onToggleShowPOIs?: (show: boolean) => void;
}

const VenueList: React.FC<VenueListProps> = ({ 
  venues, 
  onVenueSelect, 
  onExpandChange,
  showPOIs = true,
  onToggleShowPOIs
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (onExpandChange) {
      onExpandChange(isExpanded);
    }
  }, [isExpanded, onExpandChange]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleShowPOIs = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleShowPOIs) {
      onToggleShowPOIs(!showPOIs);
    }
  };

  return (
    <div 
      className={`bg-black text-white transition-all duration-300 ${
        isExpanded 
          ? 'fixed inset-0 z-50' 
          : 'rounded-t-lg shadow-lg overflow-hidden'
      }`}
      style={{
        maxHeight: isExpanded ? '100vh' : '30vh'
      }}
    >
      {/* Header with toggle arrow */}
      <div 
        className="p-4 border-b border-gray-800 flex justify-between items-center cursor-pointer"
        onClick={toggleExpanded}
      >
        <div>
          <h2 className="text-lg font-bold">Available Venues</h2>
          <div className="flex items-center">
            <div 
              className="flex items-center text-sm text-gray-400 cursor-pointer"
              onClick={toggleShowPOIs}
            >
              <MapPin className="h-3 w-3 mr-1" />
              <span className={showPOIs ? 'text-white' : 'text-gray-400'}>
                {pointsOfInterest.length} points of interest
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 rounded-full p-2">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-white" />
            ) : (
              <ChevronUp className="h-5 w-5 text-white" />
            )}
          </div>
          {!isExpanded && (
            <span className="text-xs text-gray-400 mt-1 flex items-center">
              <List className="h-3 w-3 mr-1" />
              List View
            </span>
          )}
        </div>
      </div>

      {/* Venue list */}
      <div className={`overflow-y-auto ${isExpanded ? 'h-[calc(100vh-180px)]' : 'max-h-[calc(30vh-120px)]'}`}>
        {venues.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No venues match your selected filters</p>
            <p className="text-gray-500 mt-2">Try selecting different filter options</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-800">
            {venues.map(venue => (
              <li 
                key={venue.id} 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-900 transition-colors"
                onClick={() => onVenueSelect(venue)}
              >
                <div className="flex-1">
                  <h3 className="font-medium">{venue.name}</h3>
                  <div className="flex items-center text-xs mt-1">
                    <span className="text-red-500">★</span>
                    <span className="ml-1">{venue.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{venue.priceRange}</span>
                    <span className="mx-1">•</span>
                    <span>{venue.type}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{venue.location.address}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VenueList; 