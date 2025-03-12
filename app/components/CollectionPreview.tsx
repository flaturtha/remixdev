import { Link } from "@remix-run/react";
import { Book } from "~/components/BookCarousel";

interface CollectionPreviewProps {
  heading: string;
  viewAllLink: string;
  viewAllText: string;
  books: Book[];
}

export default function CollectionPreview({ 
  heading, 
  viewAllLink, 
  viewAllText = "View all",
  books 
}: CollectionPreviewProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-serif">{heading}</h2>
          <Link to={viewAllLink} className="text-[#8b0000] hover:underline">{viewAllText} →</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.slice(0, 4).map((book) => (
            <Link key={book.id} to={book.path} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img 
                src={book.cover} 
                alt={book.title}
                className="w-full h-auto mb-4"
              />
              <h3 className="font-bold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 