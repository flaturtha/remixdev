import { Link } from "@remix-run/react";
import OptimizedImage from "./OptimizedImage";

interface CollectionCardProps {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  className?: string;
}

export default function CollectionCard({
  title,
  description,
  link,
  imageUrl,
  className = ""
}: CollectionCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="p-6">
        {imageUrl && (
          <div className="mb-4">
            <OptimizedImage 
              src={imageUrl} 
              alt={title} 
              className="w-full h-48 object-cover rounded-md content-image"
              width={400}
              height={200}
            />
          </div>
        )}
        <h3 className="text-xl font-bold mb-2 dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <Link 
          to={link} 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          Explore Collection →
        </Link>
      </div>
    </div>
  );
} 