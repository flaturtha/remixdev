import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import client from '../utils/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string | null;
  coverImage: {
    asset: {
      _ref: string;
    };
  } | null;
  o_publishedAt: {
    yearOnly: number;
  } | null;
  editions: {
    epub?: { available: boolean };
    kindle?: { available: boolean };
    paperback?: { available: boolean };
    audiobook?: { available: boolean };
  } | null;
}

interface LoaderSuccess {
  title: string;
  description: string;
  books: Book[] | null;
}

interface LoaderError {
  message: string;
  error?: string;
}

type LoaderData = LoaderSuccess | LoaderError;

const FormatOverlay = ({ editions }: { editions: Book['editions'] }) => {
  if (!editions) return null;
  
  const formats = {
    epub: editions.epub?.available || false,
    kindle: editions.kindle?.available || false,
    paperback: editions.paperback?.available || false,
    audiobook: editions.audiobook?.available || false,
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 flex justify-around">
      {Object.entries(formats).map(([format, available]) => (
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

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("Collection slug:", params.slug);

  const query = `*[_type == "collection" && slug.current == $slug][0]{
    title,
    description,
    coverImage,
    "books": books[]->{
      _id,
      title,
      "slug": slug.current,  // Add this to get the book's slug
      "author": author->name,
      description,
      coverImage,
      o_publishedAt,
      editions
    }
  }`;

  try {
    const collectionData = await client.fetch(query, { slug: params.slug });
    console.log("Fetched collection data:", collectionData);
    
    if (!collectionData) {
      return json<LoaderError>(
        { message: "Collection not found" },
        { status: 404 }
      );
    }
    
    return json<LoaderSuccess>(collectionData);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return json<LoaderError>(
      { 
        message: "Failed to fetch collection data", 
        error: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
};

export default function CollectionPage() {
  const data = useLoaderData<typeof loader>();

  function isError(data: LoaderData): data is LoaderError {
    return 'message' in data;
  }

  if (isError(data)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{data.message}</h1>
          {data.error && (
            <p className="text-gray-600">{data.error}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="relative w-full h-64 md:h-80 overflow-hidden bg-gray-800">
        {data.coverImage && (
          <img
            src={builder.image(data.coverImage.asset._ref).url()}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover brightness-50"
          />
        )}
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
          {data.books?.map((book) => (
            <div key={book._id} className="flex flex-col border rounded-lg overflow-hidden">
              <div className="p-0 relative">
                {book.coverImage ? (
                  <img
                    src={builder.image(book.coverImage.asset._ref).url()}
                    alt={book.title}
                    className="w-full h-[400px] object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center rounded-t-lg">
                    <span className="text-gray-400">No cover available</span>
                  </div>
                )}
                <FormatOverlay editions={book.editions} />
              </div>
              <div className="flex-grow p-4">
                <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{book.author}</p>
                {book.o_publishedAt && (
                  <p className="text-xs text-gray-600 mb-2">
                    Originally published in {book.o_publishedAt.yearOnly}
                  </p>
                )}
                {book.description && (
                  <p className="text-sm">{book.description}</p>
                )}
              </div>
              <div className="p-4">
                <Link 
                  to={`/products/${book.slug}`} 
                  className="block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-center"
                >
                  READ
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
