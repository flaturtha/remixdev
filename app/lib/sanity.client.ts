import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { createClient } from '@sanity/client';

// This client is safe to use in the browser
export const sanityClient = createClient({
  projectId: 'joet3wd5',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

// Export config for server usage
export const clientConfig = {
  projectId: 'joet3wd5',
  dataset: 'production',
  apiVersion: '2023-05-03',
};

// Create an image URL builder
const builder = imageUrlBuilder(sanityClient);

// Helper function to generate image URLs
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
} 