import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { ProductListWithPagination } from '~/components/product/ProductListWithPagination';
import { Container } from '~/components/common/container';
import clsx from 'clsx';
import { generateDummyProducts } from '~/lib/dummy-data';
import { FilterBar } from '~/components/product/FilterBar';
import { Breadcrumbs } from '~/components/common/Breadcrumbs';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const handle = params.categoryHandle as string;
  const url = new URL(request.url);
  
  // Get filter parameters
  const editions = url.searchParams.getAll('editions');
  const periods = url.searchParams.getAll('periods');
  const collections = url.searchParams.getAll('collections');
  const sort = url.searchParams.get('sort') || 'newest';
  
  // Pagination parameters
  const offset = parseInt(url.searchParams.get('offset') || '0');
  const limit = parseInt(url.searchParams.get('limit') || '12');

  // TODO: Replace with actual API calls when ready
  const categories = [
    { id: 'cat_1', name: 'Clothing', handle: 'clothing' },
    { id: 'cat_2', name: 'Accessories', handle: 'accessories' },
    { id: 'cat_3', name: 'Footwear', handle: 'footwear' }
  ];

  const category = categories.find((c) => c.handle === handle);

  if (!category) {
    throw redirect('/products');
  }

  // Generate dummy products
  let products = generateDummyProducts(30);
  let count = products.length;
  
  // Apply filters (in a real app, this would be done in the database query)
  if (editions.length > 0) {
    products = products.filter(product => {
      // Simulate product editions with the tags field
      const productEditions = product.tags || [];
      return editions.some(edition => productEditions.includes(edition));
    });
  }
  
  if (periods.length > 0) {
    products = products.filter(product => {
      // Simulate publication period with the tags field
      const productPeriod = product.tags?.[0] || '';
      return periods.includes(productPeriod);
    });
  }
  
  // Apply sorting
  products = sortProducts(products, sort);
  
  // Apply pagination
  count = products.length;
  products = products.slice(offset, offset + limit);

  // Apply collection filters
  if (collections.length > 0) {
    products = products.filter(product => {
      return collections.includes(product.collection || '');
    });
  }

  return {
    products,
    count,
    limit,
    offset,
    category,
    categories,
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
      // Simulate sorting by publication date
      return [...products].sort((a, b) => (a.created_at || '').localeCompare(b.created_at || ''));
    case 'newest':
    default:
      // Newest first (default)
      return [...products].sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  }
}

export type ProductCategoryRouteLoader = typeof loader;

export default function ProductCategoryRoute() {
  const data = useLoaderData<ProductCategoryRouteLoader>();

  if (!data) return null;

  const { products, count, limit, offset, categories, category, activeFilters } = data;

  return (
    <Container className="pb-16">
      <Breadcrumbs 
        items={[
          { label: 'Categories', href: '/categories' },
          { label: category.name }
        ]}
      />

      <h1 className="w-full text-center text-5xl xs:text-6xl md:text-8xl font-serif mt-24 font-normal">
        {category.name}
      </h1>

      {categories.length > 1 && (
        <div className="flex flex-col w-full items-center">
          <div className="flex-1">
            <div className="inline-flex gap-5 text-2xl font-serif border-b border-primary mt-4 mb-8">
              {categories.map((category) => (
                <NavLink
                  to={`/categories/${category.handle}`}
                  key={category.id}
                  prefetch="viewport"
                  className={({ isActive }) =>
                    clsx('h-full p-4', {
                      'font-bold border-b-2 border-primary': isActive,
                      '!border-none active:': !isActive,
                    })
                  }
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <FilterBar totalProducts={count} activeFilters={activeFilters} />
          
          <ProductListWithPagination
            products={products}
            paginationConfig={{ count, offset, limit }}
            context="categories"
          />
        </div>
      </div>
    </Container>
  );
} 