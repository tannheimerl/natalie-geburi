import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Für Natalie · 8 Dates",
  description: "Acht Eintrittskarten in unsere gemeinsame Zeit.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,700,0,0&display=block"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-navy bg-[linear-gradient(180deg,#1D2B64_0%,#F8CDDA_100%)] bg-no-repeat font-sans text-navy antialiased">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
