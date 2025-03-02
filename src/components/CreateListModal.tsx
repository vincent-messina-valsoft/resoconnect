import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateListModal: React.FC<CreateListModalProps> = ({ isOpen, onClose }) => {
  const [listName, setListName] = useState('');
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new list via API
    console.log('Created new list:', { name: listName });
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
          <h2 className="text-xl font-bold text-center">Create List</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              List Name
            </label>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="e.g., Favorite Nightclubs"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Create List
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListModal;