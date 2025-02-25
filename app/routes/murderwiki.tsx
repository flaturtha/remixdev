import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllPosts, getAllCategories } from "~/lib/sanity.server";
import type { Post, Category } from "~/types/sanity";
import { urlFor } from "~/lib/sanity.client";
import { Link } from "@remix-run/react";
import { format } from "date-fns";
import { MetaFunction } from "@remix-run/node";

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

export const meta: MetaFunction = () => {
  return [
    { title: "MurderWiki - Tales of Murder" },
    { name: "description", content: "Explore the history of mystery and detective fiction" },
  ];
};

export default function MurderWiki() {
  const { posts, categories } = useLoaderData<{ posts: Post[], categories: Category[] }>();
  
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8">MURDERWIKI</h1>
        
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-700 mb-4">
            Our comprehensive wiki about mystery and detective fiction is currently under development.
          </p>
          <p className="text-gray-700">
            In the future, this page will redirect to murderwiki.talesofmurder.com where you'll be able to explore the rich history and evolution of mystery literature.
          </p>
        </div>
        
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">What to Expect</h3>
          <ul className="text-left max-w-md mx-auto space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Author biographies and bibliographies</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Historical context for classic mystery works</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Evolution of detective fiction through the ages</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Analysis of influential mystery subgenres</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 