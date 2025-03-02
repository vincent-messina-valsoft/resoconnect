import React, { useState } from 'react';
import { Venue, FilterOptions } from '../types';
import { MapPin, Star, Clock, Bell, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface VenueListViewProps {
  venues: Venue[];
  filters: FilterOptions;
  onVenueSelect: (venue: Venue) => void;
  onReserve: (venue: Venue, time: string, tableType: string) => void;
  onNotify: (venue: Venue, time: string, tableType: string) => void;
  onClose?: () => void;
}

// Remove mock time slots since we now have them in the venue data

const VenueListView: React.FC<VenueListViewProps> = ({
  venues,
  filters,
  onVenueSelect,
  onReserve,
  onNotify,
  onClose
}) => {
  const [currentPhotoIndices, setCurrentPhotoIndices] = useState<Record<string, number>>({});

  const handleNextPhoto = (venueId: string, maxPhotos: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndices(prev => ({
      ...prev,
      [venueId]: ((prev[venueId] || 0) + 1) % maxPhotos
    }));
  };

  const handlePrevPhoto = (venueId: string, maxPhotos: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndices(prev => ({
      ...prev,
      [venueId]: (prev[venueId] || 0) === 0 ? maxPhotos - 1 : (prev[venueId] || 0) - 1
    }));
  };

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Header with close button */}
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-bold">Available Venues</h2>
        {onClose && (
          <div 
            className="bg-gray-800 rounded-full p-2 cursor-pointer"
            onClick={onClose}
          >
            <ChevronDown className="h-5 w-5 text-white" />
          </div>
        )}
      </div>
      
      {/* Venue list */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Venue cards */}
        <div className="space-y-4 p-4">
          {venues.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg">No venues match your selected filters</p>
              <p className="text-gray-500 mt-2">Try selecting different filter options</p>
            </div>
          ) : (
            venues.map((venue) => {
              const currentPhotoIndex = currentPhotoIndices[venue.id] || 0;
              return (
                <div 
                  key={venue.id} 
                  className="border-b border-gray-800 p-4"
                  onClick={() => onVenueSelect(venue)}
                >
                  {/* Venue image carousel */}
                  <div className="relative h-48 mb-3 rounded-lg overflow-hidden">
                    <img
                      src={venue.photos[currentPhotoIndex]}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Image navigation arrows */}
                    {venue.photos.length > 1 && (
                      <>
                        <button
                          onClick={(e) => handlePrevPhoto(venue.id, venue.photos.length, e)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2"
                        >
                          <ChevronLeft className="h-5 w-5 text-white" />
                        </button>
                        <button
                          onClick={(e) => handleNextPhoto(venue.id, venue.photos.length, e)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2"
                        >
                          <ChevronRight className="h-5 w-5 text-white" />
                        </button>
                        
                        {/* Image dots indicator */}
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                          {venue.photos.map((_, index) => (
                            <div 
                              key={index} 
                              className={`w-2 h-2 rounded-full ${
                                index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Venue info */}
                  <div className="mb-3">
                    <h3 className="text-lg font-bold">{venue.name}</h3>
                    <div className="flex items-center text-sm mt-1">
                      <Star className="h-4 w-4 text-red-500 fill-red-500" />
                      <span className="ml-1">{venue.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{venue.type}</span>
                      <span className="mx-1">•</span>
                      <span>{venue.priceRange}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{venue.location.distance}</span>
                    </div>
                  </div>
                  
                  {/* Time slots */}
                  <div className="flex overflow-x-auto pb-2 space-x-2">
                    {venue.timeSlots && venue.timeSlots.map((slot, index) => (
                      <div key={index} className="flex-shrink-0">
                        {slot.available ? (
                          <button
                            type="button"
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
                            onClick={(e) => {
                              // Prevent the event from bubbling up to the venue card
                              e.preventDefault();
                              e.stopPropagation();
                              
                              // Log for debugging
                              console.log(`Time slot clicked: ${slot.time} ${slot.type} for ${venue.name}`);
                              
                              // Call the onReserve function
                              onReserve(venue, slot.time, slot.type);
                            }}
                          >
                            {slot.time} {slot.type}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center"
                            onClick={(e) => {
                              // Prevent the event from bubbling up to the venue card
                              e.preventDefault();
                              e.stopPropagation();
                              
                              // Call the onNotify function
                              onNotify(venue, slot.time, slot.type);
                            }}
                          >
                            <Bell className="h-3 w-3 mr-1" />
                            Notify {slot.time}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Date/time filter indicator */}
      <div className="sticky bottom-0 p-4 bg-black/90 border-t border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-gray-400 text-sm mr-2">{filters.partySize}.</span>
          <span className="text-white text-sm font-medium">{filters.date} - {filters.time}</span>
        </div>
        <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm">
          Change
        </button>
      </div>
    </div>
  );
};

export default VenueListView; 