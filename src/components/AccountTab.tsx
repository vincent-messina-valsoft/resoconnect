import React, { useState } from 'react';
import { Heart, Plus, ChevronRight, Settings } from 'lucide-react';
import { mockUser } from '../data/mockUser.ts';
import { mockReservations } from '../data/mockReservations.ts';
import { mockLists } from '../data/mockLists.ts';
import EditProfileModal from './EditProfileModal.tsx';
import CreateListModal from './CreateListModal.tsx';
import Logo from './Logo.tsx';

const AccountTab: React.FC = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showCreateList, setShowCreateList] = useState(false);

  return (
    <div className="flex flex-col h-full bg-black text-white overflow-y-auto pb-20">
      {/* Header with settings icon and logo */}
      <div className="relative p-4">
        <div className="mb-2">
          <Logo />
        </div>
        <button className="absolute right-4 top-4">
          <Settings className="h-6 w-6 text-white" />
        </button>
      </div>
      
      {/* Profile section */}
      <div className="flex flex-col items-center px-4 pt-4 pb-8">
        <div className="w-24 h-24 rounded-full bg-gray-700 border-2 border-gray-600 overflow-hidden mb-4">
          {mockUser.avatarUrl ? (
            <img 
              src={mockUser.avatarUrl} 
              alt={mockUser.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{mockUser.name}</h1>
        
        <button 
          className="bg-gray-800 text-white px-6 py-2 rounded-full"
          onClick={() => setShowEditProfile(true)}
        >
          Edit Profile
        </button>
      </div>
      
      {/* Divider */}
      <div className="h-px bg-gray-800 w-full"></div>
      
      {/* Recent Bookings section */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-400">RECENT BOOKINGS</h2>
          <button className="text-white">See all</button>
        </div>
        
        {mockReservations.length > 0 ? (
          <div className="space-y-4">
            {mockReservations.map(reservation => (
              <div key={reservation.id} className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-bold">{reservation.venueName}</h3>
                <p className="text-gray-400">{reservation.date} • {reservation.time}</p>
                <p className="text-gray-400">{reservation.partySize} {reservation.partySize === 1 ? 'person' : 'people'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">You have no upcoming reservations.</p>
        )}
      </div>
      
      {/* Divider */}
      <div className="h-px bg-gray-800 w-full"></div>
      
      {/* Notify section */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-400">NOTIFY</h2>
          <button className="text-white">What's Notify?</button>
        </div>
        
        <p className="text-gray-400">You currently don't have Notify set.</p>
      </div>
      
      {/* Divider */}
      <div className="h-px bg-gray-800 w-full"></div>
      
      {/* Lists section */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-400">LISTS</h2>
          <button className="text-white">See all</button>
        </div>
        
        <div className="space-y-4">
          {/* My Hit List */}
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">My Hit List</h3>
              <p className="text-gray-400">{mockLists[0].venues.length} venues</p>
            </div>
            <ChevronRight className="h-6 w-6 text-gray-400" />
          </div>
          
          {/* Create List */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setShowCreateList(true)}
          >
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">Create List</h3>
            </div>
            <ChevronRight className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={showEditProfile} 
        onClose={() => setShowEditProfile(false)} 
        user={mockUser}
      />
      
      {/* Create List Modal */}
      <CreateListModal 
        isOpen={showCreateList} 
        onClose={() => setShowCreateList(false)} 
      />
    </div>
  );
};

export default AccountTab;