// Navigation configuration for the entire site
// Edit this file to update both desktop and mobile navigation

export type NavItem = {
  title: string;
  path: string;
  isButton?: boolean;
  className?: string;
  isExternal?: boolean;  // Uncommented for external links
  externalUrl?: string;  // Uncommented for external links
};

// Main navigation items
export const mainNavItems: NavItem[] = [
  {
    title: "Vintage Mystery Library",
    path: "/library",
  },
  {
    title: "Murderwiki",
    path: "/murderwiki",
    isExternal: true,
    externalUrl: "https://murderwiki.talesofmurder.com"
  },
  {
    title: "Our Mission",
    path: "/about-our-mission",
  },
  {
    title: "Shop & Support",
    path: "/shop",
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