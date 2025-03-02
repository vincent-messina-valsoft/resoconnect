import React, { useState } from 'react';
import { X, Camera } from 'lucide-react';
import { User } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile via API
    console.log('Updated profile:', { name, email });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="relative p-4 border-b border-gray-800">
          <button 
            onClick={onClose}
            className="absolute left-4 top-4 p-1"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold text-center">Edit Profile</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-700 border-2 border-gray-600 overflow-hidden">
                {user.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name} 
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
              <button 
                type="button"
                className="absolute bottom-0 right-0 bg-red-500 text-white p-2 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Your name"
              required
            />
          </div>
          
          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Your email"
              required
            />
          </div>
          
          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;