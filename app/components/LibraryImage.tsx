import { Link } from "@remix-run/react";
import { ArrowRight, Book, BookOpen, BookText, Archive, Package } from "lucide-react";

export default function LibraryImage() {
  const categories = [
    { 
      name: "Novels", 
      icon: Book, 
      path: "/library/novels",
      description: "Full-length detective and mystery novels"
    },
    { 
      name: "Novellas", 
      icon: BookOpen, 
      path: "/library/novellas",
      description: "Medium-length mystery fiction"
    },
    { 
      name: "Novelettes", 
      icon: BookText, 
      path: "/library/novelettes",
      description: "Shorter detective stories"
    },
    { 
      name: "Collections", 
      icon: Archive, 
      path: "/library/collections",
      description: "Anthologies and short story collections"
    },
    { 
      name: "Bundles", 
      icon: Package, 
      path: "/library/bundles",
      description: "Value-packed title bundles"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
            Vintage Mystery Library
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our growing collection of painstakingly restored classic mystery fiction
            from the golden age and beyond, available in multiple formats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link 
                key={category.name}
                to={category.path}
                className="group p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md rounded-lg border border-gray-100 dark:border-gray-700 flex flex-col h-full transition-shadow"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 p-3 rounded-full">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 flex-1">
                  {category.description}
                </p>
                <div className="mt-4 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 flex items-center">
                  Browse {category.name} <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
          {/* Image side */}
          <div className="w-full md:w-1/2 h-64 md:h-96">
            <img 
              src="/images/library-stacks.jpg" 
              alt="Vintage Mystery Library Shelves" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content side */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
              Meticulously Restored Classics
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Each title in our library has been carefully digitized, proofread, and formatted 
              for optimal reading experience. We preserve the original text while making it 
              accessible to modern readers through thoughtful design and formatting.
            </p>
            <Link 
              to="/library" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Explore The Full Library
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 