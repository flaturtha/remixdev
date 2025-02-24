// components/RelatedBooks.tsx

import RelatedBookItem from './RelatedBookItem';

interface Book {
  id: number;
  title: string;
  author: string;
  img: string;
}

const RelatedBooks: React.FC = () => {
  const books: Book[] = [
    { id: 1, title: "The Storied Life of A.J. Fikry", author: "Gabrielle Zevin", img: "https://via.placeholder.com/200x300" },
    { id: 2, title: "The Bookshop of Florentine", author: "Deborah Meyler", img: "https://via.placeholder.com/200x300" },
    { id: 3, title: "The Little Paris Bookshop", author: "Nina George", img: "https://via.placeholder.com/200x300" },
  ];

  return (
    <section className="w-full py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Related Books</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore more books that capture the essence of independent bookstores and the power of literature.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
          {books.map(book => (
            <RelatedBookItem key={book.id} title={book.title} author={book.author} img={book.img} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedBooks;
