import { Link } from "@remix-run/react";

export function TableOfContents({ items }: { items: { id: string; title: string }[] }) {
  return (
    <nav className="space-y-2 border-b pb-4 mb-8">
      <h2 className="text-xl font-bold">Table of Contents</h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`#${item.id}`} className="text-primary hover:underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
