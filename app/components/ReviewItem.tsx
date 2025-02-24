// components/ReviewItem.tsx

interface ReviewItemProps {
  name: string;
  rating: number;
  text: string;
}

export default function ReviewItem({ name, rating, text }: ReviewItemProps) {
  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold text-gray-800">{name}</span>
        <span className="text-sm text-gray-500">{rating} out of 5 stars</span>
      </div>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}
