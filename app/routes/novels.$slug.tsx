import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { Breadcrumbs } from '~/components/common/breadcrumbs';
import { Container } from '~/components/common/container';
import { Home, Book, ShoppingBag, BookOpen } from 'lucide-react';

// Mock data structure for the novel product page
interface NovelProduct {
  id: string;
  slug: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  longDescription: string;
  price: string;
  originalPublicationDate: string;
  publisherInfo: string;
  editions: {
    name: string;
    price: string;
    description: string;
    isDefault: boolean;
  }[];
  relatedNovels: {
    id: string;
    slug: string;
    title: string;
    author: string;
    coverImage: string;
  }[];
}

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  if (!slug) throw new Response("Not found", { status: 404 });
  
  // This will be replaced with a Sanity query
  const novel: NovelProduct = {
    id: "1",
    slug: slug,
    title: "Bat Wing",
    author: "Sax Rohmer",
    coverImage: "/images/book-covers/bat-wing_cover.png",
    description: "A gripping mystery featuring detective Paul Harley investigating strange occurrences at Cray's Folly mansion.",
    longDescription: "Toward the hour of six on a hot summer's evening Mr. Paul Harley was seated in his private office in Chancery Lane reading through a number of letters which Innes, his secretary, had placed before him for signature. Only one more remained to be passed, but it was a long, confidential report upon a certain matter, which Harley had prepared for His Majesty's Principal Secretary of State for the Home Department. The story of this strange adventure is filled with the shudder of supernatural eerie and voodoo.",
    price: "$14.95",
    originalPublicationDate: "1921",
    publisherInfo: "A Tales of Murder Press, LLC Publication",
    editions: [
      {
        name: "Paperback",
        price: "$14.95",
        description: "Standard paperback edition",
        isDefault: true
      },
      {
        name: "Hardcover",
        price: "$24.95",
        description: "Premium hardcover with dust jacket",
        isDefault: false
      },
      {
        name: "Deluxe Edition",
        price: "$39.95",
        description: "Limited edition with bonus materials and illustrations",
        isDefault: false
      }
    ],
    relatedNovels: [
      {
        id: "2",
        slug: "the-golden-scorpion",
        title: "The Golden Scorpion",
        author: "Sax Rohmer",
        coverImage: "/images/placeholder-cover.jpg"
      },
      {
        id: "3",
        slug: "the-green-eyes-of-bast",
        title: "The Green Eyes of Bast",
        author: "Sax Rohmer",
        coverImage: "/images/placeholder-cover.jpg"
      },
      {
        id: "4",
        slug: "the-dream-detective",
        title: "The Dream Detective",
        author: "Sax Rohmer",
        coverImage: "/images/placeholder-cover.jpg"
      }
    ]
  };
  
  return json({ novel });
}

export default function NovelDetailPage() {
  const { novel } = useLoaderData<typeof loader>();
  const params = useParams();
  
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
      url: '/library/novels',
    },
    {
      label: novel.title,
    },
  ];
  
  return (
    <Container className="py-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} className="mb-8" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-[2/3] relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg">
          <img 
            src={novel.coverImage}
            alt={`${novel.title} by ${novel.author}`}
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-2">
            {novel.title}
          </h1>
          <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">
            by <span className="italic">{novel.author}</span>
          </p>
          
          <div className="mb-6">
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
              {novel.editions[0].price}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Originally published: {novel.originalPublicationDate}
            </div>
          </div>
          
          <div className="prose prose-stone dark:prose-invert mb-8">
            <p>{novel.description}</p>
            <p>{novel.longDescription}</p>
          </div>
          
          {/* Edition Selection */}
          <div className="mb-8">
            <label htmlFor="edition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Edition
            </label>
            <select
              id="edition"
              name="edition"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700"
            >
              {novel.editions.map((edition) => (
                <option key={edition.name} value={edition.name}>
                  {edition.name} - {edition.price} - {edition.description}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Buy Button */}
            <button
              type="button"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-md flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            
            {/* Read Free Button */}
            <a
              href={`/novels/read/${params.slug}`}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 py-3 px-6 rounded-md flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Read Free
            </a>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {novel.publisherInfo}
          </div>
        </div>
      </div>
      
      {/* Related Novels */}
      <div className="mt-16">
        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-6">
          You May Also Enjoy
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {novel.relatedNovels.map((relatedNovel) => (
            <a key={relatedNovel.id} href={`/novels/${relatedNovel.slug}`} className="group">
              <div className="aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg mb-2">
                <img 
                  src={relatedNovel.coverImage}
                  alt={`${relatedNovel.title} by ${relatedNovel.author}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {relatedNovel.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {relatedNovel.author}
              </p>
            </a>
          ))}
        </div>
      </div>
    </Container>
  );
} 