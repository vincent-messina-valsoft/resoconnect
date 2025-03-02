import React from 'react';
import { CheckCircle, Calendar, Clock, Users, MapPin, Table } from 'lucide-react';
import { Venue } from '../types';

interface ReservationConfirmationProps {
  venue: Venue;
  partySize: number;
  date: string;
  time: string;
  confirmationCode: string;
  isOpen: boolean;
  onClose: () => void;
  tableDetails?: {
    id: string;
    tier: string;
    capacity: number;
  } | null;
}

const ReservationConfirmation: React.FC<ReservationConfirmationProps> = ({
  venue,
  partySize,
  date,
  time,
  confirmationCode,
  isOpen,
  onClose,
  tableDetails
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-6">Reservation Confirmed!</h2>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-lg mb-2">{venue.name}</h3>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-600" />
                <span>{date}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-gray-600" />
                <span>{time}</span>
              </div>
              
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-gray-600" />
                <span>{partySize} {partySize === 1 ? 'person' : 'people'}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                <span>{venue.location.address}</span>
              </div>
              
              {tableDetails && (
                <div className="flex items-start mt-2">
                  <Table className="h-5 w-5 mr-2 text-gray-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Table Details:</span>
                    <div className="text-sm text-gray-700 ml-1">
                      <div>Table: {tableDetails.id}</div>
                      <div>Tier: {tableDetails.tier}</div>
                      <div>Capacity: {tableDetails.capacity} people</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-center text-gray-600 mb-2">Your confirmation code</p>
            <p className="text-center font-mono text-xl font-bold">{confirmationCode}</p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmation;