/* empty css                              */import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderHead, e as renderSlot, f as renderComponent, m as maybeRenderHead, g as createVNode, F as Fragment } from '../astro.462c8527.mjs';
import 'html-escaper';

const $$Astro$5 = createAstro("https://vincentdorian.me");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Layout;
  const { pathname } = Astro2.url;
  const links = [
    {
      name: "Home",
      href: "/"
    },
    {
      name: "About me",
      href: "/about-me"
    },
    {
      name: "Blog",
      href: "/blog"
    },
    {
      name: "Projects",
      href: "/projects"
    }
  ];
  return renderTemplate`<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <meta name="description" content="I am a full-stack developer creating fast and easy-to-use web apps.">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <title>Vincent Dorian</title>
  ${renderHead($$result)}</head>
  <body>
    <header class="max-w-7xl w-full mx-auto px-5 sm:px-8 2xl:px-0 flex flex-col items-start justify-start pt-14">
    
    <div class="flex flex-row items-center gap-x-3">

    <div class="w-14 h-14 bg-black rounded-full shrink-0">

    </div>
      <a href="https://www.linkedin.com/in/vincentdorian_/">
        <svg class="text-gray-800 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
      </a>
      <a class="text-gray-800 h-6 w-6" href="https://github.com/vincentdorian">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 496 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
      </a>
      <a class="text-gray-800 h-6 w-6" href="https://twitter.com/vincentdorian_">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
      </a>
    </div>
      <nav class="flex flex-row items-center gap-x-5 py-5 font-semibold tracking-wide text-gray-900">
        ${links.map(
    (link) => renderTemplate`<a${addAttribute(
      pathname === link.href ? "relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-1 after:bg-black after:w-full" : "relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-1 after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left",
      "class"
    )}${addAttribute(link.href, "href")}>
              ${link.name}
            </a>`
  )}
      </nav>
    </header>
    
    <main class="max-w-7xl w-full mx-auto px-5 sm:px-8 2xl:px-0 pt-4 sm:pt-8">
      ${renderSlot($$result, $$slots["default"])}
    </main>
  </body></html>`;
}, "/Users/vincentschilling/Projects/portfolio/src/layouts/Layout.astro");

const $$Astro$4 = createAstro("https://vincentdorian.me");
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index$2;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="max-w-3xl">
		<h1 class="text-3xl sm:text-5xl font-bold">Hi there 👋 </h1>

		<p class="text-base sm:text-lg mt-5">
			My name is Vincent. I am a <strong>full-stack developer</strong> building <strong>fast, reliable and easy-to-use web applications.</strong>

			I am always enthusiasthic about new technologies, trying to find the optimal way to create the <strong>best user experience</strong> possible and chasing after the <strong>perfect lighthouse scores.</strong>
		</p>

		<p class="text-base sm:text-lg mt-5">
			I have a well-founded proficiencies with <strong>Javascript</strong> and <strong>PHP</strong> and experience with modern rendering frameworks like <strong>Svelte, React, Vue and Astro.</strong> 
			Furthermore, I have made collected advanced knowledge about many technologies and meta-frameworks like <strong>NextJS, SvelteKit, NuxtJS, Typescript, Laravel and Tailwindcss</strong> just to name a few.
		</p>

		<p class="text-base sm:text-lg mt-5">
			In case you would like to get to know me a little better, feel free to stay a while and read more <strong><a href="/about-me" class="underline">about me.</a></strong>
			If you are curious about my work you can browse through some of my previous <strong><a href="/projects" class="underline">projects.</a></strong>
		</p>
	</div>` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/index.astro");

const $$file$4 = "/Users/vincentschilling/Projects/portfolio/src/pages/index.astro";
const $$url$4 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$2,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("https://vincentdorian.me");
const $$Maintenance = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Maintenance;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="max-w-3xl">
            <h1 class="text-3xl sm:text-5xl font-bold">
                It's not your fault... 🥲
            </h1>
            <p class="text-base sm:text-lg mt-5">
                It's mine. I am sorry, this page is not ready yet. <br>
                Can we still be friends?
            </p>
        </div>` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/maintenance.astro");

const $$file$3 = "/Users/vincentschilling/Projects/portfolio/src/pages/maintenance.astro";
const $$url$3 = "/maintenance";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Maintenance,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro("https://vincentdorian.me");
const $$AboutMe = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AboutMe;
  return Astro2.redirect("/maintenance");
}, "/Users/vincentschilling/Projects/portfolio/src/pages/about-me.astro");

const $$file$2 = "/Users/vincentschilling/Projects/portfolio/src/pages/about-me.astro";
const $$url$2 = "/about-me";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AboutMe,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://vincentdorian.me");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  return Astro2.redirect("/maintenance");
}, "/Users/vincentschilling/Projects/portfolio/src/pages/projects/index.astro");

const $$file$1 = "/Users/vincentschilling/Projects/portfolio/src/pages/projects/index.astro";
const $$url$1 = "/projects";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://vincentdorian.me");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = await Astro2.glob(/* #__PURE__ */ Object.assign({"./nav-link-animations-using-tailwindcss.md": () => Promise.resolve().then(() => _page5)}), () => "./*.md");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<ul>
        ${posts.map((p) => renderTemplate`<li>
                    ${p.frontmatter.title}
                </li>`)}
    </ul>` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/blog/index.astro");

const $$file = "/Users/vincentschilling/Projects/portfolio/src/pages/blog/index.astro";
const $$url = "/blog";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const html = "<h2 id=\"introduction\">Introduction</h2>\n<p>I love working with tailwindcss. It really can do everything that I want to build without adding too much complexity on top of your code and I do not have to write any CSS in files. Just a few weeks I wanted to implement some cool animations like a sliding border for a nav link.</p>\n<p>Browsing through CSS tricks and Stackoverflow I found some posts that showed how the pseudo-element <em>after</em> can be used to create an element behind the actual nav link whose background then can be used to simulate a border for the parent element as so:</p>";

				const frontmatter = {"title":"Nav link animations using tailwindcss","description":"Let me show you how you can easily achieve some cool animations using pseudo-elements with tailwindcss!","draft":true};
				const file = "/Users/vincentschilling/Projects/portfolio/src/pages/blog/nav-link-animations-using-tailwindcss.md";
				const url = "/blog/nav-link-animations-using-tailwindcss";
				function rawContent() {
					return "\n## Introduction\n\nI love working with tailwindcss. It really can do everything that I want to build without adding too much complexity on top of your code and I do not have to write any CSS in files. Just a few weeks I wanted to implement some cool animations like a sliding border for a nav link.\n\nBrowsing through CSS tricks and Stackoverflow I found some posts that showed how the pseudo-element _after_ can be used to create an element behind the actual nav link whose background then can be used to simulate a border for the parent element as so:\n\n\n\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"introduction","text":"Introduction"}];
				}
				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return contentFragment;
				}
				Content[Symbol.for('astro.needsHeadRendering')] = true;

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content,
  compiledContent,
  default: Content,
  file,
  frontmatter,
  getHeadings,
  rawContent,
  url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page1 as a, _page2 as b, _page3 as c, _page4 as d, _page5 as e };
