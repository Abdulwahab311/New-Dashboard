import React, { useState, useEffect, useMemo } from "react";
import { CiSettings } from "react-icons/ci"; // ✅ import added
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen, onSidebarClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const icons = useMemo(() => [
    { id: "stats", src: "/icons/stats.png", alt: "stats", path: "/afterSales/dashboard" },
    { id: "search", src: "/icons/search.png", alt: "search", path: "/afterSales/search" },
    { id: "file", src: "/icons/file.png", alt: "file", path: "/afterSales/files" },
  ], []);
  
  // Set default active based on current route or default to stats
  const getActiveId = () => {
    const currentPath = location.pathname;
    const activeIcon = icons.find(icon => icon.path === currentPath);
    return activeIcon ? activeIcon.id : "stats";
  };
  
  const [activeId, setActiveId] = useState(getActiveId());

  // Update active state when route changes
  useEffect(() => {
    const currentPath = location.pathname;
    const activeIcon = icons.find(icon => icon.path === currentPath);
    setActiveId(activeIcon ? activeIcon.id : "stats");
  }, [location.pathname, icons]);

  

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onSidebarClose}
      />
      <aside
        className={`fixed top-0 left-0 h-screen w-16 bg-[#0B1020] text-white flex flex-col items-center justify-between z-50 shadow-md transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="flex flex-col items-center gap-6 py-6 ">
          <div className="size-9 rounded-full bg-[#4563EC]" />
          <div className="flex flex-col items-center gap-15 mt-20">
            {icons.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.id}
                  onClick={() => {
                    setActiveId(item.id);
                    if (item.path) {
                      navigate(item.path);
                    }
                  }}
                  className={`transition-opacity ${isActive ? "" : "opacity-70 hover:opacity-100"}`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${
                      isActive ? "bg-[#4C63FF]" : "bg-transparent"
                    }`}
                  >
                    <img src={item.src} alt={item.alt} className={`w-5 h-5 ${item.id === 'search' ? 'invert' : ''}`} />
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            aria-label="settings"
            onClick={() => setActiveId('settings')}
            className={`transition-opacity mt-10 ${activeId === 'settings' ? '' : 'opacity-70 hover:opacity-100'}`}
          >
            <span
              className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${activeId === 'settings' ? 'bg-[#4563EC]' : 'bg-transparent'}`}
            >
              <CiSettings size={30} className={activeId === 'settings' ? 'text-white' : 'text-gray-300'} />
            </span>
          </button>
        </div>
        <div className="pb-40">
          <div className="size-13 rounded-full overflow-hidden">
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
