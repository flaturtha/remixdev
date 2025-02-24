import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllFreeContent } from "~/lib/sanity.server";
import type { FreeContent } from "~/types/sanity";
import { urlFor } from "~/lib/sanity.client";
import { Link } from "@remix-run/react";
import { format } from "date-fns";

export async function loader() {
  try {
    const freeContent = await getAllFreeContent();
    return json({ freeContent });
  } catch (error) {
    console.error("Error loading free content:", error);
    return json({ freeContent: [] });
  }
}

export default function ReadFree() {
  const { freeContent } = useLoaderData<{ freeContent: FreeContent[] }>();
  
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Read Free</h1>
            <p className="text-xl text-gray-700">
              Enjoy these complete mystery stories and excerpts from our collection
            </p>
          </div>
        </div>
      </section>
      
      {/* Free Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {freeContent.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-600 mb-4">No free content found.</p>
                <p className="text-gray-500">
                  Please check your Sanity connection or add some free content to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {freeContent.map((content) => (
                  <article key={content._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {content.mainImage && (
                      <Link to={`/murderwiki/read-free/${content.slug.current}`}>
                        <img 
                          src={urlFor(content.mainImage).width(600).height(400).url()} 
                          alt={content.title} 
                          className="w-full h-48 object-cover"
                        />
                      </Link>
                    )}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
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
                      <h3 className="text-xl font-bold mb-2">
                        <Link 
                          to={`/murderwiki/read-free/${content.slug.current}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {content.title}
                        </Link>
                      </h3>
                      {content.excerpt && (
                        <p className="text-gray-700 mb-4">{content.excerpt}</p>
                      )}
                      <Link 
                        to={`/murderwiki/read-free/${content.slug.current}`}
                        className="text-blue-600 hover:underline"
                      >
                        Read story →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 