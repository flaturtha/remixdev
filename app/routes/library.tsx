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
        id: "all",
        name: "All",
        path: "/library",
        icon: Archive,
        description: "Browse our complete collection"
      },
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
    if (path === "/library" && currentPath === "/library") {
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
    <div className="min-h-screen bg-white">
      {/* Categories Navigation */}
      <div className="bg-white border-t border-b border-gray-200 py-4 mb-6">
        <Container>
          <div className="flex justify-center">
            <div className="grid grid-cols-6 md:grid-cols-6 sm:grid-cols-3 xs:grid-cols-2 w-full max-w-4xl gap-2 overflow-x-auto">
              {/* All */}
              <Link
                to="/library"
                className={cn(
                  "flex flex-col items-center justify-center py-4 px-2 rounded-lg transition-colors",
                  isActive("/library") && currentPath === "/library"
                    ? "bg-gray-100 text-black"
                    : "hover:bg-gray-50 text-gray-800"
                )}
              >
                <Archive className={cn(
                  "h-6 w-6 mb-2",
                  isActive("/library") && currentPath === "/library"
                    ? "text-black"
                    : "text-gray-600"
                )} />
                <span className="font-serif text-lg">All</span>
              </Link>
              
              {/* Novels */}
              <Link
                to="/library/novels"
                className={cn(
                  "flex flex-col items-center justify-center py-4 px-2 rounded-lg transition-colors",
                  isActive("/library/novels")
                    ? "bg-gray-100 text-black"
                    : "hover:bg-gray-50 text-gray-800"
                )}
              >
                <Book className={cn(
                  "h-6 w-6 mb-2",
                  isActive("/library/novels")
                    ? "text-black"
                    : "text-gray-600"
                )} />
                <span className="font-serif text-lg">Novels</span>
              </Link>
              
              {/* Novellas */}
              <Link
                to="/library/novellas"
                className={cn(
                  "flex flex-col items-center justify-center py-4 px-2 rounded-lg transition-colors",
                  isActive("/library/novellas")
                    ? "bg-gray-100 text-black"
                    : "hover:bg-gray-50 text-gray-800"
                )}
              >
                <BookOpen className={cn(
                  "h-6 w-6 mb-2",
                  isActive("/library/novellas")
                    ? "text-black"
                    : "text-gray-600"
                )} />
                <span className="font-serif text-lg">Novellas</span>
              </Link>
              
              {/* Novelettes */}
              <Link
                to="/library/novelettes"
                className={cn(
                  "flex flex-col items-center justify-center py-4 px-2 rounded-lg transition-colors",
                  isActive("/library/novelettes")
                    ? "bg-gray-100 text-black"
                    : "hover:bg-gray-50 text-gray-800"
                )}
              >
                <BookText className={cn(
                  "h-6 w-6 mb-2",
                  isActive("/library/novelettes")
                    ? "text-black"
                    : "text-gray-600"
                )} />
                <span className="font-serif text-lg">Novelettes</span>
              </Link>
              
              {/* Collections */}
              <Link
                to="/library/collections"
                className={cn(
                  "flex flex-col items-center justify-center py-4 px-2 rounded-lg transition-colors",
                  isActive("/library/collections")
                    ? "bg-gray-100 text-black"
                    : "hover:bg-gray-50 text-gray-800"
                )}
              >
                <Archive className={cn(
                  "h-6 w-6 mb-2",
                  isActive("/library/collections")
                    ? "text-black"
                    : "text-gray-600"
                )} />
                <span className="font-serif text-lg">Collections</span>
              </Link>
              
              {/* Bundles */}
              <Link
                to="/library/bundles"
                className={cn(
                  "flex flex-col items-center justify-center py-4 px-2 rounded-lg transition-colors",
                  isActive("/library/bundles")
                    ? "bg-gray-100 text-black"
                    : "hover:bg-gray-50 text-gray-800"
                )}
              >
                <Package className={cn(
                  "h-6 w-6 mb-2",
                  isActive("/library/bundles")
                    ? "text-black"
                    : "text-gray-600"
                )} />
                <span className="font-serif text-lg">Bundles</span>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Outlet for nested routes */}
      <Outlet />
      
      {/* Filter & Sort Button */}
      <FilterSortButton baseUrl={getBaseUrl()} />
    </div>
  );
} 