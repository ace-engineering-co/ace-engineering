import type { Metadata } from "next";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://ace-engineering.vercel.app"),
  title: "ACE Engineering — Power Solutions",
  description:
    "Fast-track power generation for data centres, utilities and industry. Generators, turbines and turnkey power plants — deployed where the grid can't reach.",
  openGraph: {
    title: "ACE Engineering — Power Solutions",
    description:
      "Closing the gap between demand and generation. Fast-track power for data centres, utilities and industry.",
    images: ["/hero-city.webp"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
