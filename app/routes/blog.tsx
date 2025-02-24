import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog - Tales of Murder" },
    { name: "description", content: "Read articles about vintage mystery and detective fiction" },
  ];
};

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main>
        <section className="py-12">
          <h1 className="text-4xl font-bold mb-6">Blog</h1>
          <p className="text-lg mb-8">
            Explore articles about vintage mystery fiction, authors, and the history of detective stories.
          </p>
          
          {/* Blog posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Blog post previews here */}
          </div>
        </section>
      </main>
    </div>
  );
} 