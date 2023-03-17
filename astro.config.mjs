import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import vercel from "@astrojs/vercel/edge";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
    robotsTxt(),
    solidJs(),
    sitemap({
      customPages: ["https://vincentdorian.me/"],
    }),
  ],
  site: "https://vincentdorian.me",
  output: "server",
  adapter: vercel(),
});
