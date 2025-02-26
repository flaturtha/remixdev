import { Container } from '~/components/common/container';
import { ProductListWithPagination } from '~/components/product/ProductListWithPagination';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { generateDummyProducts } from '~/lib/dummy-data';
import { FilterBar } from '~/components/product/FilterBar';
import { Breadcrumbs } from '~/components/common/Breadcrumbs';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  
  // Get filter parameters
  const editions = url.searchParams.getAll('editions');
  const periods = url.searchParams.getAll('periods');
  const collections = url.searchParams.getAll('collections');
  const sort = url.searchParams.get('sort') || 'newest';
  
  // Pagination parameters
  const offset = parseInt(url.searchParams.get('offset') || '0');
  const limit = parseInt(url.searchParams.get('limit') || '12');

  // Generate dummy products and filter by search query
  let products = generateDummyProducts(50).filter(product => 
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    (product.author && product.author.toLowerCase().includes(query.toLowerCase()))
  );
  
  let count = products.length;
  
  // Apply filters (in a real app, this would be done in the database query)
  if (editions.length > 0) {
    products = products.filter(product => {
      const productEditions = product.tags || [];
      return editions.some(edition => productEditions.includes(edition));
    });
  }
  
  if (periods.length > 0) {
    products = products.filter(product => {
      const productPeriod = product.tags?.find(tag => 
        ['pre_1900', 'victorian', 'edwardian', 'roaring_20s'].includes(tag)
      ) || '';
      return periods.includes(productPeriod);
    });
  }
  
  if (collections.length > 0) {
    products = products.filter(product => {
      return collections.includes(product.collection || '');
    });
  }
  
  // Apply sorting
  products = sortProducts(products, sort);
  
  // Apply pagination
  count = products.length;
  products = products.slice(offset, offset + limit);

  return { 
    products, 
    count, 
    limit, 
    offset,
    query,
    activeFilters: {
      editions,
      periods,
      collections,
      sort
    }
  };
};

// Helper function to sort products
function sortProducts(products, sortOption) {
  switch (sortOption) {
    case 'title_asc':
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    case 'title_desc':
      return [...products].sort((a, b) => b.title.localeCompare(a.title));
    case 'price_low':
      return [...products].sort((a, b) => a.price.amount - b.price.amount);
    case 'price_high':
      return [...products].sort((a, b) => b.price.amount - a.price.amount);
    case 'oldest_pub':
      return [...products].sort((a, b) => (a.created_at || '').localeCompare(b.created_at || ''));
    case 'newest':
    default:
      return [...products].sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  }
}

export type SearchRouteLoader = typeof loader;

export default function SearchRoute() {
  const data = useLoaderData<SearchRouteLoader>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  if (!data) return null;

  const { products, count, limit, offset, activeFilters } = data;

  return (
    <Container className="pb-16">
      <Breadcrumbs 
        items={[
          { label: 'Search Results' }
        ]}
      />
      <h1 className="w-full text-center text-5xl xs:text-6xl md:text-8xl font-serif mt-24 font-normal">
        Search Results
      </h1>
      <p className="text-center text-lg mt-4 mb-8">
        {count} results for "{query}"
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <FilterBar totalProducts={count} activeFilters={activeFilters} />
          
          <ProductListWithPagination
            products={products}
            paginationConfig={{ count, offset, limit }}
            context="search"
          />
        </div>
      </div>
    </Container>
  );
} 