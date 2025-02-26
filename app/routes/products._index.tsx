import { Breadcrumbs } from '~/components/common/breadcrumbs';
import { Container } from '~/components/common/container';
import { ProductListWithPagination } from '~/components/product/ProductListWithPagination';
import { Home } from 'lucide-react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { generateDummyProducts } from '~/lib/dummy-data';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // TODO: Replace with actual API call to Medusa when ready
  const url = new URL(request.url);
  const offset = parseInt(url.searchParams.get('offset') || '0');
  const limit = parseInt(url.searchParams.get('limit') || '12');
  
  // Generate dummy products
  const products = generateDummyProducts(limit);
  const count = 50; // Dummy total count
  
  return { products, count, limit, offset };
};

export type ProductsIndexRouteLoader = typeof loader;

export default function ProductsIndexRoute() {
  const data = useLoaderData<ProductsIndexRouteLoader>();

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
      label: 'All Products',
    },
  ];

  return (
    <Container className="pb-16">
      <div className="my-8 flex flex-wrap items-center justify-between gap-4">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <ProductListWithPagination
            products={products}
            paginationConfig={{ count, offset, limit }}
            context="products"
          />
        </div>
      </div>
    </Container>
  );
}