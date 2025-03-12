import { Breadcrumbs } from '~/components/common/breadcrumbs';
import { Container } from '~/components/common/container';
import { ProductListWithPagination } from '~/components/product/ProductListWithPagination';
import { Home, Book } from 'lucide-react';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { generateDummyProducts } from '~/lib/dummy-data';

export const meta = () => {
  return [
    { title: "Mystery Novels | Vintage Mystery Library | Tales of Murder" },
    { name: "description", content: "Explore our collection of classic detective and mystery novels from the golden age of mystery fiction." },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  
  const limit = Number(searchParams.get('limit') || 12);
  const offset = Number(searchParams.get('offset') || 0);
  const sort = searchParams.get('sort') || 'newest';
  
  // Generate dummy products for now
  // This will be replaced with a Sanity query for only novels
  const allProducts = generateDummyProducts(30); // Generate more than we need
  
  // Filter to only include novels - using tags which is in the Product interface
  let filteredProducts = allProducts
    .filter(product => product.tags?.some(tag => tag.includes('print_novel')));
  
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
  const count = 24; // Dummy total count of novels
  
  return json({ 
    products, 
    count, 
    limit, 
    offset,
    sort
  });
};

export default function NovelsLibraryRoute() {
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
      label: 'Novels',
    },
  ];
  
  return (
    <Container className="pt-0 pb-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} className="mb-6" />
      
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
          Mystery Novels
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
          Explore our collection of full-length mystery and detective novels from the golden age 
          of mystery fiction and beyond. Each novel has been meticulously restored and formatted 
          for modern readers.
        </p>
      </div>
      
      <ProductListWithPagination 
        products={products} 
        paginationConfig={{ count, offset, limit }}
        context="library/novels"
      />
    </Container>
  );
} 