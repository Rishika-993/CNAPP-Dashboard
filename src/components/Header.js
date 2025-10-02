import { Search, Bell, User, X, Menu } from "lucide-react";

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left side - Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span className="text-gray-400 text-xs sm:text-sm sm:inline">
            Home &gt;
          </span>
          <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
            Dashboard V2
          </span>
        </div>

        {/* Right side - Search and Icons */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Search - Hidden on mobile, visible on tablet+ */}
          <div className="relative hidden md:block w-48 lg:w-64 flex-shrink-0">
            <Search
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-10 py-1.5 w-full border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={() => setSearchTerm("")}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-opacity ${
                searchTerm ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <X size={14} />
            </button>
          </div>

          {/* Search icon for mobile */}
          {/* <button className="p-2 hover:bg-gray-100 rounded md:hidden">
            <Search size={18} className="text-gray-600" />
          </button> */}

          {/* Bell and User icons */}
          <button className="p-2 hover:bg-gray-100 rounded flex-shrink-0">
            <Bell size={16} sm-size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded flex-shrink-0">
            <User size={16} sm-size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar - Below header on mobile */}
      <div className="md:hidden border-t border-gray-200 px-4 py-2">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-10 py-1.5 w-full border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={() => setSearchTerm("")}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-opacity ${
              searchTerm ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
