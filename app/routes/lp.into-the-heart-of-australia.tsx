import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Into the Heart of Australia - Premium Collector's Edition" },
    { name: "description", content: "A Thrilling Detective Adventure From New York to Australia's Wild Frontier - Premium Collector's Edition Hardcover" },
  ];
};

// Prevent default layout from being applied
export const handle = { disableLayout: true };

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-800 text-stone-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#8b0000] to-[#a83232] bg-clip-text text-transparent">
            Rediscover Timeless Mysteries: Collector's Edition Hardcover
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-stone-200">
            A Thrilling Detective Adventure From New York to Australia's Wild Frontier
          </p>
          <div className="mb-12">
            {/* Placeholder for 3D mockup - replace src with actual image */}
            <div className="w-full max-w-2xl mx-auto bg-stone-800/80 p-8 rounded-lg shadow-2xl">
              [Book 3D Mockup Placeholder]
            </div>
          </div>
          <Link
            to="#order"
            className="inline-block bg-[#8b0000] hover:bg-[#a83232] text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105"
          >
            Claim Your Collector's Edition
          </Link>
          <div className="mt-8 flex justify-center gap-6">
            {/* Trust badges */}
            <span className="text-stone-400">🔒 Secure Payment</span>
            <span className="text-stone-400">✓ 60-Day Guarantee</span>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="bg-stone-100 text-stone-900 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Crafted for the True Literary Collector
          </h2>
          <p className="text-xl text-center mb-12 text-stone-600">
            These aren't just stories—they're heirlooms designed to last generations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Elegant Sewn Binding",
                description: "For timeless durability",
                icon: "📚",
              },
              {
                title: "Linen-Textured Paper",
                description: "Luxurious tactile reading experience",
                icon: "📖",
              },
              {
                title: "Vintage-Inspired Cover",
                description: "Display-worthy aesthetic appeal",
                icon: "🎨",
              },
              {
                title: "Sustainably Produced",
                description: "FSC-certified materials",
                icon: "🌱",
              },
              {
                title: "Rich Sprayed Edges",
                description: "Deep crimson finish (#8b0000)",
                icon: "✨",
              },
              {
                title: "Gold Foil Embossing",
                description: "Classic sophistication",
                icon: "⭐",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-stone-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional Appeal Section */}
      <section className="bg-stone-800 text-stone-100 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Readers Cherish 'Into the Heart of Australia'
          </h2>
          <div className="space-y-6">
            {[
              {
                emoji: "🌏",
                title: "Exotic Settings & International Intrigue",
                description: "Journey from bustling New York to wild Australia",
              },
              {
                emoji: "🔍",
                title: "Classic Detective Mastery",
                description: "Experience Old Broadbrim's legendary deductive skills",
              },
              {
                emoji: "⚡",
                title: "Heart-Stopping Action & Suspense",
                description: "Thrilling twists on every page",
              },
              {
                emoji: "🌿",
                title: "Richly Layered Characters",
                description: "Vivid, memorable heroes and villains",
              },
              {
                emoji: "📖",
                title: "Authentically Reproduced Vintage Text",
                description: "A faithful, beautifully formatted classic",
              },
            ].map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-stone-700/50 p-6 rounded-lg"
              >
                <span className="text-3xl">{point.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold">{point.title}</h3>
                  <p className="text-stone-300">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-stone-100 text-stone-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            Start Your Adventure Immediately—No Waiting Required!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                time: "Today",
                title: "Original PDF Preview",
                description: "Delivered instantly",
              },
              {
                time: "2-4 Weeks",
                title: "Premium Ebook Editions",
                description: "Kindle & EPUB formats",
              },
              {
                time: "4 Weeks",
                title: "Luxurious Hardcover",
                description: "Ships to your door",
              },
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-[#8b0000] font-bold mb-2">{step.time}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-stone-600">{step.description}</p>
              </div>
            ))}
          </div>
          <Link
            to="#order"
            className="inline-block bg-[#8b0000] hover:bg-[#a83232] text-white font-bold py-4 px-8 rounded-full text-lg mt-12 transition-all transform hover:scale-105"
          >
            Order Now & Start Reading Instantly
          </Link>
        </div>
      </section>

      {/* Story Blurb Section */}
      <section className="bg-stone-800 text-stone-100 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">
            A Strange Bargain—and Its Deadly Consequences
          </h2>
          <div className="bg-stone-700/50 p-8 rounded-lg">
            <p className="text-lg leading-relaxed">
              From the bustling streets of New York City to the uncharted wilds of Western
              Australia, follow the iconic Quaker detective, Old Broadbrim, as he embarks
              on a perilous chase after a ruthless adversary. Entrusted with protecting
              one of New York's wealthiest men, Broadbrim soon finds himself entangled
              in a dark vendetta—a strange bargain that will test his courage, cunning,
              and resolve.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-stone-100 text-stone-900 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Readers are Raving—Here's Why
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "A detective classic that kept me guessing until the last page. I was utterly transported to the heart of Australia!",
                author: "Margaret H.",
              },
              {
                quote:
                  "Old Broadbrim is a masterful character—quiet, precise, deadly effective. A thrilling adventure I couldn't put down.",
                author: "James R.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <p className="text-lg mb-4 italic text-stone-600">"{testimonial.quote}"</p>
                <p className="font-bold">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-stone-800 text-stone-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            Risk Nothing—Satisfaction Fully Guaranteed
          </h2>
          <div className="bg-stone-700/50 p-8 rounded-lg">
            <div className="text-6xl mb-6">🛡️</div>
            <p className="text-lg mb-6">
              We stand by the quality of our collector's editions. If your book doesn't
              exceed your expectations, let us know within 60 days—we'll gladly refund
              your purchase.
            </p>
            <div className="inline-block border-2 border-[#8b0000] rounded-full px-6 py-2 text-[#8b0000] font-bold">
              60-Day Money-Back Guarantee
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-b from-[#8b0000] to-[#a83232] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Limited-Time Special Pricing—Secure Your Collector's Edition Now!
          </h2>
          <p className="text-lg mb-8">
            These special edition hardcovers are available at a significant discount
            during this launch period only. Don't miss your chance to own a piece of
            literary history at an exclusive price.
          </p>
          <Link
            to="#order"
            className="inline-block bg-white text-[#8b0000] font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105"
          >
            Claim Your Exclusive Edition Now
          </Link>
        </div>
      </section>

      {/* Minimal Footer - Only Required Facebook Policy Links */}
      <footer className="bg-black text-gray-400 py-2 px-4 text-xs">
        <div className="max-w-4xl mx-auto text-center space-x-4">
          <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white">Terms</Link>
          <Link to="/data-policy" className="hover:text-white">Data Policy</Link>
        </div>
      </footer>
    </div>
  );
}
