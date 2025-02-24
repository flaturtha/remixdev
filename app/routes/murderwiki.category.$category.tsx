import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPostsByCategory } from "~/lib/sanity.server";
import type { Post } from "~/types/sanity";
import { urlFor } from "~/lib/sanity.server";
import { Link } from "@remix-run/react";
import { format } from "date-fns";

export async function loader({ params }: { params: { category: string } }) {
  // Convert slug format back to category name (e.g., "true-crime" -> "True Crime")
  const categoryName = params.category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const posts = await getPostsByCategory(categoryName);
  
  return json({ posts, categoryName });
}

export default function CategoryPage() {
  const { posts, categoryName } = useLoaderData<{ posts: Post[], categoryName: string }>();
  
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Link to="/murderwiki" className="text-blue-600 hover:underline mb-4 inline-block">
              ← Back to MurderWiki
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{categoryName}</h1>
            <p className="text-xl text-gray-700">
              Articles and resources in the {categoryName} category
            </p>
          </div>
        </div>
      </section>
      
      {/* Category Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No articles found in this category.</p>
                <Link to="/murderwiki" className="text-blue-600 hover:underline mt-4 inline-block">
                  Browse all articles
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {post.mainImage && (
                      <Link to={`/murderwiki/${post.slug.current}`}>
                        <img 
                          src={urlFor(post.mainImage).width(600).height(400).url()} 
                          alt={post.title} 
                          className="w-full h-48 object-cover"
                        />
                      </Link>
                    )}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <time dateTime={post.publishedAt}>
                          {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                        </time>
                        {post.categories && post.categories.length > 0 && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{post.categories.join(', ')}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        <Link 
                          to={`/murderwiki/${post.slug.current}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      {post.excerpt && (
                        <p className="text-gray-700 mb-4">{post.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between">
                        {post.author && (
                          <span className="text-sm text-gray-500">By {post.author}</span>
                        )}
                        <Link 
                          to={`/murderwiki/${post.slug.current}`}
                          className="text-blue-600 hover:underline"
                        >
                          Read more →
                        </Link>
                      </div>
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