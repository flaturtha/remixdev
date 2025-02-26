import { ReactNode } from 'react';

interface PageHeadingProps {
  children: ReactNode;
  className?: string;
}

export function PageHeading({ children, className = '' }: PageHeadingProps) {
  return (
    <h1 className={`text-4xl font-bold tracking-tight text-gray-900 ${className}`}>
      {children}
    </h1>
  );
} 