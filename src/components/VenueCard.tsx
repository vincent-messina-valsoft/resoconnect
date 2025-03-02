import React, { useState } from 'react';
import { Star, MapPin, Heart } from 'lucide-react';
import { Venue } from '../types';

interface VenueCardProps {
  venue: Venue;
  onReserve: (venue: Venue) => void;
  onFavorite: (venueId: string) => void;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue, onReserve, onFavorite }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % venue.photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? venue.photos.length - 1 : prev - 1));
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite(venue.id);
  };

  return (
    <div className="bg-black text-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-64">
        <img
          src={venue.photos[currentPhotoIndex]}
          alt={venue.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {venue.photos.length > 1 && (
          <>
            <button
              onClick={handlePrevPhoto}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-1"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextPhoto}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-1"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-1 p-2">
          {venue.photos.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentPhotoIndex(index)}
            />
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{venue.name}</h3>
          <button
            onClick={handleFavorite}
            className="text-gray-300 hover:text-red-500 focus:outline-none"
          >
            <Heart className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
        
        <div className="flex items-center mt-1">
          <Star className="h-5 w-5 text-red-500 fill-red-500" />
          <span className="ml-1 font-bold">{venue.rating}</span>
          <span className="ml-1 text-gray-400">({venue.reviewCount})</span>
          <span className="mx-2">•</span>
          <span>{venue.type}</span>
          <span className="mx-2">•</span>
          <span>{venue.priceRange}</span>
        </div>
        
        <div className="flex items-center mt-2 text-gray-400">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{venue.location.address}</span>
          <span className="mx-1">•</span>
          <span>{venue.location.distance}</span>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;