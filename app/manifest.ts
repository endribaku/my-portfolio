import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Endri Baku",
    short_name: "Endri Baku",
    description:
      "Software engineer based in Tirana, Albania. Building things across the stack — interfaces, systems, and the parts in between.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5f4",
    theme_color: "#f7f5f4",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
