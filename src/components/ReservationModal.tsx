import React, { useState, useEffect } from 'react';
import { X, Users, Calendar, Clock, Table } from 'lucide-react';
import { Venue, FilterOptions } from '../types';
import { format } from 'date-fns';

interface ReservationModalProps {
  venue: Venue;
  filters: FilterOptions;
  isOpen: boolean;
  onClose: () => void;
  onReserve: (venueId: string, partySize: number, date: string, time: string) => void;
  preselectedTime?: string;
  selectedTable?: {
    id: string;
    tier: string;
    capacity: number;
  } | null;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  venue,
  filters,
  isOpen,
  onClose,
  onReserve,
  preselectedTime,
  selectedTable
}) => {
  const [partySize, setPartySize] = useState(selectedTable?.capacity || filters.partySize);
  const [date, setDate] = useState(filters.date);
  const [time, setTime] = useState(preselectedTime || filters.time);
  
  useEffect(() => {
    if (preselectedTime) {
      setTime(preselectedTime);
    }
  }, [preselectedTime]);
  
  useEffect(() => {
    if (selectedTable?.capacity) {
      setPartySize(selectedTable.capacity);
    }
  }, [selectedTable]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReserve(venue.id, partySize, date, time);
    onClose();
  };
  
  if (!isOpen) return null;
  
  const today = format(new Date(), 'yyyy-MM-dd');
  const tomorrow = format(new Date(new Date().setDate(new Date().getDate() + 1)), 'yyyy-MM-dd');
  const dayAfterTomorrow = format(new Date(new Date().setDate(new Date().getDate() + 2)), 'yyyy-MM-dd');
  
  const timeSlots = [
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', 
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
    '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
  ];
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="relative">
          <img 
            src={venue.photos[0]} 
            alt={venue.name} 
            className="w-full h-48 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h2 className="text-white text-xl font-bold">{venue.name}</h2>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <h3 className="text-lg font-semibold mb-4">Make a Reservation</h3>
          
          {/* Selected Table Information */}
          {selectedTable && (
            <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <div className="flex items-center mb-2">
                <Table className="h-5 w-5 mr-2 text-blue-600" />
                <span className="font-medium text-blue-800">Selected Table</span>
              </div>
              <div className="text-sm text-gray-700">
                <p><span className="font-medium">Table:</span> {selectedTable.id}</p>
                <p><span className="font-medium">Tier:</span> {selectedTable.tier}</p>
                <p><span className="font-medium">Capacity:</span> {selectedTable.capacity} people</p>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Users className="h-4 w-4 mr-1" /> Party Size
            </label>
            <select
              value={partySize}
              onChange={(e) => setPartySize(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!!selectedTable} // Disable if a table is selected
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                <option key={size} value={size}>
                  {size} {size === 1 ? 'person' : 'people'}
                </option>
              ))}
            </select>
            {selectedTable && (
              <p className="text-xs text-gray-500 mt-1">Party size is fixed based on the selected table.</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Calendar className="h-4 w-4 mr-1" /> Date
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setDate('Today')}
                className={`py-2 px-3 border rounded-md text-sm ${
                  date === 'Today' ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300'
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setDate('Tomorrow')}
                className={`py-2 px-3 border rounded-md text-sm ${
                  date === 'Tomorrow' ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300'
                }`}
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => setDate('Custom')}
                className={`py-2 px-3 border rounded-md text-sm ${
                  date !== 'Today' && date !== 'Tomorrow' ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300'
                }`}
              >
                Custom
              </button>
            </div>
            {date === 'Custom' && (
              <input
                type="date"
                min={today}
                className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setDate(e.target.value)}
              />
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Clock className="h-4 w-4 mr-1" /> Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={`py-2 px-3 border rounded-md text-sm ${
                    time === slot ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reserve Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;