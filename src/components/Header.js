import React from "react";
import { Search, Bell, User, X } from "lucide-react";

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">Home &gt;</span>
          <span className="font-semibold text-sm">Dashboard V2</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0" style={{ width: "256px" }}>
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
            />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-10 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              style={{ width: "256px" }}
            />
            <button
              onClick={() => setSearchTerm("")}
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-opacity ${
                searchTerm ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <X size={14} />
            </button>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded flex-shrink-0">
            <Bell size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded flex-shrink-0">
            <User size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
