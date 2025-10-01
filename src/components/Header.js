import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">Home &gt;</span>
          <span className="font-semibold text-sm">Dashboard V2</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="pl-9 pr-4 py-1.5 w-64 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded">
            <Bell size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <User size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;