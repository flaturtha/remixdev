import { createClient } from '@sanity/client';

// Create a server client with full capabilities
export const sanityClient = createClient({
  projectId: 'joet3wd5',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
});

// Fetch all blog posts
export async function getAllPosts() {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      "categories": categories[]->title,
      "author": author->name
    }
  `);
}

// Fetch a single blog post by slug
export async function getPostBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      body,
      "categories": categories[]->title,
      "author": author->name,
      "authorImage": author->image
    }
  `, { slug });
}

// Fetch posts by category
export async function getPostsByCategory(category: string) {
  return sanityClient.fetch(`
    *[_type == "post" && $category in categories[]->title] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      "categories": categories[]->title,
      "author": author->name
    }
  `, { category });
}

// Fetch all categories
export async function getAllCategories() {
  return sanityClient.fetch(`
    *[_type == "category"] {
      _id,
      title,
      description
    }
  `);
}

// Fetch glossary terms
export async function getAllGlossaryTerms() {
  return sanityClient.fetch(`
    *[_type == "glossaryTerm"] | order(term asc) {
      _id,
      term,
      definition,
      relatedTerms
    }
  `);
}

// Fetch free content
export async function getAllFreeContent() {
  return sanityClient.fetch(`
    *[_type == "freeContent"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      excerpt,
      body,
      "categories": categories[]->title
    }
  `);
}

// Fetch single free content by slug
export async function getFreeContentBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "freeContent" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      body,
      "categories": categories[]->title
    }
  `, { slug });
} 