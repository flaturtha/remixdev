import { Link } from "@remix-run/react";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: React.ReactNode;
  url?: string;
}

export interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ breadcrumbs, className = "" }: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumbs">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
          )}
          {breadcrumb.url ? (
            <Link
              to={breadcrumb.url}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              {breadcrumb.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-gray-100">{breadcrumb.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
} 