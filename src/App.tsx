import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './components/SearchBar.tsx';
import FilterBar from './components/FilterBar.tsx';
import VenueCard from './components/VenueCard.tsx';
import Map from './components/Map.tsx';
import BottomNav from './components/BottomNav.tsx';
import ReservationModal from './components/ReservationModal.tsx';
import ReservationConfirmation from './components/ReservationConfirmation.tsx';
import Sidebar from './components/Sidebar.tsx';
import DiscoverTab from './components/DiscoverTab.tsx';
import AccountTab from './components/AccountTab.tsx';
import FilterModal from './components/FilterModal.tsx';
import Logo from './components/Logo.tsx';
import { mockVenues } from './data/mockVenues.ts';
import { Venue, FilterOptions } from './types';
import { ArrowDown, Filter } from 'lucide-react';

function App() {
  const [venues, setVenues] = useState<Venue[]>(mockVenues);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState({
    venue: mockVenues[0],
    partySize: 2,
    date: 'Today',
    time: '7:00 PM',
    confirmationCode: ''
  });
  const [activeTab, setActiveTab] = useState<'discover' | 'search' | 'account'>('discover');
  const [mapCenter, setMapCenter] = useState({ lat: 45.5017, lng: -73.5673 }); // Montreal
  const [filters, setFilters] = useState<FilterOptions>({
    partySize: 2,
    date: 'Today',
    time: 'All Day',
    filterType: 'available'
  });
  const [cardPosition, setCardPosition] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const startY = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Filter venues based on selected filters
  useEffect(() => {
    let filteredVenues = [...mockVenues];
    
    if (filters.filterType === 'available') {
      filteredVenues = filteredVenues.filter(venue => venue.available);
    }
    
    setVenues(filteredVenues);
  }, [filters]);

  const handleSearch = (query: string) => {
    if (!query) {
      setVenues(mockVenues);
      return;
    }
    
    const filtered = mockVenues.filter(venue => 
      venue.name.toLowerCase().includes(query.toLowerCase()) ||
      venue.type.toLowerCase().includes(query.toLowerCase()) ||
      venue.location.address.toLowerCase().includes(query.toLowerCase())
    );
    
    setVenues(filtered);
  };

  const handleLocationClick = () => {
    // In a real app, this would use the browser's geolocation API
    // For demo purposes, we'll just center on Montreal
    setMapCenter({ lat: 45.5017, lng: -73.5673 });
  };

  const handleVenueSelect = (venue: Venue) => {
    setSelectedVenue(venue);
    setCardPosition(0); // Reset card position when selecting a new venue
  };

  const handleReserve = (venue: Venue) => {
    setSelectedVenue(venue);
    setShowReservationModal(true);
  };

  const handleFavorite = (venueId: string) => {
    // In a real app, this would save to user's favorites
    console.log(`Added venue ${venueId} to favorites`);
  };

  const handleConfirmReservation = (venueId: string, partySize: number, date: string, time: string) => {
    // In a real app, this would make an API call to create the reservation
    const venue = venues.find(v => v.id === venueId);
    if (!venue) return;
    
    // Generate a random confirmation code
    const confirmationCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    setConfirmationDetails({
      venue,
      partySize,
      date,
      time,
      confirmationCode
    });
    
    setShowConfirmation(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!cardRef.current) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    
    // Only allow swiping down
    if (diff > 0) {
      setCardPosition(diff);
    }
  };

  const handleTouchEnd = () => {
    if (cardPosition > 100) {
      // If swiped down more than 100px, dismiss the card
      setSelectedVenue(null);
    }
    
    // Reset position
    setCardPosition(0);
  };

  const dismissCard = () => {
    setSelectedVenue(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openFilterModal = () => {
    setShowFilterModal(true);
  };

  const handleApplyFilters = (newFilters: any) => {
    // In a real app, this would apply the filters and update the venue list
    console.log('Applying filters:', newFilters);
    setShowFilterModal(false);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {activeTab === 'discover' ? (
        <DiscoverTab onVenueSelect={handleVenueSelect} />
      ) : activeTab === 'account' ? (
        <AccountTab />
      ) : (
        <>
          {/* Top search bar with logo */}
          <div className="p-4 bg-black/80 shadow-md z-10">
            <div className="mb-2">
              <Logo />
            </div>
            <SearchBar onSearch={handleSearch} onLocationClick={handleLocationClick} />
          </div>
          
          {/* Filter bar */}
          <div className="px-4 py-2 bg-black/80 z-10">
            <FilterBar filters={filters} onFilterChange={setFilters} />
          </div>
          
          {/* Main content */}
          <div className="flex-1 relative overflow-hidden">
            {/* Map */}
            <div className="absolute inset-0">
              <Map 
                venues={venues} 
                center={mapCenter} 
                onVenueSelect={handleVenueSelect} 
              />
            </div>
            
            {/* Filter button */}
            <button 
              onClick={openFilterModal}
              className="absolute bottom-24 right-4 bg-black text-white p-3 rounded-full shadow-lg z-10"
            >
              <Filter className="h-6 w-6" />
            </button>
            
            {/* Selected venue card */}
            {selectedVenue && (
              <div 
                ref={cardRef}
                className="absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-out"
                style={{ transform: `translateY(${cardPosition}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Pull down handle */}
                <div 
                  className="flex justify-center items-center h-8 bg-black/90 rounded-t-lg cursor-pointer"
                  onClick={dismissCard}
                >
                  <ArrowDown className="h-5 w-5 text-gray-400" />
                  <span className="text-xs text-gray-400 ml-1">Swipe down to dismiss</span>
                </div>
                
                <div className="p-4 pb-20">
                  <VenueCard 
                    venue={selectedVenue} 
                    onReserve={() => handleReserve(selectedVenue)}
                    onFavorite={handleFavorite}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Bottom navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Reservation modal */}
      {selectedVenue && (
        <ReservationModal
          venue={selectedVenue}
          filters={filters}
          isOpen={showReservationModal}
          onClose={() => setShowReservationModal(false)}
          onReserve={handleConfirmReservation}
        />
      )}
      
      {/* Confirmation modal */}
      <ReservationConfirmation
        venue={confirmationDetails.venue}
        partySize={confirmationDetails.partySize}
        date={confirmationDetails.date}
        time={confirmationDetails.time}
        confirmationCode={confirmationDetails.confirmationCode}
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />

      {/* Filter modal */}
      <FilterModal 
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
}

export default App;