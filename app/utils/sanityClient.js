import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'joet3wd5', // Replace with your actual project ID
  dataset: 'production', // Replace with your actual dataset name
  apiVersion: '2023-08-14', // Use the current date as the API version
  useCdn: true, // Set to `false` if you want to fetch fresh data
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
