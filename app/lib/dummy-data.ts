import { Product } from "./types";

export function generateDummyProducts(count: number = 12): Product[] {
  const editionTypes = ['ebook', 'print_novel', 'print_a5', 'print_large', 'audiobook', 'free_online'];
  const periods = ['pre_1900', 'victorian', 'edwardian', 'roaring_20s'];
  const collections = ['vintage_crime', 'bradys', 'sherlock', 'agatha', 'poe'];
  
  return Array.from({ length: count }).map((_, index) => {
    const id = `prod_${index + 1}`;
    const title = `Mystery Novel ${index + 1}`;
    const author = `Author ${Math.floor(index / 3) + 1}`;
    
    // Randomly assign 1-3 edition types to each book
    const bookEditions = [];
    const numEditions = Math.floor(Math.random() * 3) + 1;
    const shuffledEditions = [...editionTypes].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < numEditions; i++) {
      bookEditions.push(shuffledEditions[i]);
    }
    
    // Randomly assign a publication period
    const period = periods[Math.floor(Math.random() * periods.length)];
    
    // Randomly assign a collection
    const collection = collections[Math.floor(Math.random() * collections.length)];
    
    // Generate a random publication year based on the period
    let pubYear;
    switch (period) {
      case 'pre_1900':
        pubYear = Math.floor(Math.random() * 30) + 1870;
        break;
      case 'victorian':
        pubYear = Math.floor(Math.random() * 10) + 1900;
        break;
      case 'edwardian':
        pubYear = Math.floor(Math.random() * 9) + 1911;
        break;
      case 'roaring_20s':
        pubYear = Math.floor(Math.random() * 5) + 1921;
        break;
      default:
        pubYear = 1900;
    }
    
    return {
      id,
      title,
      handle: `mystery-novel-${index + 1}`,
      description: `A thrilling mystery novel from ${pubYear} by ${author}.`,
      thumbnail: `https://placehold.co/600x800?text=Mystery+${index + 1}`,
      price: {
        amount: Math.floor(Math.random() * 2000) / 100 + 4.99,
        currency_code: "USD",
      },
      tags: [...bookEditions, period, collection],
      created_at: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
      publication_year: pubYear,
      author,
      collection,
      editions: bookEditions.map(type => ({
        type,
        price: {
          amount: type === 'free_online' ? 0 : Math.floor(Math.random() * 2000) / 100 + 4.99,
          currency_code: "USD"
        },
        available: Math.random() > 0.2 // 80% chance of being available
      })),
      images: [
        `https://placehold.co/600x800?text=Mystery+${index + 1}`,
        `https://placehold.co/600x800?text=Mystery+${index + 1}+Back`,
        `https://placehold.co/600x800?text=Mystery+${index + 1}+Detail`,
      ],
    };
  });
} 