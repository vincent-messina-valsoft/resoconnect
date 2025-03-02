import React from 'react';
import { X, User, Settings, CreditCard, Bell, Heart, Calendar, LogOut, Moon, HelpCircle } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <div className="relative flex flex-col w-80 max-w-[80%] h-full bg-black border-r border-gray-800 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold">Menu</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* User info */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center">
            <div className="h-14 w-14 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="h-8 w-8 text-gray-300" />
            </div>
            <div className="ml-4">
              <h3 className="font-bold">Guest User</h3>
              <button className="text-sm text-red-500">Sign In / Sign Up</button>
            </div>
          </div>
        </div>
        
        {/* Menu items */}
        <div className="flex-1 py-2">
          <MenuItem icon={<User className="h-5 w-5" />} label="Profile" />
          <MenuItem icon={<Heart className="h-5 w-5" />} label="Favorites" />
          <MenuItem icon={<Calendar className="h-5 w-5" />} label="Reservations" />
          <MenuItem icon={<CreditCard className="h-5 w-5" />} label="Payment Methods" />
          <MenuItem icon={<Bell className="h-5 w-5" />} label="Notifications" />
          <MenuItem icon={<Settings className="h-5 w-5" />} label="Settings" />
          <MenuItem icon={<Moon className="h-5 w-5" />} label="Dark Mode" toggle />
          <MenuItem icon={<HelpCircle className="h-5 w-5" />} label="Help & Support" />
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center text-gray-400 hover:text-white">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  toggle?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, toggle }) => {
  return (
    <div className="px-6 py-3 flex items-center justify-between hover:bg-gray-800 cursor-pointer">
      <div className="flex items-center">
        <span className="text-gray-400 mr-3">{icon}</span>
        <span>{label}</span>
      </div>
      {toggle && (
        <div className="w-10 h-6 bg-gray-700 rounded-full p-1 flex items-center">
          <div className="bg-gray-400 w-4 h-4 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;