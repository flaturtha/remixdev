import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Search, BookOpen, FileText, Home } from 'lucide-react';
import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "404 - Page Not Found | Tales of Murder" },
    { name: "description", content: "The page you're looking for seems to have vanished without a trace." },
  ];
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/">
              <img 
                src="/images/logo_full.svg" 
                alt="Tales of Murder" 
                className="w-full h-auto [filter:invert(1)] max-h-16"
              />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-stone-200 dark:bg-stone-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="space-y-2 text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tighter text-stone-800 dark:text-stone-100">
                  Case File: 404
                </h1>
                <p className="text-xl text-stone-600 dark:text-stone-400">
                  Missing Page Report
                </p>
              </div>

              <div className="bg-stone-100 dark:bg-stone-700 p-6 rounded-lg shadow-inner mb-8">
                <p className="text-stone-800 dark:text-stone-200 mb-4">
                  <span className="font-semibold">Status:</span> Ongoing Investigation
                </p>
                <p className="text-stone-800 dark:text-stone-200 mb-4">
                  <span className="font-semibold">Details:</span> The page you're looking for seems to have vanished without a trace. Our top detective is on the case.
                </p>
                <p className="text-stone-800 dark:text-stone-200">
                  <span className="font-semibold">Last Seen:</span> In the vast library of vintage crime fiction
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tighter text-stone-800 dark:text-stone-100 mb-4">
                  Search for Clues
                </h2>
                <div className="flex gap-2">
                  <Input 
                    type="text" 
                    placeholder="Enter keywords..." 
                    className="flex-grow bg-stone-50 dark:bg-stone-800" 
                  />
                  <Button variant="outline" className="bg-stone-800 text-stone-100 hover:bg-stone-700 dark:bg-stone-700 dark:hover:bg-stone-600">
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tighter text-stone-800 dark:text-stone-100 mb-4">
                  Explore Our Archives
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link 
                    to="/" 
                    className="flex items-center p-4 bg-stone-100 dark:bg-stone-700 rounded-lg 
                             hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors
                             text-stone-800 dark:text-stone-100"
                  >
                    <Home className="mr-2 h-5 w-5 text-red-800 dark:text-red-500" />
                    <span>Return Home</span>
                  </Link>
                  <Link 
                    to="/about" 
                    className="flex items-center p-4 bg-stone-100 dark:bg-stone-700 rounded-lg 
                             hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors
                             text-stone-800 dark:text-stone-100"
                  >
                    <FileText className="mr-2 h-5 w-5 text-red-800 dark:text-red-500" />
                    <span>About Us</span>
                  </Link>
                  <Link 
                    to="/library" 
                    className="flex items-center p-4 bg-stone-100 dark:bg-stone-700 rounded-lg 
                             hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors
                             text-stone-800 dark:text-stone-100"
                  >
                    <BookOpen className="mr-2 h-5 w-5 text-red-800 dark:text-red-500" />
                    <span>Library</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 