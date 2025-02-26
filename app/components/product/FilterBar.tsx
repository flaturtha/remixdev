import { useState } from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { FilterSidebar } from './FilterSidebar';

interface FilterBarProps {
  totalProducts: number;
  activeFilters: {
    editions?: string[];
    periods?: string[];
    collections?: string[];
    sort?: string;
  };
}

export function FilterBar({ totalProducts, activeFilters }: FilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const hasActiveFilters = 
    (activeFilters.editions && activeFilters.editions.length > 0) || 
    (activeFilters.periods && activeFilters.periods.length > 0) ||
    (activeFilters.collections && activeFilters.collections.length > 0) ||
    (activeFilters.sort && activeFilters.sort !== 'newest');
  
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-gray-200 mb-6">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium text-gray-900">{totalProducts}</span> results
          {hasActiveFilters && <span> (filtered)</span>}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter & Sort
            {hasActiveFilters && (
              <span className="ml-1 rounded-full bg-primary w-2 h-2"></span>
            )}
          </Button>
        </div>
      </div>
      
      <FilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        initialFilters={activeFilters}
      />
    </>
  );
} 