import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllGlossaryTerms } from "~/lib/sanity.server";
import type { GlossaryTerm } from "~/types/sanity";
import { Link } from "@remix-run/react";
import { PortableText } from '@portabletext/react';

export async function loader() {
  try {
    const terms = await getAllGlossaryTerms();
    
    // Group terms by first letter
    const groupedTerms: Record<string, GlossaryTerm[]> = {};
    
    terms.forEach((term) => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!groupedTerms[firstLetter]) {
        groupedTerms[firstLetter] = [];
      }
      groupedTerms[firstLetter].push(term);
    });
    
    // Get all unique first letters
    const alphabet = Object.keys(groupedTerms).sort();
    
    return json({ groupedTerms, alphabet });
  } catch (error) {
    console.error("Error loading glossary terms:", error);
    return json({ groupedTerms: {}, alphabet: [] });
  }
}

export default function Glossary() {
  const { groupedTerms, alphabet } = useLoaderData<{ 
    groupedTerms: Record<string, GlossaryTerm[]>, 
    alphabet: string[] 
  }>();
  
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Mystery Fiction Glossary</h1>
            <p className="text-xl text-gray-700">
              A comprehensive guide to terms and concepts in vintage mystery fiction
            </p>
          </div>
        </div>
      </section>
      
      {/* Alphabet Navigation */}
      <section className="py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {alphabet.map((letter) => (
              <a 
                key={letter}
                href={`#${letter}`}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Glossary Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {alphabet.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-600 mb-4">No glossary terms found.</p>
                <p className="text-gray-500">
                  Please check your Sanity connection or add some terms to get started.
                </p>
              </div>
            ) : (
              alphabet.map((letter) => (
                <div key={letter} id={letter} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-200">{letter}</h2>
                  
                  <div className="space-y-8">
                    {groupedTerms[letter].map((term) => (
                      <div key={term._id} className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-xl font-bold mb-3">{term.term}</h3>
                        <div className="prose prose-lg">
                          <PortableText value={term.definition} />
                        </div>
                        
                        {term.relatedTerms && term.relatedTerms.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-bold text-gray-500 uppercase">Related Terms</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {term.relatedTerms.map((relatedTerm, index) => (
                                <span 
                                  key={index}
                                  className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm"
                                >
                                  {relatedTerm}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 