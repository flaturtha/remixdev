import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import * as React from 'react';
import client from '../../../utils/sanityClient';  // Fixed path

// ... rest of interfaces stay the same ...

export const loader = async ({ params }: LoaderFunctionArgs) => {
  console.log("Attempting to load collection with slug:", params.slug); // Debug log
  
  const query = `*[_type == "collection" && slug.current == $slug][0]{
    title,
    description,
    "books": books[]->{
      _id,
      title,
      "author": author->name,
      description,
      coverImage,
      o_publishedAt,
      editions
    }
  }`;

  try {
    const collectionData = await client.fetch(query, { slug: params.slug });
    console.log("Fetched collection data:", collectionData); // Debug log
    
    if (!collectionData) {
      return json<LoaderError>(
        { message: "Collection not found" },
        { status: 404 }
      );
    }
    
    return json<LoaderSuccess>(collectionData);
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return json<LoaderError>(
      { 
        message: "Failed to fetch collection data", 
        error: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
};
