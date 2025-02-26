import { useState } from 'react';
import { Form, useSubmit, useNavigation } from '@remix-run/react';
import { X, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';

// Define the filter options
const EDITION_TYPES = [
  { id: 'ebook', label: 'eBook (Kindle & ePub)' },
  { id: 'print_novel', label: 'Print - Novel Size' },
  { id: 'print_a5', label: 'Print - A5 Size' },
  { id: 'print_large', label: 'Print - Large Print' },
  { id: 'audiobook', label: 'Audiobook' },
  { id: 'free_online', label: 'Free Online Version' },
];

const PUBLICATION_PERIODS = [
  { id: 'pre_1900', label: 'Pre-1900' },
  { id: 'victorian', label: '1900-1910' },
  { id: 'edwardian', label: '1911-1920' },
  { id: 'roaring_20s', label: '1921-1926' },
];

// Book collections
const BOOK_COLLECTIONS = [
  { id: 'vintage_crime', label: 'Vintage True Crime' },
  { id: 'bradys', label: 'Brady\'s Secret Service' },
  { id: 'sherlock', label: 'Sherlock Holmes' },
  { id: 'agatha', label: 'Agatha Christie' },
  { id: 'poe', label: 'Edgar Allan Poe' },
];

const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest Additions' },
  { id: 'oldest_pub', label: 'Oldest Publication Date' },
  { id: 'title_asc', label: 'Title (A-Z)' },
  { id: 'title_desc', label: 'Title (Z-A)' },
  { id: 'price_low', label: 'Price (Low to High)' },
  { id: 'price_high', label: 'Price (High to Low)' },
];

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters: {
    editions?: string[];
    periods?: string[];
    collections?: string[];
    sort?: string;
  };
}

export function FilterSidebar({ isOpen, onClose, initialFilters }: FilterSidebarProps) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  
  const [selectedEditions, setSelectedEditions] = useState<string[]>(
    initialFilters.editions || []
  );
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>(
    initialFilters.periods || []
  );
  const [selectedCollections, setSelectedCollections] = useState<string[]>(
    initialFilters.collections || []
  );
  const [sortOption, setSortOption] = useState<string>(
    initialFilters.sort || 'newest'
  );

  const handleEditionChange = (editionId: string) => {
    setSelectedEditions(prev => 
      prev.includes(editionId) 
        ? prev.filter(id => id !== editionId)
        : [...prev, editionId]
    );
  };

  const handlePeriodChange = (periodId: string) => {
    setSelectedPeriods(prev => 
      prev.includes(periodId) 
        ? prev.filter(id => id !== periodId)
        : [...prev, periodId]
    );
  };

  const handleCollectionChange = (collectionId: string) => {
    setSelectedCollections(prev => 
      prev.includes(collectionId) 
        ? prev.filter(id => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const formData = new FormData();
    
    selectedEditions.forEach(edition => {
      formData.append('editions', edition);
    });
    
    selectedPeriods.forEach(period => {
      formData.append('periods', period);
    });
    
    selectedCollections.forEach(collection => {
      formData.append('collections', collection);
    });
    
    formData.append('sort', sortOption);
    
    submit(formData, { method: 'get', replace: true });
    onClose();
  };

  const handleReset = () => {
    setSelectedEditions([]);
    setSelectedPeriods([]);
    setSelectedCollections([]);
    setSortOption('newest');
  };

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div 
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 shadow-xl transition-transform overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Filter & Sort</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Form onSubmit={handleSubmit}>
          {/* Sort Options */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort By
            </h3>
            <div className="space-y-2">
              {SORT_OPTIONS.map(option => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="radio"
                    id={`sort-${option.id}`}
                    name="sort"
                    value={option.id}
                    checked={sortOption === option.id}
                    onChange={() => setSortOption(option.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`sort-${option.id}`}>{option.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Book Collections */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Book Collections</h3>
            <div className="space-y-2">
              {BOOK_COLLECTIONS.map(collection => (
                <div key={collection.id} className="flex items-center">
                  <Checkbox
                    id={`collection-${collection.id}`}
                    checked={selectedCollections.includes(collection.id)}
                    onCheckedChange={() => handleCollectionChange(collection.id)}
                    className="mr-2"
                  />
                  <label 
                    htmlFor={`collection-${collection.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {collection.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Edition Types */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Edition Types</h3>
            <div className="space-y-2">
              {EDITION_TYPES.map(edition => (
                <div key={edition.id} className="flex items-center">
                  <Checkbox
                    id={`edition-${edition.id}`}
                    checked={selectedEditions.includes(edition.id)}
                    onCheckedChange={() => handleEditionChange(edition.id)}
                    className="mr-2"
                  />
                  <label 
                    htmlFor={`edition-${edition.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {edition.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Publication Periods */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Publication Period</h3>
            <div className="space-y-2">
              {PUBLICATION_PERIODS.map(period => (
                <div key={period.id} className="flex items-center">
                  <Checkbox
                    id={`period-${period.id}`}
                    checked={selectedPeriods.includes(period.id)}
                    onCheckedChange={() => handlePeriodChange(period.id)}
                    className="mr-2"
                  />
                  <label 
                    htmlFor={`period-${period.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {period.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              className="flex-1"
            >
              Reset
            </Button>
            <Button 
              type="submit" 
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Applying...' : 'Apply Filters'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
} 