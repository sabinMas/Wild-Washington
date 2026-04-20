import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wild Washington",
    short_name: "Wild Washington",
    description:
      "A Washington wildlife education and conservation interpretation platform for public visitors, educators, and partner organizations.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2eadf",
    theme_color: "#17211e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
