import { MetaFunction } from "@remix-run/node";
import { Book, Heart, Layers } from "lucide-react";

// Import components
import MissionHero from "~/components/MissionHero";
import FeaturedMedia from "~/components/FeaturedMedia";
import FullWidthImage from "~/components/FullWidthImage";
import ValuesSection from "~/components/ValuesSection";
import CollectionPreview from "~/components/CollectionPreview";
import CallToAction from "~/components/CallToAction";

// Import data
import { featuredBooks } from "~/data/featuredBooks";

export const meta: MetaFunction = () => {
  return [
    { title: "Our Mission - Tales of Murder" },
    { name: "description", content: "Preserving classic mystery fiction for future generations." },
  ];
};

export default function AboutOurMission() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <MissionHero
        backgroundImage="/images/old-cap-collier.png"
        tagline="Preserving Literary Heritage"
        title="LEGACY"
        description="Discover forgotten classics of mystery fiction, preserved with care and delivered to a new generation of readers. At Tales of Murder, we're more than a digital archive—we're custodians of literary history."
        ctaText="Explore Our Library"
        ctaLink="/library"
      />
      
      {/* Book Cover + Statement Section */}
      <FeaturedMedia
        imageSrc="/images/covers/dead-secret.png"
        imageAlt="Cover of The Dead Secret by Wilkie Collins"
        heading1="Preserving History"
        heading2="one book at a time"
        description="Every mystery novel represents a unique glimpse into the past—its social norms, cultural anxieties, and forgotten details of everyday life. By digitizing and republishing these works, we ensure their legacy continues."
      />
      
      {/* Large Image Section */}
      <FullWidthImage 
        src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop"
        alt="Vintage books on shelves in a library"
        height="500px"
      />
      
      {/* Our Values Section */}
      <ValuesSection
        heading="What we stand for"
        values={[
          {
            icon: Book,
            title: "Thoughtfully Preserved",
            description: "We painstakingly restore original texts, preserving their authenticity while making them accessible to modern readers."
          },
          {
            icon: Layers,
            title: "Contextually Enriched",
            description: "Our editions are designed to elevate the original work with historical context, author backgrounds, and literary significance."
          },
          {
            icon: Heart,
            title: "Giving Back",
            description: "Every time you purchase one of our books, we donate a portion of proceeds to literary preservation organizations."
          }
        ]}
      />
      
      {/* Our Collection Section */}
      <CollectionPreview
        heading="Our Collection"
        viewAllLink="/library"
        viewAllText="View all"
        books={featuredBooks}
      />
      
      {/* CTA Section */}
      <CallToAction
        heading="Join Our Preservation Effort"
        description="Help us keep literary history alive by exploring our library, sharing with fellow mystery enthusiasts, or supporting our work."
        buttons={[
          {
            text: "Explore the Library",
            link: "/library",
            primary: true
          },
          {
            text: "Support Our Mission",
            link: "/support"
          }
        ]}
      />
    </div>
  );
} 