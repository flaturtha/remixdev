// Navigation configuration for the entire site
// Edit this file to update both desktop and mobile navigation

export type NavItem = {
  title: string;
  path: string;
  isButton?: boolean;
  className?: string;
  // isExternal?: boolean;  // Uncomment when linking to external sites
  // externalUrl?: string;  // Uncomment when linking to external sites
};

// Main navigation items
export const mainNavItems: NavItem[] = [
  {
    title: "Mission",
    path: "/about",
  },
  {
    title: "Store",
    path: "/store",
  },
  {
    title: "Murderwiki",
    path: "/murderwiki",
    // PRODUCTION TODO: When MurderWiki is deployed, uncomment and update these lines:
    // isExternal: true,
    // externalUrl: "https://murderwiki.talesofmurder.com" // Update with production URL
  },
];

// Call to action button
export const ctaButton: NavItem = {
  title: "Read Free",
  path: "/read-free",
  isButton: true,
  className: "bg-[#8b0000] hover:bg-[#6d0000] text-white px-6 py-2 rounded-md transition-colors"
};

// All navigation items including the CTA
export const allNavItems = [...mainNavItems, ctaButton]; 