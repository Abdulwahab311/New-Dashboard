import React from "react";
import { ArrowLeft, Search, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = ({ onHamburgerClick }) => {
  const location = useLocation();

  // Agar route /sales/dashboard hai to "Sales Dashboard" show karega
  const titles = {
    "/sales/dashboard": "ZORG Sales Dashboard",
    "/industry/sales/dashboard": "INDUSTRY Sales Dashboard",
    "/business/dashboard": "Business Dashboard",
    "/maketing/dashboard": "Marketing Dashboard",
    "/scoreboard/dashboard": "SCOREBOARD DASHBOARD",
    "/funnel/dashboard": "FUNNEL DASHBOARD",
    "/industry-secondcontract/dashboard":"Industry 2st Contractplace",

    /// usman 
    "/industry-firstcontract/dashboard": "Industry 1st Contractplace",

    
   
  };

  const headerTitle = titles[location.pathname] || "INDUSTRY Sales Dashboard";


  return (
    <header className="text-white   py-4 flex items-center justify-between  bg-[#0B1020]">
      {/* Left: Back button (static) */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#1F2740] text-gray-300 hover:text-white transition-colors"
          aria-label="Open sidebar"
          onClick={onHamburgerClick}
        >
          <Menu className="w-5 h-5" />
        </button>
        <button
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Back"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0B1020] border border-[#1F2740]">
            <ArrowLeft className="w-4 h-4" />
          </span>
          <span className="text-sm">Back</span>
        </button>
      </div>
      <div className="flex ml-15 text-base lg:text-lg">{headerTitle} </div>

      {/* Center: Search bar */}
      <div className="flex-1 flex justify-end px-3 mr-7">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Find Something..."
            className="w-full bg-[#181C3A] text-gray-200 placeholder:text-gray-500 rounded-full pl-5 pr-10 py-2.5 border border-[#1F2740] focus:outline-none focus:ring-2 focus:ring-[#4254ff]/40"
            readOnly
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Right: Text links and avatar */}
      <div className="flex items-center gap-6">
        <nav className="hidden sm:flex items-center gap-5 text-sm">
          <span className="font-semibold text-white">Dashboard</span>
          <span className="text-gray-400">Channels</span>
        </nav>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="https://i.pravatar.cc/100?img=15"
              alt="user"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="hidden md:inline text-sm text-gray-200 mr-5">User Name</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
