import { Product } from "./types";

export function generateDummyProducts(count: number = 12): Product[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `prod_${i + 1}`,
    title: `Product ${i + 1}`,
    description: `This is a description for product ${i + 1}. It's a great product with many features.`,
    thumbnail: `https://placehold.co/300x400?text=Product+${i + 1}`,
    price: {
      amount: Math.floor(Math.random() * 10000) / 100,
      currency_code: "USD",
    },
    handle: `product-${i + 1}`,
  }));
} 