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
  title: "ACE Engineering — Integrated Infrastructure Solutions",
  description:
    "Integrated infrastructure solutions for critical industries. Development, packaging and delivery of energy, industrial and offshore infrastructure for data centers, oil & gas, mining and industrial markets.",
  openGraph: {
    type: "website",
    url: "/",
    title: "ACE Engineering — Integrated Infrastructure Solutions",
    description:
      "Integrated infrastructure solutions for critical industries — power generation, electrical, packaged, offshore and project development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "ACE Engineering logo on a dark navy background"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE Engineering — Integrated Infrastructure Solutions",
    description:
      "Integrated infrastructure solutions for critical industries — power generation, electrical, packaged, offshore and project development.",
    images: ["/og-image.png"]
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
