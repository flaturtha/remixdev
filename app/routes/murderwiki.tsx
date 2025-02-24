import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllPosts, getAllCategories } from "~/lib/sanity.server";
import type { Post, Category } from "~/types/sanity";
import { urlFor } from "~/lib/sanity.client";
import { Link } from "@remix-run/react";
import { format } from "date-fns";

export async function loader() {
  try {
    const [posts, categories] = await Promise.all([
      getAllPosts(),
      getAllCategories(),
    ]);
    
    return json({ posts, categories });
  } catch (error) {
    console.error("Error loading MurderWiki data:", error);
    // Return empty arrays to prevent the page from crashing
    return json({ posts: [], categories: [] });
  }
}

export default function MurderWiki() {
  const { posts, categories } = useLoaderData<{ posts: Post[], categories: Category[] }>();
  
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">MurderWiki</h1>
            <p className="text-xl text-gray-700">
              Explore articles, stories, and resources about vintage mystery fiction
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      to="/murderwiki" 
                      className="text-gray-700 hover:text-gray-900 hover:underline"
                    >
                      All Articles
                    </Link>
                  </li>
                  {categories.map((category) => (
                    <li key={category._id}>
                      <Link 
                        to={`/murderwiki/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-700 hover:text-gray-900 hover:underline"
                      >
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <h2 className="text-xl font-bold mt-8 mb-4">Resources</h2>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      to="/murderwiki/read-free" 
                      className="text-gray-700 hover:text-gray-900 hover:underline"
                    >
                      Read Free
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/murderwiki/glossary" 
                      className="text-gray-700 hover:text-gray-900 hover:underline"
                    >
                      Glossary
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
              
              {posts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-xl text-gray-600 mb-4">No articles found.</p>
                  <p className="text-gray-500">
                    Please check your Sanity connection or add some posts to get started.
                  </p>
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
        </div>
      </section>
    </div>
  );
} 