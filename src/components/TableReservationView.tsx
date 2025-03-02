import React, { useState, useEffect } from 'react';
import { Venue } from '../types';
import { ChevronLeft } from 'lucide-react';

interface TableReservationViewProps {
  venue: Venue;
  onBack: () => void;
  onReserve: (tableId: string, tier: string, capacity: number) => void;
  onInquiry: (tableId: string, tier: string, deposit: number, men: number, women: number) => void;
}

// Define table tiers
type TableTier = 'Expensive' | 'Medium' | 'Low';

// Define Point of Interest types
type POIType = 'Nightclub' | 'Lounge' | 'Bar' | 'Event' | 'Entrance' | 'Restroom' | 'VIP';

// Define table data structure
interface Table {
  id: string;
  name: string;
  tier: TableTier;
  capacity: number;
  available: boolean;
  x: number;
  y: number;
}

// Define Point of Interest data structure
interface POI {
  id: string;
  name: string;
  type: POIType;
  description: string;
  x: number;
  y: number;
  icon?: string; // Optional icon name
}

const TableReservationView: React.FC<TableReservationViewProps> = ({
  venue,
  onBack,
  onReserve,
  onInquiry
}) => {
  // Mock tables data - in a real app, this would come from an API
  const [tables] = useState<Table[]>([
    { id: 'table1', name: 'Table 1', tier: 'Expensive', capacity: 8, available: true, x: 70, y: 30 },
    { id: 'table2', name: 'Table 2', tier: 'Expensive', capacity: 6, available: true, x: 30, y: 70 },
    { id: 'table3', name: 'Table 3', tier: 'Expensive', capacity: 6, available: false, x: 70, y: 70 },
    { id: 'table4', name: 'Table 4', tier: 'Medium', capacity: 4, available: true, x: 20, y: 40 },
    { id: 'table5', name: 'Table 5', tier: 'Medium', capacity: 4, available: true, x: 80, y: 40 },
    { id: 'table6', name: 'Table 6', tier: 'Low', capacity: 2, available: true, x: 40, y: 20 },
    { id: 'table7', name: 'Table 7', tier: 'Low', capacity: 2, available: true, x: 60, y: 20 },
  ]);

  // Mock Points of Interest data - in a real app, this would come from an API
  const [pointsOfInterest] = useState<POI[]>([
    { id: 'poi1', name: 'Main Entrance', type: 'Entrance', description: 'Main venue entrance', x: 50, y: 5 },
    { id: 'poi2', name: 'VIP Lounge', type: 'Lounge', description: 'Exclusive VIP area', x: 85, y: 15 },
    { id: 'poi3', name: 'Main Bar', type: 'Bar', description: 'Full-service main bar', x: 15, y: 15 },
    { id: 'poi4', name: 'Dance Floor', type: 'Nightclub', description: 'Main dance floor area', x: 50, y: 50 },
    { id: 'poi5', name: 'Event Stage', type: 'Event', description: 'Live performance stage', x: 50, y: 90 },
    { id: 'poi6', name: 'Men\'s Restroom', type: 'Restroom', description: 'Men\'s facilities', x: 10, y: 90 },
    { id: 'poi7', name: 'Women\'s Restroom', type: 'Restroom', description: 'Women\'s facilities', x: 90, y: 90 },
    { id: 'poi8', name: 'Bottle Service Bar', type: 'Bar', description: 'Premium bottle service', x: 85, y: 60 },
    { id: 'poi9', name: 'VIP Entrance', type: 'Entrance', description: 'Private VIP entrance', x: 95, y: 5 },
  ]);

  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [activePOITypes, setActivePOITypes] = useState<POIType[]>([]);
  const [showPOIDetails, setShowPOIDetails] = useState(false);
  const [showPriceOptions, setShowPriceOptions] = useState(false);
  const [partyComposition, setPartyComposition] = useState({
    men: 0,
    women: 0
  });
  const [minimumDeposit, setMinimumDeposit] = useState(0);

  // Define minimum deposits based on tier
  const tierDeposits = {
    'Expensive': 1000,
    'Medium': 500,
    'Low': 250
  };

  useEffect(() => {
    if (selectedTable) {
      // Set minimum deposit based on the tier
      setMinimumDeposit(tierDeposits[selectedTable.tier as keyof typeof tierDeposits] || 0);
      setShowPriceOptions(true);
    } else {
      setShowPriceOptions(false);
    }
  }, [selectedTable]);

  const handleTableSelect = (table: Table) => {
    if (table.available) {
      setSelectedTable(table.id === selectedTable?.id ? null : table);
    }
  };

  const handleTierSelect = (tier: string) => {
    // Toggle tier selection
    const newTier = tier === selectedTier ? null : tier;
    setSelectedTier(newTier);
    
    // If a table is selected but doesn't match the new tier, deselect it
    if (selectedTable && newTier && selectedTable.tier !== newTier) {
      setSelectedTable(null);
    }
  };

  const handleReserve = () => {
    if (selectedTable) {
      onReserve(selectedTable.id, selectedTable.tier, selectedTable.capacity);
    }
  };

  const handleInquiry = () => {
    const totalGuests = partyComposition.men + partyComposition.women;
    if (selectedTable && totalGuests > 0) {
      onInquiry(
        selectedTable.id,
        selectedTable.tier,
        minimumDeposit,
        partyComposition.men,
        partyComposition.women
      );
    } else if (selectedTable) {
      alert('Please add at least one guest to your party');
    } else {
      alert('Please select a table first');
    }
  };

  const incrementGuests = (type: 'men' | 'women') => {
    setPartyComposition(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const decrementGuests = (type: 'men' | 'women') => {
    setPartyComposition(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] - 1)
    }));
  };

  // Toggle POI type visibility
  const togglePOIType = (type: POIType) => {
    if (activePOITypes.includes(type)) {
      setActivePOITypes(prev => prev.filter(t => t !== type));
    } else {
      setActivePOITypes(prev => [...prev, type]);
    }
  };

  // Handle POI selection
  const handlePOISelect = (poi: POI) => {
    // If selecting the same POI, toggle selection off
    if (selectedPOI?.id === poi.id) {
      setSelectedPOI(null);
      return;
    }
    
    // Select new POI
    setSelectedPOI(poi);
    setShowPOIDetails(false);
    
    // Deselect table if POI is selected
    if (selectedTable) {
      setSelectedTable(null);
    }
  };
  
  // Show POI reservation details in panel
  const handleShowPOIDetails = () => {
    setShowPOIDetails(true);
  };

  // Count tables and capacity by tier
  const tierCounts = {
    Expensive: {
      count: tables.filter(t => t.tier === 'Expensive' && t.available).length,
      capacity: tables.filter(t => t.tier === 'Expensive' && t.available).reduce((sum, t) => sum + t.capacity, 0)
    },
    Medium: {
      count: tables.filter(t => t.tier === 'Medium' && t.available).length,
      capacity: tables.filter(t => t.tier === 'Medium' && t.available).reduce((sum, t) => sum + t.capacity, 0)
    },
    Low: {
      count: tables.filter(t => t.tier === 'Low' && t.available).length,
      capacity: tables.filter(t => t.tier === 'Low' && t.available).reduce((sum, t) => sum + t.capacity, 0)
    }
  };

  // POI icons mapping
  const poiIcons: Record<POIType, string> = {
    'Nightclub': '🎵', // Music note for nightclub
    'Lounge': '🛋️', // Couch for lounge
    'Bar': '🍸', // Cocktail for bar
    'Event': '🎭', // Performing arts for events
    'Entrance': '🚪', // Door for entrance
    'Restroom': '🚻', // Restroom symbol
    'VIP': '⭐', // Star for VIP areas
  };

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center">
        <button 
          onClick={onBack}
          className="mr-4 p-2 rounded-full bg-gray-800"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">{venue.name} - Reserve Table</h1>
      </div>

      {/* Tier filter */}
      <div className="px-4 py-3 border-b border-gray-800">
        <h3 className="text-lg font-bold mb-2">Filter by Tier</h3>
        <div className="flex space-x-2 overflow-x-auto pb-1">
          {['Expensive', 'Medium', 'Low'].map(tier => (
            <button
              key={tier}
              className={`px-4 py-2 rounded-lg flex-shrink-0 ${
                selectedTier === tier 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-white'
              }`}
              onClick={() => handleTierSelect(tier)}
            >
              {tier}
              <span className="ml-2 text-sm">
                ({tables.filter(t => t.tier === tier && t.available).length})
              </span>
            </button>
          ))}
          {selectedTier && (
            <button
              className="px-4 py-2 rounded-lg bg-gray-700 text-white flex-shrink-0"
              onClick={() => setSelectedTier(null)}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Table selection area */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Venue map */}
        <div className="relative bg-gray-900 rounded-lg h-64 mb-4 overflow-hidden">
          {/* DJ Booth */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white border-2 border-black rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xs">DJ BOOTH</span>
          </div>
          
          {/* Points of Interest */}
          {pointsOfInterest.map(poi => {
            const isSelected = selectedPOI?.id === poi.id;
            const isVisible = activePOITypes.length === 0 || activePOITypes.includes(poi.type);
            
            if (!isVisible) return null;
            
            // Define POI style based on type
            const poiBgColor = 
              poi.type === 'Nightclub' ? 'bg-purple-500' : 
              poi.type === 'Lounge' ? 'bg-blue-500' : 
              poi.type === 'Bar' ? 'bg-amber-500' : 
              poi.type === 'Event' ? 'bg-pink-500' :
              poi.type === 'Entrance' ? 'bg-green-500' :
              poi.type === 'Restroom' ? 'bg-cyan-500' :
              'bg-gray-500';
            
            return (
              <div key={poi.id}>
                {/* POI Marker */}
                <div 
                  className={`absolute cursor-pointer px-2 py-1 rounded-md ${poiBgColor} ${isSelected ? 'ring-2 ring-white' : ''}`}
                  style={{ 
                    left: `${poi.x}%`, 
                    top: `${poi.y}%`,
                    transform: 'translate(-50%, -50%)',
                    fontSize: '10px',
                    zIndex: 5
                  }}
                  onClick={() => handlePOISelect(poi)}
                >
                  <div className="flex items-center justify-center whitespace-nowrap">
                    <span className="mr-1">{poiIcons[poi.type]}</span>
                    <span className="font-bold">{poi.name}</span>
                  </div>
                </div>
                
                {/* Mini popup when selected */}
                {isSelected && !showPOIDetails && (
                  <div 
                    className="absolute bg-gray-800 border border-gray-700 rounded-md p-2 shadow-lg"
                    style={{ 
                      left: `${poi.x}%`, 
                      top: `${poi.y + 10}%`,
                      transform: 'translate(-50%, 0)',
                      zIndex: 10,
                      minWidth: '120px'
                    }}
                  >
                    <button
                      onClick={() => handleShowPOIDetails()}
                      className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded py-1 px-2 text-sm"
                    >
                      Reservation Options
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Tables */}
          {tables.map(table => {
            const isSelected = selectedTable?.id === table.id;
            const matchesTier = !selectedTier || table.tier === selectedTier;
            const tierColor = 
              table.tier === 'Expensive' ? 'bg-red-500' : 
              table.tier === 'Medium' ? 'bg-yellow-500' : 
              'bg-green-500';
            
            // Different shapes based on tier
            const tableShape = 
              table.tier === 'Expensive' ? 'rounded-full' : 
              table.tier === 'Medium' ? 'rounded-lg' : 
              'rounded-sm';
            
            return (
              <div 
                key={table.id}
                className={`absolute cursor-pointer ${tableShape} ${
                  table.available 
                    ? matchesTier ? tierColor : 'bg-gray-600' 
                    : 'bg-gray-700'
                } ${isSelected ? 'ring-4 ring-white' : ''}`}
                style={{ 
                  left: `${table.x}%`, 
                  top: `${table.y}%`,
                  width: table.tier === 'Expensive' ? '40px' : '30px',
                  height: table.tier === 'Expensive' ? '40px' : '30px',
                  opacity: (table.available && matchesTier) ? 1 : 0.4,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => {
                  if (table.available && matchesTier) {
                    handleTableSelect(table);
                  }
                }}
              >
                {/* Dots around expensive tables */}
                {table.tier === 'Expensive' && table.available && matchesTier && (
                  <>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full"></div>
                  </>
                )}
                <div className="flex items-center justify-center h-full">
                  <span className={`text-xs font-bold ${matchesTier ? 'text-white' : 'text-gray-300'}`}>
                    {table.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Selection details panel - only shown when showPOIDetails is true */}
        {selectedPOI && showPOIDetails ? (
          <div className="bg-gray-800 rounded-lg p-4 mb-4 animate-fadeIn">
            <h3 className="text-lg font-bold mb-2 flex items-center">
              <span className="mr-2">{poiIcons[selectedPOI.type]}</span>
              {selectedPOI.name} - {selectedPOI.type}
            </h3>
            
            <p className="text-gray-400 mb-4">{selectedPOI.description}</p>
            {/* Additional POI details could go here */}
            
            <div className="flex justify-between mt-4">
              <button 
                onClick={() => {
                  setShowPOIDetails(false);
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg"
              >
                Back
              </button>
              <button 
                onClick={() => {
                  setSelectedPOI(null);
                  setShowPOIDetails(false);
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        ) : selectedTable ? (
          <div className="bg-gray-800 rounded-lg p-4 mb-4 animate-fadeIn">
            <h3 className="text-lg font-bold mb-2">
              {selectedTable.name} - {selectedTable.tier} Tier
            </h3>
            
            <div className="mb-4">
              <p className="text-gray-400 mb-1">Minimum Deposit Requirement</p>
              <p className="text-xl font-bold text-white">${minimumDeposit}</p>
              <p className="text-xs text-gray-400 mt-1">Transaction will be fulfilled when the inquiry is confirmed</p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-400 mb-2">Party Composition</p>
              
              {/* Men selection */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Men</span>
                <div className="flex items-center">
                  <button 
                    onClick={() => decrementGuests('men')}
                    className="bg-gray-700 text-white w-8 h-8 rounded-l-lg flex items-center justify-center"
                  >
                    -
                  </button>
                  <div className="bg-gray-600 text-white w-10 h-8 flex items-center justify-center">
                    {partyComposition.men}
                  </div>
                  <button 
                    onClick={() => incrementGuests('men')}
                    className="bg-gray-700 text-white w-8 h-8 rounded-r-lg flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Women selection */}
              <div className="flex items-center justify-between">
                <span className="text-white">Women</span>
                <div className="flex items-center">
                  <button 
                    onClick={() => decrementGuests('women')}
                    className="bg-gray-700 text-white w-8 h-8 rounded-l-lg flex items-center justify-center"
                  >
                    -
                  </button>
                  <div className="bg-gray-600 text-white w-10 h-8 flex items-center justify-center">
                    {partyComposition.women}
                  </div>
                  <button 
                    onClick={() => incrementGuests('women')}
                    className="bg-gray-700 text-white w-8 h-8 rounded-r-lg flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <button 
                onClick={handleInquiry}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
              >
                Send Inquiry for {selectedTable.name}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400">
            Select a table to make an inquiry or a point of interest to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default TableReservationView; 