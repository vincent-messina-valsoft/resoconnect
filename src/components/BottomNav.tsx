import React from 'react';
import { Search, Compass, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'discover' | 'search' | 'account';
  onTabChange: (tab: 'discover' | 'search' | 'account') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white border-t border-gray-800">
      <div className="flex justify-around items-center h-16">
        <button
          className={`flex flex-col items-center justify-center w-1/3 h-full ${
            activeTab === 'discover' ? 'text-white' : 'text-gray-500'
          }`}
          onClick={() => onTabChange('discover')}
        >
          <Compass className="h-6 w-6" />
          <span className="text-xs mt-1">Discover</span>
        </button>
        
        <button
          className={`flex flex-col items-center justify-center w-1/3 h-full ${
            activeTab === 'search' ? 'text-red-500' : 'text-gray-500'
          }`}
          onClick={() => onTabChange('search')}
        >
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Search</span>
        </button>
        
        <button
          className={`flex flex-col items-center justify-center w-1/3 h-full ${
            activeTab === 'account' ? 'text-white' : 'text-gray-500'
          }`}
          onClick={() => onTabChange('account')}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Account</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;