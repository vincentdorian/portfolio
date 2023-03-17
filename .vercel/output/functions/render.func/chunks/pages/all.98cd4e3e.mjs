/* empty css                           */import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderHead, e as renderSlot, _ as __astro_tag_component__, f as createVNode, F as Fragment, g as renderComponent, m as maybeRenderHead } from '../astro.5f2e38c5.mjs';
import 'html-escaper';
/* empty css                           */
const $$Astro$6 = createAstro("https://vincentdorian.me");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Layout;
  const { pathname } = Astro2.url;
  const { title } = Astro2.props;
  const links = [
    {
      name: "Home",
      href: "/"
    },
    {
      name: "About",
      href: "/about"
    },
    {
      name: "Blog",
      href: "/blog"
    },
    {
      name: "Projects",
      href: "/projects"
    },
    {
      name: "Contact",
      href: "/contact"
    }
  ];
  return renderTemplate`<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/png" href="/favicon.png">
    <meta name="description" content="I am a full-stack developer build fast, reliable and intuitive web apps.">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <title>Vincent Dorian ${title !== "Vincent Dorian" ? "| " + title : ""}</title>
  ${renderHead($$result)}</head>
  <body class="max-w-5xl mx-auto mt-5 px-5 sm:mt-20 flex flex-col sm:flex-row gap-5">
    <aside class="w-full sm:w-56 flex flex-row sm:flex-col gap-5 items-center sm:items-start">
      <img src="/photo.jpg" class="w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-red-100 content-center object-scale">
      <span class="font-light text-gray-700">
          I love to create and explore. <br>Trying to shape tomorrow.
      </span>
    </aside>
    <div>
      <header>
        <nav class="flex flex-row items-center gap-x-5 text-gray-900">
          ${links.map(
    (link) => renderTemplate`<a${addAttribute(
      `relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-px after:bg-black after:w-full tracking-wide font-light ${pathname === link.href ? "" : "after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"}`,
      "class"
    )}${addAttribute(link.href, "href")}>
                ${link.name}
              </a>`
  )}
        </nav>
    </header>
    <main class="text-gray-800 mt-6">
      <h1 class="text-3xl sm:text-4xl font-light text-gray-900">${title} </h1>
      <section class="mt-5 prose prose-p:font-light prose-strong:font-normal">
        ${renderSlot($$result, $$slots["default"])}
      </section>
    </main>
    </div>
   
  </body></html>`;
}, "/Users/vincentschilling/Projects/portfolio/src/layouts/Layout.astro");

const frontmatter$1 = {};
function getHeadings$1() {
  return [];
}
function _createMdxContent$1(props) {
  const _components = Object.assign({
    p: "p",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Hi, I\u2019m Vincent. I\u2019m a web developer that loves to create and explore.\nI am always enthusiasthic about new technologies, trying to find the optimal way to create the best user experience possible and chasing after the perfect lighthouse scores."
    }), "\n", createVNode(_components.p, {
      children: ["I have a well-founded proficiencies with ", createVNode(_components.strong, {
        children: "Javascript and PHP"
      }), " and experience with modern rendering frameworks like ", createVNode(_components.strong, {
        children: "Svelte, React, Vue and Astro"
      }), ", as well as technologies and meta-frameworks like ", createVNode(_components.strong, {
        children: "NextJS, SvelteKit, NuxtJS, Typescript, Laravel and Tailwindcss."
      })]
    })]
  });
}
function MDXContent$1(props = {}) {
  const {
    wrapper: MDXLayout
  } = props.components || {};
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent$1, {
      ...props
    })
  }) : _createMdxContent$1(props);
}

__astro_tag_component__(getHeadings$1, "astro:jsx");
__astro_tag_component__(MDXContent$1, "astro:jsx");
const url$1 = "/home";
const file$1 = "/Users/vincentschilling/Projects/portfolio/src/pages/home.mdx";
const Content$1 = (props = {}) => MDXContent$1({
											...props,
											components: { Fragment, ...props.components },
										});
Content$1[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$1.layout);

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$1,
  default: Content$1,
  file: file$1,
  frontmatter: frontmatter$1,
  getHeadings: getHeadings$1,
  url: url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro("https://vincentdorian.me");
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index$3;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Vincent Dorian" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Content", Content$1, {})}` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/index.astro");

const $$file$5 = "/Users/vincentschilling/Projects/portfolio/src/pages/index.astro";
const $$url$5 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$3,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro("https://vincentdorian.me");
const $$Maintenance = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Maintenance;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="max-w-3xl">
            <h1 class="text-3xl sm:text-4xl font-bold">
                It's not your fault... 🥲
            </h1>
            <p class="text-base sm:text-lg mt-5">
                It's mine. I am sorry, this page is not ready yet. <br>
                Can we still be friends?
            </p>
        </div>` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/maintenance.astro");

const $$file$4 = "/Users/vincentschilling/Projects/portfolio/src/pages/maintenance.astro";
const $$url$4 = "/maintenance";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Maintenance,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("https://vincentdorian.me");
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$2;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Projects" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<p class="prose">
      Soon you will be able to view some of my projects here. Until then you can have a look at my GitHub.
    </p>` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/projects/index.astro");

const $$file$3 = "/Users/vincentschilling/Projects/portfolio/src/pages/projects/index.astro";
const $$url$3 = "/projects";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$2,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro("https://vincentdorian.me");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact" }, { "default": ($$result2) => renderTemplate`
    If you want to reach out to me, you can always send me a DM on any of my social media or just use the following contact form.
` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/contact/index.astro");

const $$file$2 = "/Users/vincentschilling/Projects/portfolio/src/pages/contact/index.astro";
const $$url$2 = "/contact";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const frontmatter = {};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    strong: "strong"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "I started my career as a web developer back in 2021 and my job has become my hobby and passion.\nThrough my design and engineering background, I am a good generalist, always able to look at problems from different angles."
    }), "\n", createVNode(_components.p, {
      children: ["Apart from web development I am interested in the topics ", createVNode(_components.strong, {
        children: "virtual worlds, AI, blockchain, web3"
      }), " and many more."]
    }), "\n", createVNode(_components.p, {
      children: "When I am not coding, you can probably catch me riding my gravel bike, reading a book or eating."
    })]
  });
}
function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = props.components || {};
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "/about";
const file = "/Users/vincentschilling/Projects/portfolio/src/pages/about.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components },
										});
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content,
  default: Content,
  file,
  frontmatter,
  getHeadings,
  url
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://vincentdorian.me");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Content", Content, {})}` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/about.astro");

const $$file$1 = "/Users/vincentschilling/Projects/portfolio/src/pages/about.astro";
const $$url$1 = "/about";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://vincentdorian.me");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<p>
        I've recently begun to write some blog posts and am planning to become more active in the dev community. You can view my posts to Dev.to.
    </p>` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/blog/index.astro");

const $$file = "/Users/vincentschilling/Projects/portfolio/src/pages/blog/index.astro";
const $$url = "/blog";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page1 as a, _page2 as b, _page3 as c, _page4 as d, _page5 as e, _page6 as f, _page7 as g };
