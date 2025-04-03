
import React, { useEffect, useRef } from "react";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarNav from "./sidebar/SidebarNav";
import SidebarFooter from "./sidebar/SidebarFooter";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      const firstFocusableElement = sidebarRef.current?.querySelector('a, button') as HTMLElement;
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      <aside 
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:sticky md:translate-x-0 md:transition-[width] ${!isOpen && "md:w-16"}`}
        aria-label="Navigation sidebar"
        aria-expanded={isOpen}
        role="navigation"
      >
        <div className="flex flex-col h-full">
          <SidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <SidebarNav isOpen={isOpen} />
          <SidebarFooter isOpen={isOpen} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
