import React, { useEffect } from 'react';
import { Venue } from '../types';
import { ChevronDown, Clock } from 'lucide-react';

interface VenueDetailViewProps {
  venue: Venue;
  onClose: () => void;
  onReserve: (venue: Venue) => void;
  onGuestList: (venue: Venue) => void;
  selectedTime?: string;
  selectedTableType?: string;
}

const VenueDetailView: React.FC<VenueDetailViewProps> = ({
  venue,
  onClose,
  onReserve,
  onGuestList,
  selectedTime,
  selectedTableType
}) => {
  // Add useEffect for debugging
  useEffect(() => {
    console.log('VenueDetailView rendered with:');
    console.log('Venue:', venue.name);
    console.log('Selected Time:', selectedTime);
    console.log('Selected Table Type:', selectedTableType);
  }, [venue, selectedTime, selectedTableType]);

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Venue image with overlay */}
      <div className="relative h-2/3 w-full">
        <img 
          src={venue.photos[0]} 
          alt={venue.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 rounded-full p-2"
        >
          <ChevronDown className="h-6 w-6 text-white" />
        </button>
        
        {/* Venue name */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl font-bold text-white">{venue.name}</h1>
          
          {/* Selected time display */}
          {selectedTime && (
            <div className="flex items-center mt-2 bg-black/50 rounded-lg px-3 py-2 w-fit">
              <Clock className="h-4 w-4 mr-2 text-red-500" />
              <span className="text-white font-medium">
                {selectedTime} {selectedTableType && `• ${selectedTableType}`}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-center bg-black">
        <button 
          onClick={() => {
            console.log('Reserve button clicked for:', venue.name);
            onReserve(venue);
          }}
          className="w-full py-4 bg-gray-200 text-black rounded-lg text-xl font-medium"
        >
          {selectedTime ? `Reserve Table for ${selectedTime}` : 'Reserve Table'}
        </button>
        
        <button 
          onClick={() => {
            console.log('Guest List button clicked for:', venue.name);
            onGuestList(venue);
          }}
          className="w-full py-4 bg-gray-200 text-black rounded-lg text-xl font-medium"
        >
          {selectedTime ? `Guest List for ${selectedTime}` : 'Reso Guest List'}
        </button>
      </div>
    </div>
  );
};

export default VenueDetailView; 