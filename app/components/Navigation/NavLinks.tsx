import { Link } from "@remix-run/react";
import { mainNavItems } from "~/config/navigation";

export default function NavLinks() {
  return (
    <>
      {mainNavItems.map((item) => (
        item.isExternal ? (
          <a 
            key={item.path}
            href={item.externalUrl} 
            className="text-gray-800 hover:text-gray-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.title} {item.title === "Murderwiki" && "▼"}
          </a>
        ) : (
          <Link 
            key={item.path}
            to={item.path} 
            className="text-gray-800 hover:text-gray-600 transition-colors"
          >
            {item.title}
          </Link>
        )
      ))}
    </>
  );
} 