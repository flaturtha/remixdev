import { useState, useEffect, useRef } from "react";
import { X, Search as SearchIcon, Loader2 } from "lucide-react";
import { Link } from "@remix-run/react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Handle search
  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsSearching(true);
      
      // Mock search results - replace with actual API call
      setTimeout(() => {
        setResults([
          { id: 1, title: "The Mystery of the Blue Train", url: "/shop/the-mystery-of-the-blue-train" },
          { id: 2, title: "Murder on the Orient Express", url: "/shop/murder-on-the-orient-express" },
          { id: 3, title: "Death on the Nile", url: "/shop/death-on-the-nile" },
        ].filter(item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        ));
        setIsSearching(false);
      }, 500);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for books, collections..."
            className="flex-grow bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 dark:text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={onClose}
            className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {isSearching ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 text-gray-500 dark:text-gray-400 animate-spin" />
            </div>
          ) : results.length > 0 ? (
            <ul className="space-y-2">
              {results.map(result => (
                <li key={result.id}>
                  <Link 
                    to={result.url}
                    className="block p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                    onClick={onClose}
                  >
                    <h3 className="font-medium">{result.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          ) : searchTerm ? (
            <p className="text-center py-8 text-gray-500 dark:text-gray-400">
              No results found for "{searchTerm}"
            </p>
          ) : (
            <div className="py-4">
              <p className="text-gray-500 dark:text-gray-400 mb-4">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                <button 
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                  onClick={() => setSearchTerm("Agatha Christie")}
                >
                  Agatha Christie
                </button>
                <button 
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                  onClick={() => setSearchTerm("True Crime")}
                >
                  True Crime
                </button>
                <button 
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                  onClick={() => setSearchTerm("Detective")}
                >
                  Detective
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 