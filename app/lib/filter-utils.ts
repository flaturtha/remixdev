import { Product } from "./types";

export function applyFilters(
  products: Product[], 
  editions: string[], 
  periods: string[], 
  collections: string[]
): Product[] {
  let filteredProducts = [...products];
  
  if (editions.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      const productEditions = product.tags || [];
      return editions.some(edition => productEditions.includes(edition));
    });
  }
  
  if (periods.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      const productPeriod = product.tags?.find(tag => 
        ['pre_1900', 'victorian', 'edwardian', 'roaring_20s'].includes(tag)
      ) || '';
      return periods.includes(productPeriod);
    });
  }
  
  if (collections.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      return collections.includes(product.collection || '');
    });
  }
  
  return filteredProducts;
}

export function sortProducts(products: Product[], sortOption: string): Product[] {
  switch (sortOption) {
    case 'title_asc':
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    case 'title_desc':
      return [...products].sort((a, b) => b.title.localeCompare(a.title));
    case 'price_low':
      return [...products].sort((a, b) => a.price.amount - b.price.amount);
    case 'price_high':
      return [...products].sort((a, b) => b.price.amount - a.price.amount);
    case 'oldest_pub':
      return [...products].sort((a, b) => (a.created_at || '').localeCompare(b.created_at || ''));
    case 'newest':
    default:
      return [...products].sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
  }
} 