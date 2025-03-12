import { Breadcrumbs } from '~/components/common/breadcrumbs';
import { Container } from '~/components/common/container';
import { ProductListWithPagination } from '~/components/product/ProductListWithPagination';
import { Home, Package } from 'lucide-react';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { generateDummyProducts } from '~/lib/dummy-data';

export const meta = () => {
  return [
    { title: "Mystery Bundles | Vintage Mystery Library | Tales of Murder" },
    { name: "description", content: "Explore our value-packed bundles of multiple vintage mystery titles at special discount prices." },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  
  const limit = Number(searchParams.get('limit') || 12);
  const offset = Number(searchParams.get('offset') || 0);
  const sort = searchParams.get('sort') || 'newest';
  
  // Generate dummy products
  // This will be replaced with a Sanity query for bundles
  const allProducts = generateDummyProducts(20);
  
  // For now, we'll identify bundles by checking if they have specific tags
  // In a real implementation, we would query specifically for bundles from Sanity
  // Let's pretend that bundles are identified by having "collection" in their tags
  let filteredProducts = allProducts
    .filter(product => product.tags?.some(tag => tag === 'vintage_crime'));
  
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
  const count = 10; // Dummy total count for bundles
  
  return json({ 
    products, 
    count, 
    limit, 
    offset,
    sort
  });
};

export default function LibraryBundlesRoute() {
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
      label: 'Bundles',
    },
  ];
  
  return (
    <Container className="pt-0 pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} className="mb-6" />
      
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">
          Mystery Bundles
        </h1>
        <p className="text-lg text-gray-800 max-w-3xl">
          Discover our specially curated bundles of vintage mystery stories at discounted prices. 
          Each bundle contains multiple titles grouped by author, theme, or series, offering 
          exceptional value for mystery enthusiasts.
        </p>
      </div>
      
      <ProductListWithPagination 
        products={products} 
        paginationConfig={{ count, offset, limit }}
        context="library/bundles"
      />
    </Container>
  );
} 