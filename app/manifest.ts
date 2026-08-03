import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ACE Engineering — Integrated Infrastructure Solutions",
    short_name: "ACE Engineering",
    description:
      "Integrated infrastructure solutions for critical industries — power generation, electrical, packaged, offshore and project development.",
    start_url: "/",
    display: "browser",
    background_color: "#040E1C",
    theme_color: "#05162D",
    icons: [{ src: "/icon.png", sizes: "1024x1024", type: "image/png" }]
  };
}
