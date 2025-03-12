import { Breadcrumbs } from '~/components/common/breadcrumbs';
import { Container } from '~/components/common/container';
import { ProductListWithPagination } from '~/components/product/ProductListWithPagination';
import { Home, Book, BookOpen, BookText, Archive, Package, ArrowRight } from 'lucide-react';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { generateDummyProducts } from '~/lib/dummy-data';
import type { LucideIcon } from 'lucide-react';

// Types for our products
interface Product {
  id: string;
  slug: string;
  title: string;
  author: string;
  coverImage: string;
  type: "novel" | "novella" | "novelette" | "collection" | "bundle";
  featured?: boolean;
  price: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  path: string;
  iconName: string; // Store icon name as string for serialization
  description: string;
  count: number;
}

export const meta = () => {
  return [
    { title: "Vintage Mystery Library | Tales of Murder" },
    { name: "description", content: "Explore our curated collection of vintage mystery and detective fiction from the golden age and beyond." },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  
  const limit = Number(searchParams.get('limit') || 12);
  const offset = Number(searchParams.get('offset') || 0);
  const type = searchParams.get('type') || null;
  const sort = searchParams.get('sort') || 'newest';
  
  // Generate dummy products for now
  // This will be replaced with a Sanity query
  const products = generateDummyProducts(limit);
  const count = 50; // Dummy total count
  
  // This will be replaced with a Sanity query
  const featuredProducts: Product[] = [
    {
      id: "1",
      slug: "bat-wing",
      title: "Bat Wing",
      author: "Sax Rohmer",
      coverImage: "/images/book-covers/bat-wing_cover.png",
      type: "novel",
      featured: true,
      price: "$14.95",
      description: "A gripping mystery featuring detective Paul Harley investigating strange occurrences at Cray's Folly mansion."
    },
    {
      id: "2",
      slug: "golden-scorpion",
      title: "Golden Scorpion",
      author: "Sax Rohmer",
      coverImage: "/images/placeholder-cover.jpg",
      type: "novel",
      featured: true,
      price: "$14.95",
      description: "Paul Harley investigates a sinister Chinese criminal organization led by a mysterious figure known as 'The Scorpion'."
    },
    {
      id: "3",
      slug: "green-eyes-of-bast",
      title: "Green Eyes of Bast",
      author: "Sax Rohmer",
      coverImage: "/images/placeholder-cover.jpg",
      type: "novel",
      featured: true,
      price: "$14.95",
      description: "A tale of Egyptian mysticism and murder where ancient gods seem to walk among the living."
    },
    {
      id: "4",
      slug: "sherlock-holmes-collection",
      title: "The Essential Sherlock Holmes",
      author: "Arthur Conan Doyle",
      coverImage: "/images/placeholder-cover.jpg",
      type: "collection",
      featured: true,
      price: "$19.95",
      description: "A collection of the most celebrated Sherlock Holmes stories, featuring the world's greatest detective."
    }
  ];

  const categories: Category[] = [
    {
      id: "novels",
      name: "Novels",
      path: "/library/novels",
      iconName: "Book",
      description: "Full-length detective and mystery novels from the golden age and beyond.",
      count: 24
    },
    {
      id: "novellas",
      name: "Novellas",
      path: "/library/novellas",
      iconName: "BookOpen",
      description: "Medium-length mystery fiction perfect for an evening's read.",
      count: 12
    },
    {
      id: "novelettes",
      name: "Novelettes",
      path: "/library/novelettes",
      iconName: "BookText",
      description: "Shorter detective stories that can be enjoyed in a single sitting.",
      count: 18
    },
    {
      id: "collections",
      name: "Collections",
      path: "/library/collections",
      iconName: "Archive",
      description: "Anthologies and collections of short stories from classic mystery authors.",
      count: 8
    },
    {
      id: "bundles",
      name: "Bundles",
      path: "/library/bundles",
      iconName: "Package",
      description: "Value-packed bundles of multiple titles at discounted prices.",
      count: 6
    }
  ];

  return json({ 
    products, 
    count, 
    limit, 
    offset,
    type,
    sort,
    featuredProducts,
    categories
  });
};

// Helper to get icon component by name
const getIconByName = (name: string) => {
  switch (name) {
    case "Book": return Book;
    case "BookOpen": return BookOpen;
    case "BookText": return BookText;
    case "Archive": return Archive;
    case "Package": return Package;
    default: return Book;
  }
};

export default function LibraryIndexRoute() {
  const data = useLoaderData<typeof loader>();

  if (!data) return null;

  const { products, count, limit, offset, featuredProducts, categories } = data;

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
    },
  ];

  return (
    <Container className="pb-16">
      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">
          Vintage Mystery Library
        </h1>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <ProductListWithPagination
            products={products}
            paginationConfig={{ count, offset, limit }}
            context="library" // Changed from "products" to "library"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-12 mt-16">
        <div className="px-8 py-12 sm:px-12 md:px-16 md:py-16 lg:py-20">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
            Vintage Mystery Library
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mb-6">
            Explore our curated collection of classic mystery and detective fiction from the golden age and beyond, 
            meticulously restored and formatted for modern readers.
          </p>
          <div className="space-x-4">
            <Link 
              to="/library/novels" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Browse Novels
            </Link>
            <Link 
              to="/about/library" 
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100">
            Featured Titles
          </h2>
          <Link to="/library/featured" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center text-sm font-medium">
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/${product.type === 'novel' ? 'novels' : product.type === 'collection' ? 'collections' : product.type + 's'}/${product.slug}`} className="group">
              <div className="aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg mb-3">
                <img 
                  src={product.coverImage}
                  alt={`${product.title} by ${product.author}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {product.author}
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1">
                {product.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Categories */}
      <div className="mb-16">
        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-6">
          Browse by Category
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = getIconByName(category.iconName);
            return (
              <Link 
                key={category.id}
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
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {category.count} titles
                    </p>
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
      </div>
      
      {/* About Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 md:p-10">
        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-4">
          About Our Mystery Library
        </h2>
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <p>
            Our Vintage Mystery Library is dedicated to preserving and celebrating the rich legacy of mystery and 
            detective fiction from the late 19th century through the mid-20th century. We carefully restore these 
            classic texts, making them accessible to modern readers while maintaining their original charm.
          </p>
          <p>
            Each title in our library undergoes a meticulous restoration process, including:
          </p>
          <ul>
            <li>Careful proofreading against original editions</li>
            <li>Modern formatting for enhanced readability</li>
            <li>Custom cover designs that honor the period aesthetic</li>
            <li>Contextual notes to enhance understanding of historical references</li>
          </ul>
          <p>
            Whether you're a seasoned enthusiast of golden age mysteries or discovering these classics for the first time, 
            our library offers a gateway to an era when ingenious plots, memorable detectives, and atmospheric settings 
            defined the mystery genre.
          </p>
        </div>
        <div className="mt-6">
          <Link
            to="/about/library"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            Learn more about our restoration process <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </Container>
  );
} 