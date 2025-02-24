import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = ({ params }) => {
  const edition = params.edition?.replace(/-/g, " ");
  const formattedEdition = edition
    ? edition.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "";
  
  return [
    { title: `${formattedEdition} Books - Tales of Murder` },
    { name: "description", content: `Browse our collection of books in ${formattedEdition.toLowerCase()} format` },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const edition = params.edition;
  // In a real app, you would fetch data based on the edition
  return { edition };
}

export default function ShopEdition() {
  const { edition } = useLoaderData<typeof loader>();
  const formattedEdition = edition
    .replace(/-/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="container mx-auto px-4 py-8">
      <main>
        <section className="py-12">
          <h1 className="text-4xl font-bold mb-6">{formattedEdition} Books</h1>
          <p className="text-lg mb-8">
            Browse our collection of books available in {formattedEdition.toLowerCase()} format.
          </p>
          
          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Products would go here */}
            <p>No products found in this format yet.</p>
          </div>
        </section>
      </main>
    </div>
  );
} 