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
import VenueList from './components/VenueList.tsx';
import VenueListView from './components/VenueListView.tsx';
import { pointsOfInterest } from './data/pointsOfInterest.ts';
import VenueDetailView from './components/VenueDetailView.tsx';
import GuestListModal from './components/GuestListModal.tsx';
import TableReservationView from './components/TableReservationView.tsx';

function App() {
  const [venues, setVenues] = useState<Venue[]>(mockVenues);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isVenueListExpanded, setIsVenueListExpanded] = useState(false);
  const [showPOIs, setShowPOIs] = useState(true);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [reservationTime, setReservationTime] = useState('');
  const [reservationTableType, setReservationTableType] = useState('');
  const [confirmationDetails, setConfirmationDetails] = useState({
    venue: mockVenues[0],
    partySize: 2,
    date: 'Today',
    time: '7:00 PM',
    confirmationCode: '',
    tableDetails: null
  });
  const [activeTab, setActiveTab] = useState<'discover' | 'search' | 'account'>('search');
  const [mapCenter, setMapCenter] = useState({ lat: 45.5017, lng: -73.5673 }); // Montreal
  const [filters, setFilters] = useState<FilterOptions>({
    partySize: 2,
    date: 'Today',
    time: 'All Day',
    selectedFilters: ['available']
  });
  const [cardPosition, setCardPosition] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const startY = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showGuestListModal, setShowGuestListModal] = useState(false);
  const [guestListVenue, setGuestListVenue] = useState<Venue | null>(null);
  const [showTableReservation, setShowTableReservation] = useState(false);
  const [selectedTableDetails, setSelectedTableDetails] = useState<{
    id: string;
    tier: string;
    capacity: number;
  } | null>(null);
  const [tableInquiries, setTableInquiries] = useState<{
    venueId: string;
    tableId: string;
    tier: string;
    deposit: number;
    men: number;
    women: number;
  }[]>([]);

  // Filter venues based on selected filters
  useEffect(() => {
    // Filter venues based on the selectedFilters array
    let filteredVenues = [...mockVenues];
    
    // If 'all' is selected, show all venues
    if (filters.selectedFilters.includes('all')) {
      setVenues(filteredVenues);
      return;
    }
    
    // Filter by availability if 'available' is selected
    if (filters.selectedFilters.includes('available')) {
      filteredVenues = filteredVenues.filter(venue => venue.available);
    }
    
    // Filter by venue types (nightclub, lounge, bar)
    const venueTypeFilters = filters.selectedFilters.filter(
      filter => ['nightclub', 'lounge', 'bar'].includes(filter)
    );
    
    if (venueTypeFilters.length > 0) {
      filteredVenues = filteredVenues.filter(venue => {
        const venueType = venue.type.toLowerCase();
        return venueTypeFilters.some(filter => {
          // Map filter categories to actual venue types
          if (filter === 'nightclub') {
            return venueType === 'nightclub' || venueType === 'club';
          } else if (filter === 'lounge') {
            return venueType === 'lounge';
          } else if (filter === 'bar') {
            return venueType === 'bar' || venueType.includes('bar');
          }
          return false;
        });
      });
    }
    
    // Filter by events if 'events' is selected
    if (filters.selectedFilters.includes('events')) {
      // In a real app, this would filter venues with upcoming events
      // For now, we'll just use a simple condition as an example
      filteredVenues = filteredVenues.filter(venue => 
        venue.name.includes('Event') || venue.type.includes('Event')
      );
    }
    
    setVenues(filteredVenues);
  }, [filters]);

  // When venue list expands, dismiss the selected venue card
  useEffect(() => {
    if (isVenueListExpanded && selectedVenue) {
      setSelectedVenue(null);
    }
    
    // Set view mode to list when expanded, map when collapsed
    if (isVenueListExpanded) {
      setViewMode('list');
    } else {
      setViewMode('map');
    }
  }, [isVenueListExpanded, selectedVenue]);

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
    // Instead of immediately showing the reservation modal,
    // show the table reservation view first
    setSelectedVenue(venue);
    setShowTableReservation(true);
  };

  const handleTableReserve = (tableId: string, tier: string, capacity: number) => {
    setSelectedTableDetails({
      id: tableId,
      tier,
      capacity
    });
    // Now show the reservation modal with the selected table details
    setShowTableReservation(false);
    setShowReservationModal(true);
  };

  const handleReserveWithTime = (venue: Venue, time: string, tableType: string) => {
    console.log(`handleReserveWithTime called: ${venue.name}, ${time}, ${tableType}`);
    
    // Reset any conflicting states
    setShowTableReservation(false);
    setShowReservationModal(false);
    setShowConfirmation(false);
    setShowFilterModal(false);
    setShowGuestListModal(false);
    
    // Set the selected venue and time
    setSelectedVenue(venue);
    setReservationTime(time);
    setReservationTableType(tableType);
    
    // Switch to map view and close the list view
    setViewMode('map');
    setIsVenueListExpanded(false);
    
    // Add a small delay to ensure state updates are processed
    setTimeout(() => {
      console.log('After timeout - Selected venue:', venue.name);
      console.log('After timeout - Reservation time:', time);
      console.log('After timeout - Table type:', tableType);
    }, 100);
  };

  const handleNotify = (venue: Venue, time: string, tableType: string) => {
    // In a real app, this would set up a notification
    console.log(`Setting up notification for ${venue.name} at ${time} for ${tableType}`);
    alert(`You'll be notified when a ${tableType} becomes available at ${venue.name} for ${time}`);
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
      time: reservationTime || time,
      confirmationCode,
      tableDetails: selectedTableDetails
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

  const handleVenueListExpandChange = (expanded: boolean) => {
    setIsVenueListExpanded(expanded);
  };

  const handleToggleShowPOIs = (show: boolean) => {
    setShowPOIs(show);
  };

  const handleCloseListView = () => {
    setIsVenueListExpanded(false);
  };

  const handleGuestList = (venue: Venue) => {
    setGuestListVenue(venue);
    setShowGuestListModal(true);
  };

  const handleGuestListSubmit = (name: string, email: string, phone: string, partySize: number) => {
    // In a real app, this would make an API call to add the user to the guest list
    console.log(`Adding ${name} to guest list for ${guestListVenue?.name}`);
    console.log(`Email: ${email}, Phone: ${phone}, Party Size: ${partySize}`);
    
    // Close the modal
    setShowGuestListModal(false);
    
    // Show confirmation
    alert(`You've been added to the guest list for ${guestListVenue?.name}!`);
  };

  const handleLogoClick = () => {
    // Reset to home page (map view)
    setActiveTab('search');
    setSelectedVenue(null);
    setShowTableReservation(false);
    setIsVenueListExpanded(false);
    setViewMode('map');
    // Reset any other state that might prevent showing the map
    setShowReservationModal(false);
    setShowConfirmation(false);
    setShowFilterModal(false);
    setShowGuestListModal(false);
  };

  const handleTableInquiry = (
    venueId: string, 
    tableId: string, 
    tier: string, 
    deposit: number, 
    men: number, 
    women: number
  ) => {
    // Add the inquiry to the list
    setTableInquiries(prev => [
      ...prev,
      { venueId, tableId, tier, deposit, men, women }
    ]);
    
    // In a real app, this would send the inquiry to the backend
    console.log(`Table inquiry received for venue ${venueId}, table ${tableId}`);
    console.log(`Tier: ${tier}, Deposit: $${deposit}`);
    console.log(`Party: ${men} men, ${women} women`);
    
    // Show confirmation and close the table reservation view
    alert(`Your inquiry for ${selectedVenue?.name} has been sent! We'll contact you shortly.`);
    setShowTableReservation(false);
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
              <Logo onLogoClick={handleLogoClick} />
            </div>
            <SearchBar onSearch={handleSearch} onLocationClick={handleLocationClick} />
          </div>
          
          {/* Filter bar - visible in both map and list views */}
          <div className="px-4 py-2 bg-black/80 z-10 sticky top-0">
            <FilterBar filters={filters} onFilterChange={setFilters} />
            {viewMode === 'map' && (
              <div className="flex justify-between items-center text-xs text-gray-400 mt-1 px-1">
                <span>{pointsOfInterest.length} points of interest shown on map</span>
              </div>
            )}
          </div>
          
          {/* Main content */}
          <div className="flex-1 relative overflow-hidden">
            {showTableReservation && selectedVenue ? (
              <TableReservationView 
                venue={selectedVenue}
                onBack={() => setShowTableReservation(false)}
                onReserve={handleTableReserve}
                onInquiry={(tableId, tier, deposit, men, women) => 
                  handleTableInquiry(selectedVenue.id, tableId, tier, deposit, men, women)
                }
              />
            ) : selectedVenue ? (
              // Show venue detail view when a venue is selected
              <VenueDetailView 
                venue={selectedVenue}
                onClose={() => {
                  setSelectedVenue(null);
                  // Clear reservation time and table type when closing
                  setReservationTime('');
                  setReservationTableType('');
                }}
                onReserve={handleReserve}
                onGuestList={handleGuestList}
                selectedTime={reservationTime}
                selectedTableType={reservationTableType}
              />
            ) : viewMode === 'map' ? (
              <>
                {/* Map */}
                <div className="absolute inset-0">
                  <Map 
                    venues={venues} 
                    center={mapCenter} 
                    onVenueSelect={handleVenueSelect}
                    showPOIs={showPOIs}
                    onTableReservation={(venue) => {
                      // First select the venue
                      setSelectedVenue(venue);
                      // Then show table reservation view
                      setShowTableReservation(true);
                    }}
                    onGuestList={(venue) => {
                      // Handle guest list action
                      handleGuestList(venue);
                    }}
                  />
                </div>
                
                {/* Venue list */}
                <div className="absolute bottom-16 left-0 right-0 z-10">
                  <VenueList 
                    venues={venues}
                    onVenueSelect={handleVenueSelect}
                    onExpandChange={handleVenueListExpandChange}
                    showPOIs={showPOIs}
                    onToggleShowPOIs={handleToggleShowPOIs}
                  />
                </div>
                
                {/* Filter button - hide when venue list is expanded */}
                {!isVenueListExpanded && (
                  <button 
                    onClick={openFilterModal}
                    className="absolute bottom-24 right-4 bg-black text-white p-3 rounded-full shadow-lg z-20"
                  >
                    <Filter className="h-6 w-6" />
                  </button>
                )}
              </>
            ) : (
              /* List View */
              <VenueListView 
                venues={venues}
                filters={filters}
                onVenueSelect={handleVenueSelect}
                onReserve={handleReserveWithTime}
                onNotify={handleNotify}
                onClose={handleCloseListView}
              />
            )}
          </div>
        </>
      )}
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Bottom navigation - hide when venue list is expanded or venue is selected */}
      {!isVenueListExpanded && !selectedVenue && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
      
      {/* Reservation modal */}
      {selectedVenue && (
        <ReservationModal
          venue={selectedVenue}
          filters={filters}
          isOpen={showReservationModal}
          onClose={() => setShowReservationModal(false)}
          onReserve={handleConfirmReservation}
          preselectedTime={reservationTime}
          selectedTable={selectedTableDetails}
        />
      )}
      
      {/* Confirmation modal */}
      <ReservationConfirmation
        venue={confirmationDetails.venue}
        partySize={confirmationDetails.partySize}
        date={confirmationDetails.date}
        time={confirmationDetails.time}
        confirmationCode={confirmationDetails.confirmationCode}
        tableDetails={confirmationDetails.tableDetails}
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />

      {/* Filter modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
      />

      {/* Guest List Modal */}
      {guestListVenue && (
        <GuestListModal
          venue={guestListVenue}
          isOpen={showGuestListModal}
          onClose={() => setShowGuestListModal(false)}
          onSubmit={handleGuestListSubmit}
        />
      )}
    </div>
  );
}

export default App;