import { Breadcrumbs } from '~/components/common/breadcrumbs';
import { Container } from '~/components/common/container';
import { ProductListWithPagination } from '~/components/product/ProductListWithPagination';
import { Home, Book } from 'lucide-react';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { generateDummyProducts } from '~/lib/dummy-data';

export const meta = () => {
  return [
    { title: "Mystery Collections | Vintage Mystery Library | Tales of Murder" },
    { name: "description", content: "Explore our anthologies and collections of classic detective and mystery short stories from the golden age of mystery fiction." },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  
  const limit = Number(searchParams.get('limit') || 12);
  const offset = Number(searchParams.get('offset') || 0);
  const sort = searchParams.get('sort') || 'newest';
  
  // Generate dummy products and filter to only collections
  // This will be replaced with a Sanity query that filters by type
  const allProducts = generateDummyProducts(20);
  
  // Filter to only include collections
  let filteredProducts = allProducts
    .filter(product => product.collection === 'vintage_crime');
  
  // Apply sorting based on the sort parameter
  if (sort === 'newest') {
    filteredProducts.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
  } else if (sort === 'oldest') {
    filteredProducts.sort((a, b) => new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime());
  } else if (sort === 'title-asc') {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'title-desc') {
    filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price.amount - b.price.amount);
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price.amount - a.price.amount);
  }
  
  // Apply pagination
  const products = filteredProducts.slice(offset, offset + limit);
  const count = 20; // Dummy total count for collections
  
  return json({ 
    products, 
    count, 
    limit, 
    offset,
    sort
  });
};

export default function LibraryCollectionsRoute() {
  const data = useLoaderData<typeof loader>();

  if (!data) return null;

  const { products, count, limit, offset } = data;

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
      label: 'Collections',
    },
  ];

  return (
    <Container className="py-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} className="mb-6" />
      
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
          Mystery Collections
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
          Explore our anthologies and collections of short stories from classic mystery authors.
          Each collection has been curated to showcase the best short-form mysteries of the era.
        </p>
      </div>
      
      <ProductListWithPagination
        products={products}
        paginationConfig={{ count, offset, limit }}
        context="library/collections"
      />
    </Container>
  );
} 