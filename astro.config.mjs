import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import react from "@astrojs/react";

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
  integrations: [tailwind(), react(), mdx(), sitemap({
    customPages: ['https://vincentdorian.me/', 'https://vincentdorian.me/blog', 'https://www.vincentdorian.me/', 'https://www.vincentdorian.me/blog']
  }), robotsTxt(), solidJs()],
  site: 'https://vincentdorian.me',
  output: 'server',
  adapter: vercel()
});