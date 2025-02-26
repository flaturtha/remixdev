import { Link, useNavigate } from "@remix-run/react";
import { Product, PaginationProps } from "~/lib/types";
import { ProductThumbnail } from "./ProductThumbnail";
import { navigateWithViewTransition } from "~/utils/view-transitions";

interface ProductListWithPaginationProps {
  products: Product[];
  paginationConfig: PaginationProps;
  context?: string;
}

export function ProductListWithPagination({
  products,
  paginationConfig,
  context = "",
}: ProductListWithPaginationProps) {
  const navigate = useNavigate();
  const { count, offset, limit } = paginationConfig;
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(count / limit);

  const getPageUrl = (page: number) => {
    const newOffset = (page - 1) * limit;
    return `/${context}?offset=${newOffset}&limit=${limit}`;
  };

  const handleProductClick = (e: React.MouseEvent<HTMLAnchorElement>, productHandle: string) => {
    e.preventDefault();
    navigateWithViewTransition(navigate, `/product-detail/${productHandle}`);
  };

  return (
    <div className="space-y-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product-detail/${product.handle}`}
            className="group"
            prefetch="intent"
            onClick={(e) => handleProductClick(e, product.handle)}
          >
            <ProductThumbnail product={product} />
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: product.price.currency_code,
              }).format(product.price.amount)}
            </p>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            {currentPage > 1 && (
              <Link
                to={getPageUrl(currentPage - 1)}
                className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Previous
              </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Link
                key={page}
                to={getPageUrl(page)}
                className={`px-3 py-2 rounded-md ${
                  currentPage === page
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {page}
              </Link>
            ))}

            {currentPage < totalPages && (
              <Link
                to={getPageUrl(currentPage + 1)}
                className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Next
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
} 