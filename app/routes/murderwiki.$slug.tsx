import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPostBySlug } from "~/lib/sanity.server";
import type { Post } from "~/types/sanity";
import { urlFor } from "~/lib/sanity.client";
import { Link } from "@remix-run/react";
import { format } from "date-fns";
import { PortableText } from '@portabletext/react';

export async function loader({ params }: { params: { slug: string } }) {
  try {
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      throw new Response("Not Found", { status: 404 });
    }
    
    return json({ post });
  } catch (error) {
    console.error("Error loading post:", error);
    throw new Response("Not Found", { status: 404 });
  }
}

// Configure Portable Text components
const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => (
      <img 
        src={urlFor(value).width(800).url()} 
        alt={value.alt || ''} 
        className="my-8 rounded-lg shadow-md"
      />
    ),
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode, value: any }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </a>
      );
    },
  },
};

export default function BlogPost() {
  const { post } = useLoaderData<{ post: Post }>();
  
  return (
    <div className="flex flex-col">
      {/* Article Header */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link to="/murderwiki" className="text-blue-600 hover:underline mb-6 inline-block">
              ← Back to MurderWiki
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-8">
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </time>
              {post.categories && post.categories.length > 0 && (
                <>
                  <span className="mx-2">•</span>
                  <span>{post.categories.join(', ')}</span>
                </>
              )}
              {post.author && (
                <>
                  <span className="mx-2">•</span>
                  <span>By {post.author}</span>
                </>
              )}
            </div>
            
            {post.mainImage && (
              <img 
                src={urlFor(post.mainImage).width(1200).height(600).url()} 
                alt={post.title} 
                className="w-full h-auto rounded-lg shadow-md mb-8"
              />
            )}
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {post.body && (
              <PortableText 
                value={post.body} 
                components={portableTextComponents} 
              />
            )}
          </div>
        </div>
      </section>
      
      {/* Related Articles */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Continue Reading</h2>
            
            <div className="flex flex-col space-y-4">
              <Link 
                to="/murderwiki" 
                className="text-blue-600 hover:underline"
              >
                Browse all articles →
              </Link>
              
              {post.categories && post.categories.length > 0 && (
                <Link 
                  to={`/murderwiki/category/${post.categories[0].toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-blue-600 hover:underline"
                >
                  More in {post.categories[0]} →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 