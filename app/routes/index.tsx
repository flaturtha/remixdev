import { Button } from "~/components/ui/button";
import CollectionCard from "~/components/CollectionCard";
import { Link } from "@remix-run/react";
import OptimizedImage from "~/components/OptimizedImage";

export default function Index() {
  const collections = [
    {
      title: "VINTAGE TRUE CRIME",
      description: "Authentic accounts of historical crimes and investigations.",
      link: "/collections/vintage-true-crime",
      imageUrl: "/images/vintage-mystery-sampler_200x200.jpg"
    },
    {
      title: "PIONEERS OF MYSTERY",
      description: "Early works that defined the mystery genre.",
      link: "/collections/pioneers-of-mystery",
      imageUrl: "/images/pioneers-of-mystery.jpg"
    },
    {
      title: "OLD CAP COLLIER LIBRARY",
      description: "Classic dime novel detective stories.",
      link: "/collections/old-cap-collier",
      imageUrl: "/images/old-cap-collier.jpg"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Featured Collections</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((collection) => {
          if (collection.title === "VINTAGE TRUE CRIME") {
            return (
              <div key={collection.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="mb-4">
                    <OptimizedImage 
                      src="/images/vintage-mystery-sampler_200x200.jpg" 
                      alt="Vintage True Crime" 
                      className="w-full h-48 object-cover rounded-md content-image"
                      width={400}
                      height={200}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-gray-100">{collection.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{collection.description}</p>
                  <Link 
                    to={collection.link} 
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Explore Collection →
                  </Link>
                </div>
              </div>
            );
          }
          
          return (
            <CollectionCard
              key={collection.title}
              title={collection.title}
              description={collection.description}
              link={collection.link}
              imageUrl={collection.imageUrl}
            />
          );
        })}
      </div>
      
      <div className="text-center mt-12">
        <Link 
          to="/collections" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          View All Collections
        </Link>
      </div>
    </div>
  );
} 