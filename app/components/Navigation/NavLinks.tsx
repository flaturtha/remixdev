import { Link } from "@remix-run/react";
import { mainNavItems } from "~/config/navigation";

export default function NavLinks() {
  return (
    <>
      {mainNavItems.map((item) => (
        <Link 
          key={item.path}
          to={item.path} 
          className="text-gray-800 hover:text-gray-600 transition-colors"
        >
          {item.title}
        </Link>
      ))}
    </>
  );
} 