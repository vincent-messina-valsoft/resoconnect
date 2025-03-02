import { Venue } from '../types';

export interface PointOfInterest {
  id: string;
  name: string;
  type: 'restaurant' | 'bar' | 'club' | 'landmark' | 'shopping' | 'park';
  location: {
    lat: number;
    lng: number;
  };
  description?: string;
}

// Points of interest around Montreal
export const pointsOfInterest: PointOfInterest[] = [
  {
    id: 'poi-1',
    name: 'Mount Royal Park',
    type: 'park',
    location: {
      lat: 45.5048,
      lng: -73.5873
    },
    description: 'Large park with hiking trails and lookout points'
  },
  {
    id: 'poi-2',
    name: 'Old Port of Montreal',
    type: 'landmark',
    location: {
      lat: 45.5019,
      lng: -73.5497
    },
    description: 'Historic port area with shops and restaurants'
  },
  {
    id: 'poi-3',
    name: 'Notre-Dame Basilica',
    type: 'landmark',
    location: {
      lat: 45.5046,
      lng: -73.5566
    },
    description: 'Gothic Revival church with stunning interior'
  },
  {
    id: 'poi-4',
    name: 'Jean-Talon Market',
    type: 'shopping',
    location: {
      lat: 45.5364,
      lng: -73.6155
    },
    description: 'Popular food market with local produce'
  },
  {
    id: 'poi-5',
    name: 'Montreal Museum of Fine Arts',
    type: 'landmark',
    location: {
      lat: 45.4986,
      lng: -73.5795
    },
    description: 'Major art museum with diverse collections'
  },
  {
    id: 'poi-6',
    name: 'La Fontaine Park',
    type: 'park',
    location: {
      lat: 45.5272,
      lng: -73.5702
    },
    description: 'Urban park with a lake and recreational facilities'
  },
  {
    id: 'poi-7',
    name: 'St. Catherine Street',
    type: 'shopping',
    location: {
      lat: 45.5088,
      lng: -73.5878
    },
    description: 'Major shopping street with restaurants and entertainment'
  },
  {
    id: 'poi-8',
    name: 'Montreal Biodome',
    type: 'landmark',
    location: {
      lat: 45.5592,
      lng: -73.5499
    },
    description: 'Nature museum with replicated ecosystems'
  },
  {
    id: 'poi-9',
    name: 'Atwater Market',
    type: 'shopping',
    location: {
      lat: 45.4794,
      lng: -73.5747
    },
    description: 'Historic market with food vendors and specialty shops'
  },
  {
    id: 'poi-10',
    name: 'Montreal Botanical Garden',
    type: 'park',
    location: {
      lat: 45.5572,
      lng: -73.5574
    },
    description: 'Extensive gardens with themed sections and greenhouses'
  }
];

// Helper function to get POIs near a venue
export const getPOIsNearVenue = (venue: Venue, radius: number = 0.01): PointOfInterest[] => {
  return pointsOfInterest.filter(poi => {
    const distance = Math.sqrt(
      Math.pow(poi.location.lat - venue.location.lat, 2) + 
      Math.pow(poi.location.lng - venue.location.lng, 2)
    );
    return distance <= radius;
  });
}; 