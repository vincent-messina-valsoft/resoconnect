import React, { useState } from 'react';
import { X, Sliders } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply }) => {
  const [location, setLocation] = useState('Montreal');
  const [distance, setDistance] = useState('25');
  const [priceRange, setPriceRange] = useState('$$');
  const [parking, setParking] = useState<string[]>([]);
  const [ageRestriction, setAgeRestriction] = useState('21+');
  const [musicOptions, setMusicOptions] = useState<string[]>([]);
  const [traffic, setTraffic] = useState('Low');
  
  const parkingOptions = ['Valet', 'Free Parking', 'Street Parking', 'No Parking'];
  const ageOptions = ['18+', '21+', '25+'];
  const musicOptionsList = ['House', 'Rap', 'Live Band', 'Live Mixing'];
  const trafficOptions = ['Low', 'Busy', 'Packed'];
  
  const handleParkingToggle = (option: string) => {
    if (parking.includes(option)) {
      setParking(parking.filter(item => item !== option));
    } else {
      setParking([...parking, option]);
    }
  };
  
  const handleMusicToggle = (option: string) => {
    if (musicOptions.includes(option)) {
      setMusicOptions(musicOptions.filter(item => item !== option));
    } else {
      setMusicOptions([...musicOptions, option]);
    }
  };
  
  const clearFilters = () => {
    setLocation('Montreal');
    setDistance('25');
    setPriceRange('$$');
    setParking([]);
    setAgeRestriction('21+');
    setMusicOptions([]);
    setTraffic('Low');
  };
  
  const handleApply = () => {
    const filters = {
      location,
      distance: parseInt(distance),
      priceRange,
      parking,
      ageRestriction,
      musicOptions,
      traffic
    };
    
    onApply(filters);
  };
  
  if (!isOpen) return null;
  
  // Calculate the number of matching venues (in a real app, this would be from the API)
  const matchCount = 30;
  
  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="p-2">
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={clearFilters} className="text-red-500">
            Clear
          </button>
        </div>
        
        {/* Location & Distance */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Location & Distance</h3>
          <div className="mb-3">
            <label className="block text-sm text-gray-400 mb-1">City</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded-md text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Distance (miles)</label>
            <select
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded-md text-white"
            >
              <option value="5">Within 5 miles</option>
              <option value="10">Within 10 miles</option>
              <option value="25">Within 25 miles</option>
              <option value="50">Within 50 miles</option>
              <option value="100">Within 100 miles</option>
            </select>
          </div>
        </div>
        
        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Price Range</h3>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded-md text-white"
          >
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
          </select>
        </div>
        
        {/* Parking Options */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Parking Options</h3>
          <div className="space-y-2">
            {parkingOptions.map(option => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={`parking-${option}`}
                  checked={parking.includes(option)}
                  onChange={() => handleParkingToggle(option)}
                  className="h-5 w-5 rounded border-gray-600 text-red-500 focus:ring-red-500 focus:ring-offset-gray-900"
                />
                <label htmlFor={`parking-${option}`} className="ml-2">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Age Restriction */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Age Requirement</h3>
          <select
            value={ageRestriction}
            onChange={(e) => setAgeRestriction(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded-md text-white"
          >
            {ageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        {/* Music Options */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Music Options</h3>
          <div className="space-y-2">
            {musicOptionsList.map(option => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={`music-${option}`}
                  checked={musicOptions.includes(option)}
                  onChange={() => handleMusicToggle(option)}
                  className="h-5 w-5 rounded border-gray-600 text-red-500 focus:ring-red-500 focus:ring-offset-gray-900"
                />
                <label htmlFor={`music-${option}`} className="ml-2">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Traffic */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">Traffic</h3>
          <select
            value={traffic}
            onChange={(e) => setTraffic(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded-md text-white"
          >
            {trafficOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="w-full bg-red-600 text-white py-4 rounded-md font-bold text-lg"
        >
          Show me {matchCount} nightclubs
        </button>
      </div>
    </div>
  );
};

export default FilterModal;