import React from "react";
import EditionDropdown from "./EditionDropdown";
import { Link } from "@remix-run/react";

const Hero: React.FC<{ data: any }> = ({ data }) => {
  const [selectedEdition, setSelectedEdition] = React.useState("Select edition");

  const handleSelectEdition = (edition: string) => {
    setSelectedEdition(edition);
    // Additional logic can go here
  };

  return (
    <section className="w-full pt-12 md:py-20">
      <div className="container space-y-10 xl:space-y-16">
        <div className="grid gap-4 px-4 md:grid-cols-2 md:gap-16">
          <div>
            <img
              src={data.coverImage?.asset?.url || "https://via.placeholder.com/400x600"}
              width="400"
              height="600"
              alt={data.title || "Book Cover"}
              className="mx-auto aspect-[2/3] overflow-hidden rounded-xl object-cover"
            />
          </div>
          <div className="flex flex-col items-start space-y-4">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] font-breamcatcher">
            {data.title || "Default Title"}
            </h1>
            <h2 className="text-muted-foreground md:text-xl">By {data.authorName || "Unknown Author"}</h2>
            <p className="text-muted-foreground md:text-xl pt-2 pb-6 italic">
            {data.tagline || "Unknown Tagline"}
            </p>

            <EditionDropdown
              onSelect={handleSelectEdition}
              selectedEdition={selectedEdition}
            />
            <div className="flex flex-wrap justify-between gap-2 mt-4 w-full">
              <button className="flex-1 min-w-[calc(33.333%-0.5rem)] inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-green-600 text-white hover:bg-green-700 h-11 rounded-md px-8 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 ring-offset-background">
                Add to Cart
              </button>
              <button className="flex-1 min-w-[calc(33.333%-0.5rem)] inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-yellow-500 text-black hover:bg-yellow-600 h-11 rounded-md px-8 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ring-offset-background">
                Buy Now
              </button>
              <Link
                to="#free"
                className="flex-1 min-w-[calc(33.333%-0.5rem)] inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 h-11 rounded-md px-8 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ring-offset-background"
              >
                Read Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
