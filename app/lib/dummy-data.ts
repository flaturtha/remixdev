import { Product } from "./types";

// Realistic vintage mystery titles, authors, and descriptions
const mysteryTitles = [
  "Bat Wing", "Golden Scorpion", "Green Eyes of Bast", "Scarlet Clue", 
  "Murder at Midnight", "Vanishing Lady", "Three Coffins", "Mystery of the Blue Train",
  "Death on the Nile", "Five Little Pigs", "Secret Adversary", "Moving Finger",
  "Strong Poison", "Murder Must Advertise", "Nine Tailors", "Postman Always Rings Twice",
  "Big Sleep", "Farewell, My Lovely", "Maltese Falcon", "Thin Man",
  "Mysterious Affair at Styles", "Murder at the Vicarage", "Body in the Library",
  "Haunted Gallery", "Mystery of Room 113", "Case of the Velvet Claws",
  "Secret of Chimneys", "Cards on the Table", "ABC Murders", "Man in the Brown Suit",
  "Hollow Man", "Peril at End House", "And Then There Were None",
  "Death in the Clouds", "Dying Detective", "Study in Scarlet"
];

const mysteryAuthors = [
  "Agatha Christie", "Dorothy L. Sayers", "Sax Rohmer", "Raymond Chandler", 
  "Dashiell Hammett", "Arthur Conan Doyle", "Edgar Wallace", "G.K. Chesterton",
  "Ngaio Marsh", "John Dickson Carr", "Margery Allingham", "Ellery Queen",
  "Erle Stanley Gardner", "Patricia Wentworth", "Anthony Berkeley", "Rex Stout",
  "Cornell Woolrich", "James M. Cain", "Anna Katharine Green", "Mary Roberts Rinehart"
];

// Realistic descriptions for vintage mysteries
const generateDescription = (title: string, author: string, year: number): string => {
  const descriptions = [
    `A classic ${year} mystery by ${author}, "${title}" follows a brilliant detective's investigation into a seemingly impossible crime that baffles the police.`,
    `Published in ${year}, this ${author} masterpiece weaves an intricate puzzle of clues, red herrings, and suspicious characters that will keep readers guessing until the final page.`,
    `One of ${author}'s most atmospheric works (${year}), "${title}" combines a chilling murder with psychological suspense in a tale that defined the Golden Age of detective fiction.`,
    `A forgotten gem from ${year}, this ${author} novel features clever misdirection and a surprise ending that shocked readers of the era.`,
    `Set against the backdrop of ${year > 1920 ? 'post-war society' : 'Victorian England'}, "${title}" showcases ${author}'s talent for creating memorable characters caught in a web of deceit and murder.`,
    `Written at the height of ${author}'s career in ${year}, this locked-room mystery presents an apparently impossible crime with a brilliant solution that reveals the author's ingenious plotting.`,
    `A thrilling tale of conspiracy and murder from ${year}, featuring ${author}'s recurring detective facing perhaps their most baffling case yet.`,
    `This rare ${author} classic from ${year} combines elements of the detective story with Gothic horror, creating an atmosphere of mounting dread as the investigation unfolds.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// Helper to create slug from title
const createSlug = (title: string): string => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export function generateDummyProducts(count: number = 12): Product[] {
  const editionTypes: Array<"ebook" | "print_novel" | "print_a5" | "print_large" | "audiobook" | "free_online"> = 
    ['ebook', 'print_novel', 'print_a5', 'print_large', 'audiobook', 'free_online'];
  const periods = ['pre_1900', 'victorian', 'edwardian', 'roaring_20s'];
  const collections = ['vintage_crime', 'bradys', 'sherlock', 'agatha', 'poe'];
  
  // Shuffle the titles and authors arrays
  const shuffledTitles = [...mysteryTitles].sort(() => 0.5 - Math.random());
  const shuffledAuthors = [...mysteryAuthors].sort(() => 0.5 - Math.random());
  
  return Array.from({ length: count }).map((_, index) => {
    // Pick a title and author (cycling through if we need more than we have)
    const title = shuffledTitles[index % shuffledTitles.length];
    const author = shuffledAuthors[index % shuffledAuthors.length];
    const id = `prod_${index + 1}`;
    const handle = createSlug(title);
    
    // Randomly assign 1-3 edition types to each book
    const bookEditions: Array<"ebook" | "print_novel" | "print_a5" | "print_large" | "audiobook" | "free_online"> = [];
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
    
    // Generate a description based on the title, author, and year
    const description = generateDescription(title, author, pubYear);
    
    // Create more realistic placeholder images using colors and styling that evoke vintage books
    const coverColor = ['964B00', '582900', '7B3F00', 'A0522D', '800000', '8B0000', '220000'][Math.floor(Math.random() * 7)];
    const textColor = 'EADDCA';
    const coverImage = `https://placehold.co/600x900/${coverColor}/${textColor}?text=${encodeURIComponent(title.replace(/\s/g, '+'))}`;
    
    return {
      id,
      title,
      handle,
      description,
      thumbnail: coverImage,
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
        coverImage,
        `https://placehold.co/600x900/EADDCA/${coverColor}?text=${encodeURIComponent(title.replace(/\s/g, '+'))}+Back`,
        `https://placehold.co/600x900/8B0000/${textColor}?text=${encodeURIComponent(author.replace(/\s/g, '+'))}`
      ],
    };
  });
} 