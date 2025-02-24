// components/Reviews.tsx

import ReviewItem from './ReviewItem';

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
}

export default function Reviews() {
  const reviews: Review[] = [
    { id: 1, name: "John Doe", rating: 5, text: "The Bookshop of Yesteryear is a beautifully written and deeply moving novel. The characters and their stories will stay with me long after I've finished reading." },
    { id: 2, name: "Sarah Anderson", rating: 4, text: "This book is a love letter to independent bookstores and the communities they foster. I couldn't put it down!" },
    { id: 3, name: "Michael Johnson", rating: 4, text: "The Bookshop of Yesteryear is a delightful read that captures the magic and nostalgia of independent bookstores. Highly recommended!" },
  ];

  // Calculate the average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {Array(fullStars).fill(0).map((_, i) => (
          <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.196 3.684a1 1 0 00.95.69h3.868c.969 0 1.371 1.24.588 1.81l-3.13 2.27a1 1 0 00-.364 1.118l1.196 3.684c.3.921-.755 1.688-1.538 1.118l-3.13-2.27a1 1 0 00-1.176 0l-3.13 2.27c-.783.57-1.838-.197-1.538-1.118l1.196-3.684a1 1 0 00-.364-1.118l-3.13-2.27c-.783-.57-.381-1.81.588-1.81h3.868a1 1 0 00.95-.69l1.196-3.684z" />
          </svg>
        ))}
        {halfStar && (
          <svg key={`half`} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.196 3.684a1 1 0 00.95.69h3.868c.969 0 1.371 1.24.588 1.81l-3.13 2.27a1 1 0 00-.364 1.118l1.196 3.684c.3.921-.755 1.688-1.538 1.118l-3.13-2.27a1 1 0 00-1.176 0l-3.13 2.27c-.783.57-1.838-.197-1.538-1.118l1.196-3.684a1 1 0 00-.364-1.118l-3.13-2.27c-.783-.57-.381-1.81.588-1.81h3.868a1 1 0 00.95-.69l1.196-3.684z" />
          </svg>
        )}
        {Array(emptyStars).fill(0).map((_, i) => (
          <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.196 3.684a1 1 0 00.95.69h3.868c.969 0 1.371 1.24.588 1.81l-3.13 2.27a1 1 0 00-.364 1.118l1.196 3.684c.3.921-.755 1.688-1.538 1.118l-3.13-2.27a1 1 0 00-1.176 0l-3.13 2.27c-.783.57-1.838-.197-1.538-1.118l1.196-3.684a1 1 0 00-.364-1.118l-3.13-2.27c-.783-.57-.381-1.81.588-1.81h3.868a1 1 0 00.95-.69l1.196-3.684z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="w-full md:w-2/3 mx-auto py-12 md:pt-20 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Reviews</h2>
        <div className="mt-2 flex items-center">
          {renderStars(averageRating)}
          <span className="ml-2 text-gray-600">{averageRating.toFixed(1)} out of 5 stars</span>
        </div>
        <div className="mt-4 space-y-4">
          {reviews.map(review => (
            <ReviewItem key={review.id} name={review.name} rating={review.rating} text={review.text} />
          ))}
        </div>
      </div>
    </section>
  );
}
