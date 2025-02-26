export interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: {
    amount: number;
    currency_code: string;
  };
  handle: string;
  tags?: string[];
  created_at?: string;
  publication_year?: number;
  author?: string;
  collection?: string;
  editions?: {
    type: 'ebook' | 'print_novel' | 'print_a5' | 'print_large' | 'audiobook' | 'free_online';
    price: {
      amount: number;
      currency_code: string;
    };
    available: boolean;
  }[];
}

export interface PaginationProps {
  count: number;
  offset: number;
  limit: number;
} 