import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import { useState } from "react";
const Layout = ({ children, headerChildren }) => {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen w-full   text-black ">
 <Sidebar
        sidebarOpen={sidebarOpen}
        onSidebarClose={() => setSidebarOpen(false)}
      />
      {/* Main content area */}
      <div className="flex flex-col flex-1 h-full bg-[#181C3A]  overflow-hidden">
        {/* Optional Header */}
         <Header onHamburgerClick={() => setSidebarOpen(true)}>{headerChildren}</Header>

        <main className="flex-1 overflow-y-auto p-2 w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
