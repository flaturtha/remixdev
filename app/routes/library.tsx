import { json } from "@remix-run/node";
import { Outlet, useLocation, Link } from "@remix-run/react";
import { Container } from "~/components/common/container";
import { cn } from "~/lib/utils";
import { Book, BookOpen, BookText, Archive, Package } from "lucide-react";
import { FilterSortButton } from "~/components/product/FilterSortButton";

export const meta = () => {
  return [
    { title: "Vintage Mystery Library | Tales of Murder" },
    { name: "description", content: "Explore our curated collection of vintage mystery and detective fiction from the golden age and beyond." },
  ];
};

export async function loader() {
  return json({
    categories: [
      {
        id: "novels",
        name: "Novels",
        path: "/library/novels",
        icon: Book,
        description: "Full-length detective and mystery novels"
      },
      {
        id: "novellas",
        name: "Novellas",
        path: "/library/novellas",
        icon: BookOpen,
        description: "Medium-length mystery fiction"
      },
      {
        id: "novelettes",
        name: "Novelettes",
        path: "/library/novelettes",
        icon: BookText,
        description: "Shorter detective stories"
      },
      {
        id: "collections",
        name: "Collections",
        path: "/library/collections",
        icon: Archive,
        description: "Anthologies and collections of short stories"
      },
      {
        id: "bundles",
        name: "Bundles",
        path: "/library/bundles",
        icon: Package,
        description: "Value-packed bundles of multiple titles"
      }
    ]
  });
}

export default function LibraryLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper function to determine if a tab is active
  const isActive = (path: string) => {
    if (currentPath === "/library" && path === "/library") {
      return true;
    }
    return path !== "/library" && currentPath.startsWith(path);
  };
  
  // Determine the base URL for the filter sort button
  const getBaseUrl = () => {
    // If we're on a category page like /library/novels, use that as the base
    if (currentPath !== "/library") {
      // Match the first two segments of the path (e.g., /library/novels)
      const matches = currentPath.match(/^(\/[^\/]+\/[^\/]+)/);
      if (matches && matches[1]) {
        return matches[1];
      }
    }
    // Default to /library
    return "/library";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation tabs */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <Container>
          <nav className="flex overflow-x-auto py-4">
            <div className="flex space-x-4 sm:space-x-8">
              <Link
                to="/library"
                className={cn(
                  "inline-flex items-center py-2 px-1 text-sm font-medium border-b-2 -mb-px",
                  isActive("/library") && currentPath === "/library"
                    ? "border-primary-500 text-primary-600 dark:text-primary-400"
                    : "border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100"
                )}
              >
                All
              </Link>
              
              <Link
                to="/library/novels"
                className={cn(
                  "inline-flex items-center py-2 px-1 text-sm font-medium border-b-2 -mb-px",
                  isActive("/library/novels")
                    ? "border-primary-500 text-primary-600 dark:text-primary-400"
                    : "border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100"
                )}
              >
                <Book className="h-4 w-4 mr-2" />
                Novels
              </Link>
              
              <Link
                to="/library/novellas"
                className={cn(
                  "inline-flex items-center py-2 px-1 text-sm font-medium border-b-2 -mb-px",
                  isActive("/library/novellas")
                    ? "border-primary-500 text-primary-600 dark:text-primary-400"
                    : "border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100"
                )}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Novellas
              </Link>
              
              <Link
                to="/library/novelettes"
                className={cn(
                  "inline-flex items-center py-2 px-1 text-sm font-medium border-b-2 -mb-px",
                  isActive("/library/novelettes")
                    ? "border-primary-500 text-primary-600 dark:text-primary-400"
                    : "border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100"
                )}
              >
                <BookText className="h-4 w-4 mr-2" />
                Novelettes
              </Link>
              
              <Link
                to="/library/collections"
                className={cn(
                  "inline-flex items-center py-2 px-1 text-sm font-medium border-b-2 -mb-px",
                  isActive("/library/collections")
                    ? "border-primary-500 text-primary-600 dark:text-primary-400"
                    : "border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100"
                )}
              >
                <Archive className="h-4 w-4 mr-2" />
                Collections
              </Link>
              
              <Link
                to="/library/bundles"
                className={cn(
                  "inline-flex items-center py-2 px-1 text-sm font-medium border-b-2 -mb-px",
                  isActive("/library/bundles")
                    ? "border-primary-500 text-primary-600 dark:text-primary-400"
                    : "border-transparent text-gray-600 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100"
                )}
              >
                <Package className="h-4 w-4 mr-2" />
                Bundles
              </Link>
            </div>
          </nav>
        </Container>
      </div>

      {/* Outlet for nested routes */}
      <Outlet />
      
      {/* Filter & Sort Button */}
      <FilterSortButton baseUrl={getBaseUrl()} />
    </div>
  );
} 