import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import client from '../utils/sanityClient';

// Define interfaces for our data
interface Book {
  _id: string;
  title: string;
  author: {
    name: string;
  };
  description: string;
  coverImage: {
    asset: {
      _ref: string;
    };
  };
  o_publishedAt: {
    yearOnly: number;
  };
  editions: {
    epub?: { available: boolean };
    kindle?: { available: boolean };
    paperback?: { available: boolean };
    audiobook?: { available: boolean };
  };
}

interface FormatOverlayProps {
  formats: {
    epub?: { available: boolean };
    kindle?: { available: boolean };
    paperback?: { available: boolean };
    audiobook?: { available: boolean };
  } | null;
}

// Loader function to fetch data from Sanity
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const query = `*[_type == "collection" && slug.current == $slug][0]{
    title,
    description,
    "books": books[]->{ 
      _id,
      title,
      "author": author->name,
      description,
      coverImage,
      o_publishedAt,
      editions
    }
  }`;

  try {
    const collectionData = await client.fetch(query, { slug: params.collection });
    return json(collectionData);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    throw new Error("Failed to fetch collection data");
  }
};

const FormatOverlay = ({ formats }: FormatOverlayProps) => {
  if (!formats) return null;
  
  const formattedFormats = {
    epub: formats.epub?.available || false,
    kindle: formats.kindle?.available || false,
    paperback: formats.paperback?.available || false,
    audiobook: formats.audiobook?.available || false,
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 flex justify-around">
      {Object.entries(formattedFormats).map(([format, available]) => (
        <span
          key={format}
          className={`px-1 py-0.5 rounded ${
            available ? "bg-blue-600 font-bold" : "text-gray-400"
          }`}
        >
          {format}
        </span>
      ))}
    </div>
  );
};

export default function CategoryPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="relative w-full h-64 md:h-80 overflow-hidden bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            {data.title}
          </h1>
        </div>
      </header>
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">Explore {data.title}</h2>
          <p className="text-lg leading-relaxed max-w-3xl">
            {data.description}
          </p>
        </div>
      </section>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.books?.map((book: Book) => (
            <div key={book._id} className="flex flex-col border rounded-lg overflow-hidden">
              <div className="p-0 relative">
                <img
                  src={book.coverImage?.asset?._ref || "/placeholder.svg?height=400&width=300"}
                  alt={book.title}
                  className="w-full h-[400px] object-cover rounded-t-lg"
                />
                <FormatOverlay formats={book.editions || {}} />
              </div>
              <div className="flex-grow p-4">
                <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{book.author?.name}</p>
                <p className="text-xs text-gray-600 mb-2">
                  Originally published in {book.o_publishedAt?.yearOnly}
                </p>
                <p className="text-sm">{book.description}</p>
              </div>
              <div className="p-4">
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  READ
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
