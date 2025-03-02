import React, { useState } from 'react';
import { Venue } from '../types';
import { X } from 'lucide-react';

interface GuestListModalProps {
  venue: Venue;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string, phone: string, partySize: number) => void;
}

const GuestListModal: React.FC<GuestListModalProps> = ({
  venue,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState(2);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, email, phone, partySize);
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setPartySize(2);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Join Guest List</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-medium text-white mb-4">{venue.name}</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="partySize" className="block text-sm font-medium text-gray-400 mb-1">
                  Party Size
                </label>
                <select
                  id="partySize"
                  value={partySize}
                  onChange={(e) => setPartySize(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium mt-4"
              >
                Join Guest List
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GuestListModal; 