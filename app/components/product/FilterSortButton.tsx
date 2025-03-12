import { useState, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Link, useLocation, useSearchParams, Form, useNavigate } from "@remix-run/react";

interface FilterSortButtonProps {
  baseUrl: string;
}

export function FilterSortButton({ baseUrl }: FilterSortButtonProps) {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Count active filters to show badge
  const getActiveFiltersCount = () => {
    let count = 0;
    
    // Check if sort parameter exists and isn't the default
    if (searchParams.get('sort') && searchParams.get('sort') !== 'newest') {
      count++;
    }
    
    // Add other filter counts here as needed
    // For example, if you had a 'type' filter:
    if (searchParams.get('type')) {
      count++;
    }
    
    // Price filter
    if (searchParams.get('minPrice') || searchParams.get('maxPrice')) {
      count++;
    }
    
    // Time period filter
    if (searchParams.get('period')) {
      count++;
    }
    
    // Collection filter
    if (searchParams.get('collection')) {
      count++;
    }
    
    // Edition type filter
    if (searchParams.get('edition')) {
      count++;
    }
    
    return count;
  };
  
  const activeFiltersCount = getActiveFiltersCount();

  // Toggle filter panel
  const toggleFilterPanel = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when panel is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Close panel and ensure body scroll is restored
  const closePanel = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };
  
  // Close panel when navigating away
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Ensure scroll is reset on location change
  useEffect(() => {
    document.body.style.overflow = '';
  }, [location.pathname, location.search]);

  // Determine the current sort option
  const currentSort = searchParams.get('sort') || 'newest';

  // Handle close when user clicks outside the panel
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const panel = document.getElementById('filter-sort-panel');
      const button = document.getElementById('filter-sort-button');
      
      if (panel && button && !panel.contains(e.target as Node) && !button.contains(e.target as Node)) {
        closePanel();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closePanel();
    
    const formData = new FormData(event.currentTarget);
    const formParams = new URLSearchParams();
    
    // Preserve current offset and limit
    if (searchParams.has('offset')) {
      formParams.set('offset', searchParams.get('offset')!);
    }
    if (searchParams.has('limit')) {
      formParams.set('limit', searchParams.get('limit')!);
    }
    
    // Add all form fields
    for (const [key, value] of formData.entries()) {
      if (value) {
        formParams.append(key, value.toString());
      }
    }
    
    // Navigate with the new params
    navigate(`${baseUrl}?${formParams.toString()}`);
  };

  return (
    <div className="z-50">
      <button
        id="filter-sort-button"
        onClick={toggleFilterPanel}
        className="fixed bottom-4 right-4 flex items-center justify-center px-4 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <SlidersHorizontal className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-300" />
        <span className="font-medium text-gray-900 dark:text-gray-100">FILTER & SORT</span>
        
        {activeFiltersCount > 0 && (
          <span className="ml-2 px-2 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>
      
      {/* Full slide-out panel */}
      {isOpen && (
        <div 
          id="filter-sort-panel"
          className="fixed inset-y-0 right-0 w-full md:w-96 bg-white dark:bg-gray-800 shadow-xl overflow-y-auto z-50"
        >
          {/* Panel Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="uppercase font-medium text-gray-900 dark:text-gray-100">Filter & Sort</h2>
            <button 
              onClick={closePanel}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close panel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <Form method="get" action={baseUrl} onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Sort By Section */}
            <div>
              <h3 className="uppercase font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                <span className="mr-2">Sort By</span>
              </h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="newest"
                    defaultChecked={currentSort === 'newest'}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Newest Additions</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="oldest"
                    defaultChecked={currentSort === 'oldest'}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Oldest Publication Date</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="title-asc"
                    defaultChecked={currentSort === 'title-asc'}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Title (A-Z)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="title-desc"
                    defaultChecked={currentSort === 'title-desc'}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Title (Z-A)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="price-asc"
                    defaultChecked={currentSort === 'price-asc'}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Price (Low to High)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="price-desc"
                    defaultChecked={currentSort === 'price-desc'}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Price (High to Low)</span>
                </label>
              </div>
            </div>
            
            {/* Book Collections Section */}
            <div>
              <h3 className="uppercase font-medium text-gray-700 dark:text-gray-300 mb-4">
                Book Collections
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'vintage_crime', label: 'Vintage True Crime' },
                  { id: 'brady', label: 'Brady\'s Secret Service' },
                  { id: 'sherlock', label: 'Sherlock Holmes' },
                  { id: 'christie', label: 'Agatha Christie' },
                  { id: 'poe', label: 'Edgar Allan Poe' }
                ].map(collection => (
                  <label key={collection.id} className="flex items-center">
                    <input
                      type="checkbox"
                      name="collection"
                      value={collection.id}
                      defaultChecked={searchParams.getAll('collection')?.includes(collection.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{collection.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Edition Types Section */}
            <div>
              <h3 className="uppercase font-medium text-gray-700 dark:text-gray-300 mb-4">
                Edition Types
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'ebook', label: 'eBook (Kindle & ePub)' },
                  { id: 'print_novel', label: 'Print - Novel Size' },
                  { id: 'print_a5', label: 'Print - A5 Size' },
                  { id: 'print_large', label: 'Print - Large Print' },
                  { id: 'audiobook', label: 'Audiobook' },
                  { id: 'free', label: 'Free Online Version' }
                ].map(edition => (
                  <label key={edition.id} className="flex items-center">
                    <input
                      type="checkbox"
                      name="edition"
                      value={edition.id}
                      defaultChecked={searchParams.getAll('edition')?.includes(edition.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{edition.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Time Periods Section */}
            <div>
              <h3 className="uppercase font-medium text-gray-700 dark:text-gray-300 mb-4">
                Publication Period
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'pre_1900', label: 'Pre-1900' },
                  { id: 'victorian', label: 'Victorian (1900-1910)' },
                  { id: 'edwardian', label: 'Edwardian (1910-1920)' },
                  { id: 'roaring_20s', label: 'Roaring 20s (1920-1930)' }
                ].map(period => (
                  <label key={period.id} className="flex items-center">
                    <input
                      type="checkbox"
                      name="period"
                      value={period.id}
                      defaultChecked={searchParams.getAll('period')?.includes(period.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 rounded"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{period.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="reset"
                className="w-1/2 py-3 text-center rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Reset
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 text-center bg-gray-900 dark:bg-primary-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-primary-800"
              >
                Apply Filters
              </button>
            </div>
          </Form>
        </div>
      )}
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closePanel}
          aria-hidden="true"
        />
      )}
    </div>
  );
} 