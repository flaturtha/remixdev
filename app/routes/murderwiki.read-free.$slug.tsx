import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getFreeContentBySlug } from "~/lib/sanity.server";
import type { FreeContent } from "~/types/sanity";
import { urlFor } from "~/lib/sanity.client";
import { Link } from "@remix-run/react";
import { format } from "date-fns";
import { PortableText } from '@portabletext/react';

export async function loader({ params }: { params: { slug: string } }) {
  try {
    const content = await getFreeContentBySlug(params.slug);
    
    if (!content) {
      throw new Response("Not Found", { status: 404 });
    }
    
    return json({ content });
  } catch (error) {
    console.error("Error loading free content:", error);
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

export default function FreeContentPage() {
  const { content } = useLoaderData<{ content: FreeContent }>();
  
  return (
    <div className="flex flex-col">
      {/* Content Header */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link to="/murderwiki/read-free" className="text-blue-600 hover:underline mb-6 inline-block">
              ← Back to Free Reading
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-8">
              <time dateTime={content.publishedAt}>
                {format(new Date(content.publishedAt), 'MMMM d, yyyy')}
              </time>
              {content.categories && content.categories.length > 0 && (
                <>
                  <span className="mx-2">•</span>
                  <span>{content.categories.join(', ')}</span>
                </>
              )}
            </div>
            
            {content.mainImage && (
              <img 
                src={urlFor(content.mainImage).width(1200).height(600).url()} 
                alt={content.title} 
                className="w-full h-auto rounded-lg shadow-md mb-8"
              />
            )}
          </div>
        </div>
      </section>
      
      {/* Content Body */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {content.body && (
              <PortableText 
                value={content.body} 
                components={portableTextComponents} 
              />
            )}
          </div>
        </div>
      </section>
      
      {/* Related Content */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">More to Explore</h2>
            
            <div className="flex flex-col space-y-4">
              <Link 
                to="/murderwiki/read-free" 
                className="text-blue-600 hover:underline"
              >
                Browse all free content →
              </Link>
              
              <Link 
                to="/murderwiki" 
                className="text-blue-600 hover:underline"
              >
                Visit the MurderWiki blog →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 