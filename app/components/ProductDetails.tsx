// components/ProductDetails.tsx

import React from "react";

const ProductDetails: React.FC<{ data: any }> = ({ data }) => {
  return (
    <section className="w-full mt-16 py-12 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4 lg:px-8 xl:px-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Product Details</h2>
        <div className="mt-6 space-y-4">
          <p className="text-sm md:text-base text-gray-700">
            <strong>ISBN:</strong> {data.isbn || "No ISBN provided"}
          </p>
          <p className="text-sm md:text-base text-gray-700">
            <strong>Word Count:</strong> {data.wordCount || "No word count provided"} pages
          </p>
          <p className="text-sm md:text-base text-gray-700">
            <strong>Original Publication Date:</strong> {data.o_publishedAtError || "No original publication date provided"}
          </p>
          <p className="text-sm md:text-base text-gray-700">
            <strong>Original Publisher:</strong> {data.isbn || "No ISBN provided"}
          </p>
          <p className="text-sm md:text-base text-gray-700">
            <strong>Genre:</strong> {data.genre || "No genre provided"}
          </p>
          <p className="text-sm md:text-base text-gray-700">
            <strong>Collections:</strong> {data.collections || "No collection provided"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
