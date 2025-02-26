import { useState } from "react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import FacebookPixel from "~/components/FacebookPixel";
import KlaviyoScript from '~/components/KlaviyoScript';
import GoogleTagManager from '~/components/GoogleTagManager';
import DevTools from "~/components/DevTools";
import PageTransition from "~/components/PageTransition";
import ScrollToTop from "~/components/ScrollToTop";
import ReadingProgress from "~/components/ReadingProgress";
import NewsBanner from "~/components/NewsBanner";
import CookieConsent from "~/components/CookieConsent";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "/app/tailwind.css" },
  { rel: "stylesheet", href: "/app/styles/globals.css" },
  { rel: "stylesheet", href: "/styles/simple-dark.css" },
  { rel: "stylesheet", href: "/styles/dark-mode.css" },
  { rel: "stylesheet", href: "/styles/direct-dark.css" },
  { rel: "stylesheet", href: "/styles/final-dark.css" },
  { rel: "stylesheet", href: "https://fonts.cdnfonts.com/css/breamcatcher" },
  { rel: "icon", href: "/images/logo_icon.svg", type: "image/svg+xml" },
];

export const meta: MetaFunction = () => {
  return [];
};

export default function App() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <Meta />
        <Links />
        <FacebookPixel />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                // Simple dark mode initialization
                var darkMode = localStorage.getItem('darkMode');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                if (darkMode === 'dark' || (prefersDark && !darkMode)) {
                  document.documentElement.classList.add('dark');
                  console.log('Dark mode enabled');
                } else {
                  document.documentElement.classList.remove('dark');
                  console.log('Light mode enabled');
                }
              } catch (e) {
                console.error('Error in dark mode script:', e);
              }
            })();
          `
        }} />
      </head>
      <body>
        <ReadingProgress />
        {/* PRODUCTION TODO: Uncomment the GoogleTagManager component before deploying to production */}
        {/* <GoogleTagManager gtmId="YOUR_GTM_ID" /> */}
        <Header />
        <NewsBanner />
        <PageTransition>
          <Outlet />
        </PageTransition>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <KlaviyoScript />
        <CookieConsent />
        <ScrollToTop />
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </body>
    </html>
  );
}
