import { Breadcrumbs } from '~/components/common/breadcrumbs';
import { Container } from '~/components/common/container';
import { ProductListWithPagination } from '~/components/product/ProductListWithPagination';
import { Home, Book } from 'lucide-react';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { generateDummyProducts } from '~/lib/dummy-data';

export const meta = () => {
  return [
    { title: "Mystery Bundles | Vintage Mystery Library | Tales of Murder" },
    { name: "description", content: "Save with our value-packed bundles of classic detective and mystery fiction from the golden age of mystery." },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  
  const limit = Number(searchParams.get('limit') || 12);
  const offset = Number(searchParams.get('offset') || 0);
  const sort = searchParams.get('sort') || 'newest';
  
  // Generate dummy products and filter to only bundles
  // This will be replaced with a Sanity query that filters by type
  const allProducts = generateDummyProducts(10);
  
  // Filter to only include bundles
  let filteredProducts = allProducts
    .filter(product => product.tags?.some(tag => tag.includes('bundle')));
  
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
    <Container className="py-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} className="mb-6" />
      
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
          Mystery Bundles
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
          Save with our value-packed bundles combining multiple titles at discounted prices.
          Perfect for collectors or for exploring the works of a particular author or theme.
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