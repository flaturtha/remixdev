import type { MetaFunction } from "@remix-run/node";
import { Book, Bookmark, RefreshCw } from 'lucide-react';
import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Our Story - Tales of Murder" },
    { name: "description", content: "Learn about Tales of Murder and our mission to preserve vintage mystery fiction" },
  ];
};

export default function About() {
  return (
    <div className="flex flex-col">
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Tales of Murder</h1>
            <h2 className="text-xl text-gray-700">
              Preserving literary heritage, one mystery at a time
            </h2>
            <p className="mt-4">
            <strong>Tales of Murder</strong> is a boutique publisher dedicated to preserving and celebrating vintage mystery and detective fiction. We believe that these stories and their authors deserve recognition, credit, and preservation. Doing so is our <em>raison d'être</em>.
            </p>
          </div>
        </div>
      </section>
      
      {/* Building Community Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Preserving Literary Heritage</h2>
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
      
      {/* Our Collections Section */}
      <section className="py-24 md:py-32 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Our Collections</h2>
            
            <div className="prose prose-lg mx-auto">
              <p>
                We organize our publications into several distinct collections:
              </p>
              
              <ul className="space-y-4 mt-6">
                <li className="flex items-start">
                  <span className="font-bold mr-2">Vintage True Crime</span> 
                  <span className="block">- Authentic accounts of historical crimes and investigations</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Pioneers of Mystery</span> 
                  <span className="block">- Early works that defined the mystery genre</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Old Cap Collier Library</span> 
                  <span className="block">- Classic dime novel detective stories</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Sax Rohmer Mysteries</span> 
                  <span className="block">- The complete works of the creator of Fu Manchu</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">Brady's Secret Service</span> 
                  <span className="block">- Adventures of the famous detective from the 1890s</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* The Art of Restoration Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The Art of Restoration</h2>
            <p className="text-xl text-gray-700">at Tales of Murder</p>
            <p className="text-xl font-medium mt-2">Crafting with Care</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg">
              <p>
                At Tales of Murder, our restoration process is a carefully honed craft, combining traditional editorial techniques with a modern, accessible approach. Each book is meticulously reviewed to ensure precise control over every stage of the process, allowing the unique characteristics of the original work to shine through.
              </p>
              
              <p>
                We start by selecting high-quality, historically significant texts from the golden age of mystery fiction. The restoration process begins with a careful reading and analysis, developing a deep understanding of the author's style, the historical context, and the literary significance of the work.
              </p>
              
              <p>
                Our goal is to honor the origin of each book, preserving its natural voice while making it accessible to modern readers. The result? A perfectly restored classic that reflects the heart of our mission—vibrant, engaging, and full of the thrill that made these mysteries beloved in their time. At Tales of Murder, every restoration tells a story, and every book connects you to the literary heritage that shaped the mystery genre.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-24 md:py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl mb-8">
              Sign up for our newsletter to receive updates on new releases, special offers, and articles about vintage mystery fiction.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/newsletter" 
                className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h2>
            <p className="text-xl mb-8">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <div className="flex justify-center">
              <Link 
                to="/contact" 
                className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 