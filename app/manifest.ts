import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wild Washington",
    short_name: "Wild Washington",
    description:
      "A Washington wildlife field guide for learners, educators, and curious public users.",
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
