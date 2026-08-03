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
import { siteUrl } from "../lib/seo";

const TITLE = "ACE Engineering — Integrated Infrastructure Solutions";
const DESCRIPTION =
  "Integrated infrastructure solutions for critical industries. UAE-based development, packaging and delivery of power generation, electrical, packaged and offshore infrastructure for data centers, oil & gas, mining and industrial markets.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "ACE Engineering",
  keywords: [
    "infrastructure solutions",
    "power generation",
    "gas generator sets",
    "diesel generator sets",
    "gas turbines",
    "electrical infrastructure",
    "LV switchgear",
    "MV switchgear",
    "packaged infrastructure",
    "e-houses",
    "modular equipment packages",
    "offshore infrastructure",
    "liftboats",
    "jack-up barges",
    "offshore support vessels",
    "project development",
    "data center infrastructure",
    "oil and gas",
    "mining infrastructure",
    "UAE",
    "Ras Al Khaimah",
    "Middle East"
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "ACE Engineering",
    locale: "en_US",
    title: TITLE,
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
    title: TITLE,
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
