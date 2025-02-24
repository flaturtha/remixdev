// components/ProductDescription.tsx
import { Link } from "@remix-run/react";
import { PortableText } from '@portabletext/react';

const ProductDescription: React.FC<{ data: any }> = ({ data }) => {
  console.log("Product Description Data:", data); // Log to check if `blurb` exists

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 ">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About the Book</h2>
            <div className="prose prose-lg">
              {data?.blurb ? (
                <PortableText value={data.blurb} />
              ) : (
                <p>No description available.</p> // Fallback if `blurb` is undefined
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;

