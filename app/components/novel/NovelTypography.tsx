import React from 'react';
import { twMerge } from 'tailwind-merge';

interface NovelParagraphProps {
  children: React.ReactNode;
  isFirstParagraph?: boolean;
  className?: string;
}

export function NovelParagraph({ 
  children, 
  isFirstParagraph = false,
  className
}: NovelParagraphProps) {
  return (
    <p 
      className={twMerge(
        "mb-4 leading-relaxed text-gray-800 dark:text-gray-200",
        isFirstParagraph && "first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:mr-1 first-letter:float-left",
        className
      )}
    >
      {children}
    </p>
  );
}

interface NovelHeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export function NovelHeading({ 
  children, 
  level = 2,
  className
}: NovelHeadingProps) {
  const baseStyles = "font-serif font-bold text-gray-900 dark:text-gray-100 mb-4";
  
  const sizeStyles = {
    1: "text-3xl sm:text-4xl md:text-5xl",
    2: "text-2xl sm:text-3xl md:text-4xl",
    3: "text-xl sm:text-2xl md:text-3xl",
    4: "text-lg sm:text-xl md:text-2xl",
    5: "text-base sm:text-lg md:text-xl",
    6: "text-sm sm:text-base md:text-lg",
  }[level];
  
  const combinedClassName = twMerge(baseStyles, sizeStyles, className);
  
  // Use specific heading components directly instead of dynamic tag
  switch (level) {
    case 1:
      return <h1 className={combinedClassName}>{children}</h1>;
    case 2:
      return <h2 className={combinedClassName}>{children}</h2>;
    case 3:
      return <h3 className={combinedClassName}>{children}</h3>;
    case 4:
      return <h4 className={combinedClassName}>{children}</h4>;
    case 5:
      return <h5 className={combinedClassName}>{children}</h5>;
    case 6:
      return <h6 className={combinedClassName}>{children}</h6>;
    default:
      return <h2 className={combinedClassName}>{children}</h2>;
  }
}

interface ChapterTitleProps {
  number: string | number;
  title: string;
  className?: string;
}

export function ChapterTitle({ 
  number, 
  title,
  className
}: ChapterTitleProps) {
  return (
    <div className={twMerge("text-center mb-8", className)}>
      <h3 className="text-lg uppercase tracking-widest mb-2 text-gray-600 dark:text-gray-400 font-medium">
        Chapter {number}
      </h3>
      <h4 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h4>
    </div>
  );
}

export function NovelContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="novel-page bg-stone-50 dark:bg-gray-900 min-h-screen">
      <div className="novel-container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
        {children}
      </div>
    </div>
  );
}

export function NovelHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="novel-header mb-12 text-center">
      {children}
    </header>
  );
}

export function NovelCoverImage({ 
  src, 
  alt,
  className
}: { 
  src: string; 
  alt: string;
  className?: string;
}) {
  // Debug the image path to console
  console.log("Trying to load image from:", src);
  
  return (
    <div className="cover-image-container mb-8 mx-auto max-w-xs">
      <img 
        src={src || "/images/book-covers/bat-wing_cover.png"}
        alt={alt}
        className={twMerge("shadow-xl rounded-lg w-full h-auto", className)}
      />
    </div>
  );
}

export function NovelContents({
  chapters
}: {
  chapters: { number: string; title: string }[]
}) {
  return (
    <div className="contents-section mb-16 border-t border-b border-gray-300 dark:border-gray-700 py-8">
      <h3 className="text-2xl mb-6 font-serif font-bold text-center text-gray-800 dark:text-gray-200">
        Contents
      </h3>
      <ul className="space-y-3 max-w-xl mx-auto">
        {chapters.map((chapter, index) => (
          <li key={index} className="flex items-baseline">
            <span className="mr-3 font-bold text-gray-800 dark:text-gray-200">{chapter.number}.</span>
            <span className="uppercase tracking-wide text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
              {chapter.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NovelEndMarker() {
  return (
    <div className="end-marker text-center mt-16 mb-12">
      <div className="inline-block h-1 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <p className="text-gray-500 dark:text-gray-400 mt-4 italic text-sm">The End</p>
    </div>
  );
}

export function NovelMetadata({
  publisherInfo,
  type,
  firstEdition,
  id,
  copyright,
  className
}: {
  publisherInfo: string;
  type: string;
  firstEdition: string;
  id: string;
  copyright: string;
  className?: string;
}) {
  return (
    <div className={twMerge("metadata text-sm mb-8 text-gray-600 dark:text-gray-400 space-y-1 max-w-md mx-auto", className)}>
      <p>{publisherInfo}</p>
      <p>{type}</p>
      <p>First edition {firstEdition}</p>
      <p className="font-mono text-xs">{id}</p>
      <p className="text-xs mt-3 italic">{copyright}</p>
    </div>
  );
} 