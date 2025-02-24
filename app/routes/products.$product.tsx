import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import client from '../utils/sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

const bookFormats = [
  { name: 'eBook', image: '/placeholder.svg?height=600&width=400', price: '$9.99' },
  { name: 'Kindle', image: '/placeholder.svg?height=400&width=300', price: '$9.99' },
  { name: 'Paperback', image: '/placeholder.svg?height=500&width=350', price: '$19.99' },
  { name: 'Hardcover', image: '/placeholder.svg?height=600&width=600', price: '$24.99' },
  { name: 'Large Print', image: '/placeholder.svg?height=600&width=400', price: '$29.99' },
];

// First, let's define interfaces for the block content structure
interface BlockChild {
  _type: string;
  marks?: string[];
  text: string;
  _key?: string;
}

interface MarkDef {
  _key: string;
  _type: string;
  href?: string;
  // Add other mark definition properties as needed
}

interface Block {
  _type: string;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
  _key?: string;
  children: BlockChild[];
  markDefs?: MarkDef[];
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("Loader params:", params);
  
  const query = `*[_type == "product" && slug.current == $slug][0]{
    ...,
    "authorName": author->name,
    "genreTitle": genre->title,
    "description": blurb[]{
      "text": children[].text,
      "type": _type,
      "style": style
    },
    fullText[]{
      ...,
      children[]{
        ...,
        marks,
        text
      }
    }
  }`;

  try {
    const bookData = await client.fetch(query, { slug: params.product });
    console.log("Fetched book data:", JSON.stringify(bookData, null, 2));
    if (!bookData) {
      throw new Error("No book data found");
    }

    const transformedData = {
      ...bookData,
      author: bookData.authorName,
      genre: bookData.genreTitle
    };

    return json({ book: transformedData });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return json({ error: error instanceof Error ? error.message : "Unknown error occurred" });
  }
};

interface BookData {
  title: string;
  author: string;
  genre: string;
  description: string | null;
  editions: {
    epub?: { isbn: string; price: number };
    kindle?: { isbn: string; price: number };
    paperback?: { isbn: string; price: number };
    hardcover?: { isbn: string; price: number };
    largePrint?: { isbn: string; price: number };
  };
  pageCount: number;
  o_publishedAt: { yearOnly: number };
  o_publishedBy: string;
  coverImage: { asset: { _ref: string } };
  fullText: Block[];
}

