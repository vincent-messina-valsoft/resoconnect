import React, { useState } from 'react';
import { Heart, MapPin, Star } from 'lucide-react';
import { Venue } from '../types';
import { mockVenues } from '../data/mockVenues.ts';
import Logo from './Logo.tsx';

interface DiscoverTabProps {
  onVenueSelect: (venue: Venue) => void;
}

const DiscoverTab: React.FC<DiscoverTabProps> = ({ onVenueSelect }) => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const handleFavorite = (venueId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [venueId]: !prev[venueId]
    }));
  };

  const editorialContent = [
    {
      id: 'editorial1',
      title: 'Sandwiches of the Future',
      imageUrl: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description: 'Exploring new sandwich concepts across Montreal'
    },
    {
      id: 'editorial2',
      title: 'Montreal After Dark',
      imageUrl: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1429&q=80',
      description: 'The best nightlife venues in the city'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-black text-white overflow-y-auto pb-20">
      {/* Logo and Location header */}
      <div className="sticky top-0 z-10 bg-black p-4">
        <div className="mb-2">
          <Logo />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Pointe-Claire, QC, Canada</h1>
        </div>
      </div>
      
      {/* Nearby section */}
      <div className="px-4 mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Nearby</h2>
        </div>
        
        <div className="space-y-4">
          {mockVenues.map(venue => (
            <div 
              key={venue.id}
              className="flex items-start space-x-3 cursor-pointer"
              onClick={() => onVenueSelect(venue)}
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={venue.photos[0]} 
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-lg">{venue.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-red-500 fill-red-500" />
                  <span className="ml-1 text-red-500 font-bold">{venue.rating}</span>
                  <span className="ml-1 text-gray-400">({venue.reviewCount})</span>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className="text-gray-200">{venue.type}</span>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className="text-gray-200">{venue.priceRange}</span>
                </div>
                <div className="flex items-center mt-1 text-gray-400">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{venue.location.address}</span>
                </div>
              </div>
              
              <button 
                onClick={(e) => handleFavorite(venue.id, e)}
                className="p-2"
              >
                <Heart 
                  className={`h-6 w-6 ${
                    favorites[venue.id] ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }`} 
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* World of Resy section */}
      <div className="px-4 mb-8">
        <h2 className="text-2xl font-bold mb-4">World of Resy</h2>
        
        <div className="space-y-4">
          {editorialContent.map(content => (
            <div key={content.id} className="rounded-lg overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={content.imageUrl} 
                  alt={content.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold">{content.title}</h3>
                  <p className="text-sm text-gray-300">{content.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverTab;