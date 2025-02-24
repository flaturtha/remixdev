// components/RelatedBookItem.tsx

interface RelatedBookItemProps {
  title: string;
  author: string;
  img: string;
}

export default function RelatedBookItem({ title, author, img }: RelatedBookItemProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <img
          src={img}
          width="200"
          height="300"
          alt={title}
          className="aspect-[2/3] overflow-hidden rounded-xl object-cover"
        />
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground">By {author}</p>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
