import { redirect } from "@remix-run/node";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";

// Import components
import PreservationHero from "~/components/PreservationHero";
import BookWithMessage from "~/components/BookWithMessage";
import LibraryImage from "~/components/LibraryImage";
import PreservationValues from "~/components/PreservationValues";
import MissionBanner from "~/components/MissionBanner";

import HeroSection from "~/components/HeroSection";
import BookCarousel from "~/components/BookCarousel";
import AvailableEditions from "~/components/AvailableEditions";
import HowYouCanHelp from "~/components/HowYouCanHelp";
import FeaturedArticles from "~/components/FeaturedArticles";
import NewsletterSignup from "~/components/NewsletterSignup";

// Import data
import { featuredBooks } from "~/data/featuredBooks";

// export const loader: LoaderFunction = async () => {
//   return redirect("/lp/coming-soon2?utm_source=1");
// };

export const meta: MetaFunction = () => {
  return [
    { title: "Tales of Murder - A Vintage Mystery Library" },
    { name: "description", content: "Preserving classic mystery fiction for new (and old) generations of fans." },
  ];
};

export default function Index() {
  // State for featured book of the day/week
  const [featuredBook, setFeaturedBook] = useState(featuredBooks[0]);
  
  // Select a random featured book on load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * featuredBooks.length);
    setFeaturedBook(featuredBooks[randomIndex]);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section with overlapping book cover */}
      <div className="relative">
        <PreservationHero
          backgroundImage="/images/old-cap-collier.png"
          tagline="Preserving Literary Heritage"
          title="LEGACY"
          description="Discover forgotten classics of mystery fiction, preserved with care and delivered to a new generation of readers. At Tales of Murder, we're more than a digital archive—we're custodians of literary history."
          ctaText="Explore Our Library"
          ctaLink="/library"
        />
      </div>
      
      <BookWithMessage
        imageSrc="/images/covers/dead-secret.png"
        imageAlt="Cover of The Dead Secret by Wilkie Collins"
        heading1="Preserving History"
        heading2="one book at a time"
        description="Every mystery novel represents a unique glimpse into the past—its social norms, cultural anxieties, and forgotten details of everyday life. By digitizing and republishing these works, we ensure their legacy continues."
      />
      
      <LibraryImage />
      
      <PreservationValues />
      
      {/* Moved sections from below - replacing BookShowcase */}
      <HeroSection />
      <BookCarousel books={featuredBooks} />
      <AvailableEditions />
      
      <MissionBanner />

      {/* Remaining Home Page Sections */}
      <HowYouCanHelp />
      <FeaturedArticles />
      <NewsletterSignup />
      
      {/* Footer will be rendered by your layout component */}
    </div>
  );
}