export default function ProductPage() {
  const data = useLoaderData<{ book: BookData; error?: string }>();
  const navigation = useNavigation();
  
  const [selectedFormat, setSelectedFormat] = useState(bookFormats[0]);
  const [currentISBN, setCurrentISBN] = useState<string>('Not available');
  const [currentPrice, setCurrentPrice] = useState<string>('Not available');

  useEffect(() => {
    console.log("Selected format:", selectedFormat);
    console.log("Book editions:", data.book?.editions);
    if (data.book && data.book.editions) {
      let editionKey: string | undefined;
      if (selectedFormat.name === 'eBook') editionKey = 'epub';
      else editionKey = selectedFormat.name.toLowerCase();
      
      const edition = data.book.editions[editionKey as keyof typeof data.book.editions];
      console.log("Selected edition:", edition);
      if (edition) {
        setCurrentISBN(edition.isbn || 'Not available');
        setCurrentPrice(edition.price ? `$${edition.price.toFixed(2)}` : 'Not available');
      } else {
        setCurrentISBN('Not available');
        setCurrentPrice('Not available');
      }
    }
  }, [selectedFormat, data.book, setCurrentISBN, setCurrentPrice]); // Added missing dependencies

  const renderValue = (value: string | number | undefined | null): string => {
    if (value === null || value === undefined) return 'Not available';
    return value.toString();
  };

  const renderPublicationDate = (date: { yearOnly: number } | undefined): string => {
    if (date && 'yearOnly' in date) {
      return date.yearOnly.toString();
    }
    return 'Not available';
  };

  // Move renderBlock inside the component to access data
  const renderBlock = (block: Block) => {
    const style = block.style || 'normal';

    switch (style) {
      case 'h1':
        // Book title
        return (
          <h1 className="text-4xl font-bold text-center mb-8">
            {block.children.map(child => child.text).join('')}
          </h1>
        );
      case 'h2':
        // Author byline
        return (
          <h2 className="text-xl text-center mb-12 text-gray-600">
            {block.children.map(child => child.text).join('')}
          </h2>
        );
      case 'h3':
        // Chapter number - now left aligned, adjusted spacing
        return (
          <h3 className="text-2xl mt-24 mb-1 text-gray-500"> {/* Reduced bottom margin */}
            {block.children.map(child => child.text).join('')}
          </h3>
        );
      case 'h4':
        // Chapter title - now left aligned, more space below
        return (
          <h4 className="text-3xl font-black uppercase tracking-wide mb-8"> {/* Increased bottom margin */}
            {block.children.map(child => child.text).join('')}
          </h4>
        );
      case 'blockquote':
        return (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
            {block.children.map(child => child.text).join('')}
          </blockquote>
        );
      default: {
        // Check if this is the first paragraph after a chapter title
        const isFirstParagraphAfterChapter = block._key === 
          data.book.fullText.find((b: Block, i: number) => 
            i > 0 && 
            data.book.fullText[i-1].style === 'h4'
          )?._key;

        return (
          <p className={`mb-4 leading-relaxed ${
            isFirstParagraphAfterChapter ? 'first-line:uppercase first-line:tracking-wide' : ''
          }`}>
            {block.children.map((child: BlockChild, index: number) => (
              <span 
                key={index}
                className={`
                  ${child.marks?.includes('strong') ? 'font-bold' : ''}
                  ${child.marks?.includes('em') ? 'italic' : ''}
                  ${child.marks?.includes('underline') ? 'underline' : ''}
                `}
              >
                {child.text}
              </span>
            ))}
          </p>
        );
      }
    }
  };

  if (navigation.state === "loading") {
    return <div className="text-center py-8">Loading...</div>;
  }

  if ('error' in data) {
    return <div className="text-center py-8 text-red-600">Error: {data.error}</div>;
  }

  if (!data.book || Object.keys(data.book).length === 0) {
    return <div className="text-center py-8">No book data available. Please check the URL and try again.</div>;
  }

  const imageUrl = data.book.coverImage?.asset?._ref
    ? builder.image(data.book.coverImage.asset._ref).url()
    : selectedFormat.image;

  return (
    <div className="container mx-auto px-4 py-8">
      <article>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '1' }}>
            <img
              src={imageUrl}
              alt={`Cover of ${renderValue(data.book.title)}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{renderValue(data.book.title)}</h1>
              <p className="text-lg mb-2">by {renderValue(data.book.author)}</p>
              <p className="text-sm text-gray-600 mb-4">Genre: {renderValue(data.book.genre)}</p>
              <select 
                className="w-full mb-4 p-2 border rounded"
                onChange={(e) => setSelectedFormat(bookFormats.find(format => format.name === e.target.value) || bookFormats[0])}
              >
                {bookFormats.map((format) => (
                  <option key={format.name} value={format.name}>
                    {format.name} - {format.price}
                  </option>
                ))}
              </select>
              <div className="text-sm mb-6 space-y-4">
                {Array.isArray(data.book.description) ? 
                  data.book.description.map((block, index) => (
                    <p key={index} className="leading-relaxed">
                      {Array.isArray(block.text) ? block.text.join(' ') : block.text}
                    </p>
                  ))
                  : renderValue(data.book.description)
                }
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Product Details</h2>
                <p>ISBN: {currentISBN}</p>
                <p>Pages: {renderValue(data.book.pageCount)}</p>
                <p>Publication Date: {renderPublicationDate(data.book.o_publishedAt)}</p>
                <p>Publisher: {renderValue(data.book.o_publishedBy)}</p>
              </div>
            </div>
            <div>
              <button className="w-full text-lg py-6 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Buy Now - {currentPrice}
              </button>
              <a href="#read-free" className="text-center block text-blue-600 hover:underline">Read for free online</a>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">What Readers Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((testimonial) => (
              <div key={testimonial} className="p-4 border rounded">
                <p className="italic mb-2">&ldquo;An absolute page-turner! I couldn&apos;t put it down.&rdquo;</p>
                <p className="text-sm text-gray-600">- Reader {testimonial}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="read-free" className="mt-8">
          <div className="p-6 border rounded">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <BookOpen className="mr-2" />
              Read &ldquo;{renderValue(data.book.title)}&rdquo; Online for Free
            </h2>
            <p className="mb-4">
              Enjoy the complete web version of &ldquo;{renderValue(data.book.title)}&rdquo; right here on our website. No download required!
            </p>
            <div className="bg-white p-8 rounded-lg mb-4">
              <div className="prose prose-lg max-w-none">
                {Array.isArray(data.book.fullText) ? 
                  data.book.fullText.map((block: Block, index: number) => (
                    <div key={index}>
                      {renderBlock(block)}
                    </div>
                  ))
                  : <p>Full text not available.</p>
                }
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Previous Chapter
              </button>
              <span className="text-gray-600">Chapter 1 of X</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Next Chapter
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
