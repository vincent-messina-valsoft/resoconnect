export interface Venue {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  location: {
    address: string;
    city: string;
    distance: string;
    lat: number;
    lng: number;
  };
  photos: string[];
  type: string;
  available: boolean;
}

export interface Reservation {
  id: string;
  venueId: string;
  userId: string;
  venueName: string;
  partySize: number;
  date: string;
  time: string;
  confirmationCode: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}

export interface FilterOptions {
  partySize: number;
  date: string;
  time: string;
  filterType: 'available' | 'collections' | 'lists' | 'events' | 'all';
}

export interface Editorial {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

export interface List {
  id: string;
  name: string;
  userId: string;
  venues: string[];
}