import { Link } from "@remix-run/react";
import type { Book } from "~/components/BookCarousel";

export default function BookShowcase() {
  // We'll just use a subset of the featured books for this showcase
  const showcaseBooks: Book[] = [
    {
      id: "2",
      title: "THE DEAD SECRET",
      author: "Wilkie Collins",
      cover: "/images/covers/dead-secret.png",
      path: "/library/dead-secret"
    },
    {
      id: "1",
      title: "BRADY'S AND THE CHINESE IDOL",
      author: "A New York Detective",
      cover: "/images/covers/chinese-idol.png",
      path: "/library/bradys-and-the-chinese-idol"
    },
    {
      id: "4",
      title: "BAT WING",
      author: "Sax Rohmer",
      cover: "/images/covers/bat-wing.png",
      path: "/library/bat-wing"
    },
    {
      id: "3",
      title: "THE EXPRESSMAN AND THE DETECTIVE",
      author: "Allan Pinkerton",
      cover: "/images/covers/expressman.png",
      path: "/library/expressman-and-the-detective"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-serif">Our Collection</h2>
          <Link to="/library" className="text-[#8b0000] hover:underline">View all →</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {showcaseBooks.map((book) => (
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