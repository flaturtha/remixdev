import React from 'react';
import Hero from './Hero';
import ProductDescription from './ProductDescription';
import Reviews from './Reviews';
import RelatedBooks from './RelatedBooks';
import ProductDetails from './ProductDetails';
import Shoutout from './Shoutout';
import FullText from './FullText';

const ProductPageLayout: React.FC<{ product: any }> = ({ product }) => {
  console.log("Product data passed to layout:", product);

  return (
    <div className="flex flex-col min-h-[100vh]">
      <main className="flex-1">
        <Hero data={product} />
        <div className="w-screen bg-gray-100">
          <div className="container mx-auto px-4 lg:px-8 xl:px-16 py-8 lg:flex lg:gap-8">
            <div className="w-full lg:w-1/2">
              <ProductDescription data={product} />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-start">
              <div>
                <ProductDetails data={product} />
              </div>
              <div>
                <Shoutout data={product.shoutout} />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <Reviews data={product.reviews} />
        </div>
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <RelatedBooks data={product.relatedBooks} />
        </div>
        <div className="container mx-auto px-4 lg:px-8 xl:px-16">
          <FullText 
            data={product.fullText} 
            title={product.title} 
            authorName={product.authorName} 
            o_publishedAt={product.o_publishedAt} 
            o_publishedBy={product.o_publishedBy}
            o_volnum={product.o_volnum}
            tagline={product.tagline}
          />
        </div>
      </main>
    </div>
  );
};

export default ProductPageLayout;
