import { redirect } from "@remix-run/node";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Book, Bookmark, RefreshCw } from 'lucide-react';
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import LazyImage from "~/components/LazyImage";
import OptimizedImage from "~/components/OptimizedImage";

// export const loader: LoaderFunction = async () => {
//   return redirect("/lp/coming-soon2?utm_source=1");
// };

export const meta: MetaFunction = () => {
  return [
    { title: "Tales of Murder - Vintage Mystery Books" },
    { name: "description", content: "Discover vintage mystery and detective fiction at Tales of Murder" },
  ];
};

export default function Index() {
  console.log("Image path:", "/images/old-cap-collier.png");

  return (
    <div className="flex flex-col">
      {/* Hero Section - Full Width */}
      <section 
        className="w-screen relative fade-in bg-cover bg-center py-16 xs:py-20 md:py-32 lg:py-40"
        style={{ 
          backgroundImage: 'url("/images/old-cap-collier.png")',
          margin: '0 -16px', // Compensate for any parent padding
          width: '100vw',
          maxWidth: '100vw',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="font-breamcatcher text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 xs:mb-6">TALES OF MURDER</h1>
            <p className="text-lg xs:text-xl md:text-2xl mb-6 xs:mb-8">
              Discover our carefully restored vintage mystery books, crafted with care and delivered to your door.
            </p>
            <Link 
              to="/collections" 
              className="inline-block bg-white text-gray-900 px-6 xs:px-8 py-3 rounded-md hover:bg-gray-100 transition-colors hover-lift pulse-subtle"
            >
              Discover Our Collections
            </Link>
          </div>
        </div>
      </section>
      
      {/* Building Community Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-breamcatcher text-4xl md:text-5xl font-bold mb-4">Preserving Literary Heritage</h2>
            <p className="text-xl text-gray-700">one book at a time</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Book className="h-12 w-12 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold mb-3">Careful Restoration</h3>
              <p className="text-gray-700">
                We meticulously restore each text, correcting errors while preserving the author's original voice and style.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <RefreshCw className="h-12 w-12 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multiple Formats</h3>
              <p className="text-gray-700">
                We publish in paperback, large print, ebook, and audiobook formats to suit every reader's preference.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Bookmark className="h-12 w-12 text-gray-900" />
              </div>
              <h3 className="text-xl font-bold mb-3">Historical Context</h3>
              <p className="text-gray-700">
                Each edition includes notes on the author and the historical context in which the work was created.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Collections */}
      <section className="py-24 md:py-32 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Collections</h2>
            <p className="text-xl text-gray-700">Explore our carefully curated collections</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* First card - Vintage True Crime */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="mb-4">
                  <img 
                    src="/images/vintage-mystery-sampler_200x200.jpg" 
                    alt="Vintage True Crime" 
                    className="w-full h-full object-cover rounded-md content-image"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-gray-100">VINTAGE TRUE CRIME</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Authentic accounts of historical crimes and investigations.</p>
                <Link 
                  to="/collections/vintage-true-crime" 
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Explore Collection →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://placehold.co/600x400/f8f5f0/333333?text=Pioneers+of+Mystery" 
                alt="Pioneers of Mystery" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Pioneers of Mystery</h3>
                <p className="text-gray-700 mb-4">
                  Early works that defined the mystery genre.
                </p>
                <Link 
                  to="/collections/pioneers-of-mystery" 
                  className="text-gray-900 font-medium hover:underline"
                >
                  Explore Collection →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://placehold.co/600x400/f8f5f0/333333?text=Old+Cap+Collier" 
                alt="Old Cap Collier Library" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Old Cap Collier Library</h3>
                <p className="text-gray-700 mb-4">
                  Classic dime novel detective stories.
                </p>
                <Link 
                  to="/collections/old-cap-collier" 
                  className="text-gray-900 font-medium hover:underline"
                >
                  Explore Collection →
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/collections" 
              className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              View All Collections
            </Link>
          </div>
        </div>
      </section>
      
      {/* Subscription Section */}
      <section className="py-24 md:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Subscribe & Save</h2>
                <p className="text-xl mb-8">
                  Sit back, let us take care of your reading list
                </p>
                <Link 
                  to="/subscribe" 
                  className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Get Your Books
                </Link>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-2">Choose your books</h3>
                  <p>
                    From single titles to our curated collections, or even surprise offerings for the more adventurous, we have the books to fit your taste.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2">Choose a frequency</h3>
                  <p>
                    Receive new books monthly, quarterly, or at your own pace—whatever frequency meets your reading needs.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2">enjoy :)</h3>
                  <p>
                    You've chosen your books and how often you want them delivered—all that's left to do is sit back and enjoy the mysteries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 xs:py-20 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl xs:text-4xl md:text-5xl font-bold mb-4 xs:mb-6">Find Your Community</h2>
            <p className="text-lg xs:text-xl mb-6 xs:mb-8">
              Ship, Share & Connect Over Vintage Mysteries
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow"
              />
              <Button type="submit" className="whitespace-nowrap">
                Subscribe for Events
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
