import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = ({ params }) => {
  const category = params.category?.replace(/-/g, " ");
  const formattedCategory = category
    ? category.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "";
  
  return [
    { title: `${formattedCategory} Books - Tales of Murder` },
    { name: "description", content: `Browse our collection of ${formattedCategory.toLowerCase()} books` },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const category = params.category;
  // In a real app, you would fetch data based on the category
  return { category };
}

export default function ShopCategory() {
  const { category } = useLoaderData<typeof loader>();
  const formattedCategory = category
    .replace(/-/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="container mx-auto px-4 py-8">
      <main>
        <section className="py-12">
          <h1 className="text-4xl font-bold mb-6">{formattedCategory}</h1>
          <p className="text-lg mb-8">
            Browse our collection of {formattedCategory.toLowerCase()} books.
          </p>
          
          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Products would go here */}
            <p>No products found in this category yet.</p>
          </div>
        </section>
      </main>
    </div>
  );
} 