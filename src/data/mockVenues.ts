import { Venue } from '../types';

export const mockVenues: Venue[] = [
  {
    id: '1',
    name: "Bernie's Pizza Martini Bar",
    rating: 4.7,
    reviewCount: 660,
    priceRange: '$$',
    location: {
      address: 'Dollard-des-Ormeaux',
      city: 'Montreal',
      distance: '3.7 mi',
      lat: 45.4801,
      lng: -73.8288
    },
    photos: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      'https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    type: 'Pizza',
    available: true
  },
  {
    id: '2',
    name: 'Velvet Lounge',
    rating: 4.5,
    reviewCount: 482,
    priceRange: '$$$',
    location: {
      address: 'Downtown',
      city: 'Montreal',
      distance: '2.1 mi',
      lat: 45.5017,
      lng: -73.5673
    },
    photos: [
      'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1429&q=80',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
    ],
    type: 'Lounge',
    available: true
  },
  {
    id: '3',
    name: 'Skyline Club',
    rating: 4.8,
    reviewCount: 789,
    priceRange: '$$$',
    location: {
      address: 'Old Montreal',
      city: 'Montreal',
      distance: '1.8 mi',
      lat: 45.5088,
      lng: -73.5544
    },
    photos: [
      'https://images.unsplash.com/photo-1628784230353-5bee16e2f005?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    type: 'Club',
    available: true
  },
  {
    id: '4',
    name: 'Midnight Tavern',
    rating: 4.3,
    reviewCount: 356,
    priceRange: '$$',
    location: {
      address: 'Plateau Mont-Royal',
      city: 'Montreal',
      distance: '2.5 mi',
      lat: 45.5168,
      lng: -73.5832
    },
    photos: [
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
      'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80'
    ],
    type: 'Bar',
    available: false
  },
  {
    id: '5',
    name: 'Fusion Lounge',
    rating: 4.6,
    reviewCount: 512,
    priceRange: '$$$',
    location: {
      address: 'Mile End',
      city: 'Montreal',
      distance: '3.2 mi',
      lat: 45.5236,
      lng: -73.6003
    },
    photos: [
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    type: 'Lounge',
    available: true
  },
  // Adding more nightclubs in Montreal
  {
    id: '6',
    name: 'Stereo Nightclub',
    rating: 4.7,
    reviewCount: 890,
    priceRange: '$$$',
    location: {
      address: '858 Rue Sainte-Catherine E',
      city: 'Montreal',
      distance: '1.2 mi',
      lat: 45.5169,
      lng: -73.5625
    },
    photos: [
      'https://images.unsplash.com/photo-1571204829887-3b8d69e23af5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1545128485-c400ce7b6892?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    type: 'Nightclub',
    available: true
  },
  {
    id: '7',
    name: 'New City Gas',
    rating: 4.5,
    reviewCount: 1250,
    priceRange: '$$$',
    location: {
      address: '950 Rue Ottawa',
      city: 'Montreal',
      distance: '1.8 mi',
      lat: 45.4936,
      lng: -73.5630
    },
    photos: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1581974944026-5d6ed762f617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    type: 'Nightclub',
    available: true
  },
  {
    id: '8',
    name: 'Club Soda',
    rating: 4.4,
    reviewCount: 780,
    priceRange: '$$',
    location: {
      address: '1225 Blvd St-Laurent',
      city: 'Montreal',
      distance: '1.5 mi',
      lat: 45.5098,
      lng: -73.5644
    },
    photos: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1571204829887-3b8d69e23af5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    type: 'Nightclub',
    available: true
  },
  {
    id: '9',
    name: 'Circus Afterhours',
    rating: 4.3,
    reviewCount: 650,
    priceRange: '$$',
    location: {
      address: '917 Rue Ste-Catherine E',
      city: 'Montreal',
      distance: '1.7 mi',
      lat: 45.5175,
      lng: -73.5590
    },
    photos: [
      'https://images.unsplash.com/photo-1545128485-c400ce7b6892?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    type: 'Nightclub',
    available: true
  },
  {
    id: '10',
    name: 'Le Rouge Bar',
    rating: 4.6,
    reviewCount: 420,
    priceRange: '$$$',
    location: {
      address: '7 Prince Arthur E',
      city: 'Montreal',
      distance: '2.0 mi',
      lat: 45.5153,
      lng: -73.5702
    },
    photos: [
      'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
    ],
    type: 'Lounge',
    available: true
  }
];