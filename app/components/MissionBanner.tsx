import { Link } from "@remix-run/react";

export default function MissionBanner() {
  return (
    <section className="py-20 bg-[#8b0000] text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl mb-6">Join Our Preservation Effort</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg">
          Help us keep literary history alive by exploring our library, sharing with fellow mystery enthusiasts, or supporting our work.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/library" 
            className="bg-white text-[#8b0000] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
          >
            Explore the Library
          </Link>
          <Link 
            to="/about-our-mission" 
            className="border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white/10 transition-colors"
          >
            Our Mission
          </Link>
        </div>
      </div>
    </section>
  );
} 