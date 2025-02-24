export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Author {
  name: string;
  image?: SanityImage;
  bio?: any[];
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: SanityImage;
  publishedAt: string;
  excerpt?: string;
  body?: any[];
  categories?: string[];
  author?: string;
  authorImage?: SanityImage;
}

export interface Category {
  _id: string;
  title: string;
  description?: string;
}

export interface GlossaryTerm {
  _id: string;
  term: string;
  definition: any[];
  relatedTerms?: string[];
}

export interface FreeContent {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: SanityImage;
  publishedAt: string;
  excerpt?: string;
  body: any[];
  categories?: string[];
} 