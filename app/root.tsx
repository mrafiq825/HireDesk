import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { AuthProvider } from "@contexts/AuthContext";
import { ToastProvider } from "@contexts/ToastContext";
import ToastContainer from "@ui/ToastContainer";
import AssistantDock from "./components/assistant/AssistantDock";
import "./app.css";

const SITE_URL = "https://hiredesk.vercel.app";
const SITE_NAME = "HireDesk";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const links: Route.LinksFunction = () => [
  // Favicon & Icon links
  { rel: "icon", href: "/favicon.ico", sizes: "any" },
  { rel: "icon", type: "image/svg+xml", href: "/logo/logo-icon.svg" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  // Preconnect to Google Fonts servers for faster DNS + TLS
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  // Preload the font stylesheet so it's fetched early without blocking render
  {
    rel: "preload",
    as: "style",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  },
  // Load fonts asynchronously (display=swap prevents FOIT)
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap",
    media: "print",
    onLoad: () => {
      const link = document.querySelector<HTMLLinkElement>(
        'link[href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap"]',
      );

      if (link) {
        link.media = "all";
      }
    },
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* === Global SEO meta === */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="HireDesk" />
        <meta name="generator" content="React Router v7" />
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#0f172a" />

        {/* === Default Open Graph (overridden per-route via <Meta />) === */}
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="HireDesk — AI-Powered Hiring Platform"
        />

        {/* === Default Twitter Card (overridden per-route) === */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Rafiqdeveloper" />
        <meta name="twitter:creator" content="@Rafiqdeveloper" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

        {/* Per-route meta (title, description, canonical, etc.) */}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Outlet />
        <ToastContainer />
        <AssistantDock />
      </AuthProvider>
    </ToastProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
