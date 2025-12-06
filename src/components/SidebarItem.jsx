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

  const filteredChildren = useMemo(() => {
    if (!searchTerm) return item.children;
    const filter = searchTerm.toLowerCase();
    return item.children.filter((child) =>
      child.toLowerCase().includes(filter)
    );
  }, [item.children, searchTerm]);

  const isVisible =
    item.children.length === 0 ||
    searchTerm === "" ||
    filteredChildren.length > 0;

  if (!isVisible && searchTerm) return null;

  if (item.children.length > 0) {
    const isParentActive = item.children.includes(activeLink);

    return (
      <div className="transition-all duration-300">
        <button
          onClick={() => handleToggle(item.id)}
          className={`w-full flex items-center justify-between p-2.5 text-gray-300 transition duration-150 ease-in-out hover:bg-gray-800
                        ${isOpen ? "bg-gray-800" : ""} 
                        ${isParentActive ? "text-blue-400" : ""}
                    `}
          aria-expanded={isOpen}
        >
          <div className="flex items-center space-x-3">
            {item.icon &&
              React.createElement(item.icon, {
                size: 20,
                className: "text-gray-400",
              })}
            <span className="text-sm">{item.label}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        <div
            className={`
                  mt-1 space-y-1 border-l border-gray-700 ml-4
                  overflow-hidden transition-all duration-300 ease-in-out 
                  ${
                  isOpen || searchTerm
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 opacity-0"
                  }
            `}
        >

          {filteredChildren.map((child, index) => (
            <div
              key={index}
              onClick={() => handleLinkClick(child)}
              className={`block cursor-pointer py-2 px-4 text-sm text-gray-400 transition duration-150 ease-in-out hover:bg-gray-800 hover:text-gray-200
                                ${
                                  activeLink === child
                                    ? "bg-gray-800 text-blue-400"
                                    : ""
                                }`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => handleLinkClick(item.label)}
      className={`w-full flex items-center p-2.5 text-gray-300 transition duration-150 ease-in-out hover:bg-gray-800 cursor-pointer
                ${
                  activeLink === item.label ? "bg-gray-800 text-blue-400" : ""
                }`}
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
