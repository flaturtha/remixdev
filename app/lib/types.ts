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
}

export interface PaginationProps {
  count: number;
  offset: number;
  limit: number;
} 