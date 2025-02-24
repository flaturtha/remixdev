import React from 'react';
import { BookOpen } from 'lucide-react';

interface BookProps {
  title: string;
}

export default function BookPage() {
  const book: BookProps = {
    title: "Sample Book Title"  // Temporary placeholder
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What Readers Are Saying</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((testimonial) => (
            <div key={testimonial} className="p-4 border rounded">
              <p className="italic mb-2">&ldquo;An absolute page-turner! I couldn&apos;t put it down.&rdquo;</p>
              <p className="text-sm text-gray-600">- Reader {testimonial}</p>
            </div>
          ))}
        </div>
      </div>
      <div id="read-free" className="mt-8">
        <div className="p-6 border rounded">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <BookOpen className="mr-2" />
            Read &ldquo;{book.title}&rdquo; Online for Free
          </h2>
          <p className="mb-4">
            Enjoy the complete web version of &ldquo;{book.title}&rdquo; right here on our website. No download required!
          </p>
          {/* ... rest of the JSX ... */}
        </div>
      </div>
    </div>
  );
}
