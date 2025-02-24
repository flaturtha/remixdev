import React, { useState } from "react";

interface EditionDropdownProps {
  onSelect: (edition: string) => void;
  selectedEdition: string;
}

const EditionDropdown: React.FC<EditionDropdownProps> = ({ onSelect, selectedEdition }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectEdition = (edition: string) => {
    onSelect(edition);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
        onClick={toggleDropdown}
      >
        <span>{selectedEdition}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide lucide-chevron-down h-4 w-4 opacity-50 transition-transform duration-300 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>

      {isDropdownOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {["ePub", "Kindle", "Paperback", "Large Print Paperback", "Hardcover", "Audiobook"].map((edition) => (
            <li
              key={edition}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleSelectEdition(edition)}
            >
              {edition}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EditionDropdown;
