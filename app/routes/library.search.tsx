import { useState, useEffect } from "react";
import { Breadcrumbs } from '~/components/common/breadcrumbs';
import { Container } from '~/components/common/container';
import { ProductListWithPagination } from '~/components/product/ProductListWithPagination';
import { Home, Search, X, ChevronDown } from 'lucide-react';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData, useSearchParams, Form, useSubmit } from '@remix-run/react';
import { generateDummyProducts } from '~/lib/dummy-data';

export const meta = () => {
  return [
    { title: "Search | Vintage Mystery Library | Tales of Murder" },
    { name: "description", content: "Search our curated collection of vintage mystery and detective fiction." },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  
  const limit = Number(searchParams.get('limit') || 24);
  const offset = Number(searchParams.get('offset') || 0);
  const sort = searchParams.get('sort') || 'newest';
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || '';
  const period = searchParams.get('period') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const author = searchParams.get('author') || '';
  
  // Generate dummy products for now
  // This will be replaced with a Sanity query
  const allProducts = generateDummyProducts(50);
  
  // Filter products based on search parameters
  let filteredProducts = [...allProducts];
  
  // Search query
  if (query) {
    const searchTerms = query.toLowerCase().split(' ');
    filteredProducts = filteredProducts.filter(product => {
      const titleMatches = searchTerms.some(term => 
        product.title.toLowerCase().includes(term)
      );
      const authorMatches = product.author && searchTerms.some(term => 
        product.author?.toLowerCase().includes(term)
      );
      return titleMatches || authorMatches;
    });
  }
  
  // Type filter
  if (type) {
    filteredProducts = filteredProducts.filter(product => {
      if (type === 'novel') return product.tags?.includes('print_novel');
      if (type === 'novella') return product.tags?.includes('print_a5');
      if (type === 'novelette') return product.tags?.includes('print_large');
      if (type === 'collection') return product.collection === 'vintage_crime';
      if (type === 'bundle') return product.tags?.includes('bundle');
      return true;
    });
  }
  
  // Period filter
  if (period) {
    filteredProducts = filteredProducts.filter(product => {
      if (period === 'pre_1900') return (product.publication_year || 0) < 1900;
      if (period === 'victorian') return (product.publication_year || 0) >= 1900 && (product.publication_year || 0) < 1910;
      if (period === 'edwardian') return (product.publication_year || 0) >= 1910 && (product.publication_year || 0) < 1920;
      if (period === 'roaring_20s') return (product.publication_year || 0) >= 1920 && (product.publication_year || 0) < 1930;
      return true;
    });
  }
  
  // Price filter
  if (minPrice || maxPrice) {
    filteredProducts = filteredProducts.filter(product => {
      const price = product.price.amount;
      if (minPrice && maxPrice) {
        return price >= Number(minPrice) && price <= Number(maxPrice);
      }
      if (minPrice) {
        return price >= Number(minPrice);
      }
      if (maxPrice) {
        return price <= Number(maxPrice);
      }
      return true;
    });
  }
  
  // Author filter
  if (author) {
    filteredProducts = filteredProducts.filter(product => 
      product.author?.toLowerCase().includes(author.toLowerCase())
    );
  }
  
  // Sort products
  if (sort) {
    filteredProducts.sort((a, b) => {
      if (sort === 'newest') {
        return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
      }
      if (sort === 'oldest') {
        return new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime();
      }
      if (sort === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sort === 'title-desc') {
        return b.title.localeCompare(a.title);
      }
      if (sort === 'author-asc') {
        return (a.author || '').localeCompare(b.author || '');
      }
      return 0;
    });
  }
  
  // Apply pagination
  const paginatedProducts = filteredProducts.slice(offset, offset + limit);
  const count = filteredProducts.length;
  
  return json({ 
    products: paginatedProducts, 
    count, 
    limit, 
    offset,
    sort,
    query,
    type,
    period,
    minPrice,
    maxPrice,
    author
  });
};

export default function LibrarySearchRoute() {
  const data = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const submit = useSubmit();
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    type: searchParams.get('type') || '',
    period: searchParams.get('period') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    author: searchParams.get('author') || '',
    sort: searchParams.get('sort') || 'newest'
  });
  
  // Update filters when URL params change
  useEffect(() => {
    setFilters({
      q: searchParams.get('q') || '',
      type: searchParams.get('type') || '',
      period: searchParams.get('period') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      author: searchParams.get('author') || '',
      sort: searchParams.get('sort') || 'newest'
    });
  }, [searchParams]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submit(formData);
  };
  
  // Helper function to update a single filter
  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    
    setSearchParams(newParams);
  };
  
  // Helper function to clear all filters
  const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    // Preserve only the sort parameter
    if (searchParams.get('sort')) {
      newParams.set('sort', searchParams.get('sort')!);
    }
    setSearchParams(newParams);
  };
  
  // Count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.q) count++;
    if (filters.type) count++;
    if (filters.period) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.author) count++;
    return count;
  };
  
  const breadcrumbs = [
    {
      label: (
        <span className="flex whitespace-nowrap">
          <Home className="inline h-4 w-4" />
          <span className="sr-only">Home</span>
        </span>
      ),
      url: `/`,
    },
    {
      label: 'Vintage Mystery Library',
      url: '/library',
    },
    {
      label: 'Search & Filters',
    },
  ];
  
  return (
    <Container className="py-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} className="mb-6" />
      
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
          Search & Filters
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
          Find the perfect classic mystery by filtering our collection by type, time period, price, and more.
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          {/* Search Form */}
          <Form method="get" onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="search"
                  name="q"
                  placeholder="Search titles, authors..."
                  value={filters.q}
                  onChange={(e) => updateFilter('q', e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <button 
                type="submit"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md"
              >
                Search
              </button>
            </div>
          </Form>
          
          {/* Filters Toggle */}
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
            >
              Filters
              {getActiveFiltersCount() > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-primary-500 text-white text-xs rounded-full">
                  {getActiveFiltersCount()}
                </span>
              )}
              <ChevronDown 
                className={`ml-1 h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {getActiveFiltersCount() > 0 && (
              <button 
                onClick={clearAllFilters}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Clear all filters
              </button>
            )}
          </div>
          
          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
              {/* Type Filter */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={filters.type}
                  onChange={(e) => updateFilter('type', e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">All Types</option>
                  <option value="novel">Novels</option>
                  <option value="novella">Novellas</option>
                  <option value="novelette">Novelettes</option>
                  <option value="collection">Collections</option>
                  <option value="bundle">Bundles</option>
                </select>
              </div>
              
              {/* Time Period Filter */}
              <div>
                <label htmlFor="period" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Period
                </label>
                <select
                  id="period"
                  name="period"
                  value={filters.period}
                  onChange={(e) => updateFilter('period', e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">All Periods</option>
                  <option value="pre_1900">Pre-1900</option>
                  <option value="victorian">Victorian (1900-1910)</option>
                  <option value="edwardian">Edwardian (1911-1920)</option>
                  <option value="roaring_20s">Roaring 20s (1921-1930)</option>
                </select>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                    className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              
              {/* Author Filter */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  placeholder="Author name"
                  value={filters.author}
                  onChange={(e) => updateFilter('author', e.target.value)}
                  className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          )}
          
          {/* Active Filters */}
          {getActiveFiltersCount() > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.q && (
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                  <span className="mr-1">Search: {filters.q}</span>
                  <button 
                    onClick={() => updateFilter('q', '')}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {filters.type && (
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                  <span className="mr-1">Type: {filters.type.charAt(0).toUpperCase() + filters.type.slice(1)}</span>
                  <button 
                    onClick={() => updateFilter('type', '')}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {filters.period && (
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                  <span className="mr-1">Period: {
                    filters.period === 'pre_1900' ? 'Pre-1900' :
                    filters.period === 'victorian' ? 'Victorian' :
                    filters.period === 'edwardian' ? 'Edwardian' :
                    filters.period === 'roaring_20s' ? 'Roaring 20s' :
                    filters.period
                  }</span>
                  <button 
                    onClick={() => updateFilter('period', '')}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {(filters.minPrice || filters.maxPrice) && (
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                  <span className="mr-1">
                    Price: {filters.minPrice ? `$${filters.minPrice}` : '$0'} - {filters.maxPrice ? `$${filters.maxPrice}` : 'Any'}
                  </span>
                  <button 
                    onClick={() => {
                      updateFilter('minPrice', '');
                      updateFilter('maxPrice', '');
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {filters.author && (
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                  <span className="mr-1">Author: {filters.author}</span>
                  <button 
                    onClick={() => updateFilter('author', '')}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Sort Options */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
          <select 
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="rounded-md border-gray-300 py-1 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="author-asc">Author (A-Z)</option>
          </select>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Showing {data.count === 0 ? '0' : Math.min(data.count, data.offset + 1)}-{Math.min(data.count, data.offset + data.limit)} of {data.count} results
          </span>
        </div>
      </div>
      
      {/* Results */}
      {data.count > 0 ? (
        <ProductListWithPagination
          products={data.products}
          paginationConfig={{ count: data.count, offset: data.offset, limit: data.limit }}
          context="library/search"
        />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No results found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
          <button 
            onClick={clearAllFilters}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Clear all filters
          </button>
        </div>
      )}
    </Container>
  );
} 