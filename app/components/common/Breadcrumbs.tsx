import { Link } from '@remix-run/react';
import { ChevronRight, Home } from 'lucide-react';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex py-4 text-sm">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-gray-700 hover:text-primary">
            <Home className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {item.href ? (
                <Link 
                  to={item.href} 
                  className="ml-1 text-gray-700 hover:text-primary md:ml-2"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="ml-1 text-gray-700 md:ml-2 font-medium">
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
} 