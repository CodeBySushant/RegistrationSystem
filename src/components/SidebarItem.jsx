// src/components/SidebarItem.jsx
import React, { useMemo } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const SidebarItem = ({
  item,
  openMenu,
  handleToggle,
  searchTerm,
  handleLinkClick,
  activeLink,
}) => {
  const isOpen = openMenu === item.id;
  const filter = (searchTerm || "").toLowerCase().trim();

  // Children filtered by search term
  const filteredChildren = useMemo(() => {
    if (!filter) return item.children;
    return item.children.filter((child) =>
      child.toLowerCase().includes(filter)
    );
  }, [item.children, filter]);

  const parentMatches = filter
    ? item.label.toLowerCase().includes(filter)
    : false;

  // Show this group if:
  // - no search, OR
  // - parent label matches, OR
  // - any child matches
  const isVisible = !filter || parentMatches || filteredChildren.length > 0;

  if (!isVisible) return null;

  // ─────────────────────────────────────────────
  // Items with children (groups)
  // ─────────────────────────────────────────────
  if (item.children.length > 0) {
    const isParentActive = item.children.includes(activeLink);

    return (
      <div className="transition-all duration-300">
        <button
          // Don't toggle accordion while searching – everything relevant is open
          onClick={() => !filter && handleToggle(item.id)}
          className={`w-full flex items-center justify-between p-2.5 text-gray-300 transition duration-150 ease-in-out hover:bg-gray-800
            ${isOpen ? "bg-gray-800" : ""} 
            ${isParentActive ? "text-blue-400" : ""}
          `}
          aria-expanded={isOpen}
          type="button"
        >
          <div
            className="flex items-center space-x-3"
            onClick={() => handleLinkClick(item.label)}
          >
            {item.icon &&
              React.createElement(item.icon, {
                size: 20,
                className: "text-gray-400",
              })}
            <span className="text-sm">{item.label}</span>
          </div>
          {item.children.length > 0 && (
            <>
              {isOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </>
          )}
        </button>

        <div
          className={`
            mt-1 space-y-1 border-l border-gray-700 ml-4
            overflow-hidden transition-all duration-300 ease-in-out 
            ${isOpen || !!filter ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          {filteredChildren.map((child) => (
            <div
              key={child}
              onClick={() => handleLinkClick(child)}
              className={`block cursor-pointer py-2 px-4 text-sm text-gray-400 transition duration-150 ease-in-out hover:bg-gray-800 hover:text-gray-200
                ${activeLink === child ? "bg-gray-800 text-blue-400" : ""}
              `}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // Items without children (single links)
  // ─────────────────────────────────────────────
  return (
    <div
      onClick={() => handleLinkClick(item.label)}
      className={`w-full flex items-center p-2.5 text-gray-300 transition duration-150 ease-in-out hover:bg-gray-800 cursor-pointer
        ${activeLink === item.label ? "bg-gray-800 text-blue-400" : ""}
      `}
    >
      {item.icon &&
        React.createElement(item.icon, {
          size: 20,
          className: "text-gray-400",
        })}
      <span className="text-sm ml-3">{item.label}</span>
    </div>
  );
};

export default SidebarItem;
