import { Link, useNavigate } from "@remix-run/react";
import { Product, PaginationProps } from "~/lib/types";
import { ProductCard } from "./ProductCard";

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
  const { count, offset, limit } = paginationConfig;
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(count / limit);

  const getPageUrl = (page: number) => {
    const newOffset = (page - 1) * limit;
    return `/${context}?offset=${newOffset}&limit=${limit}`;
  };

  return (
    <div className="space-y-8">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            {currentPage > 1 && (
              <Link
                to={getPageUrl(currentPage - 1)}
                className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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
                    ? "bg-primary-600 text-white dark:bg-primary-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </Link>
            ))}

            {currentPage < totalPages && (
              <Link
                to={getPageUrl(currentPage + 1)}
                className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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