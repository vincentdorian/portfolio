/* empty css                              */import { c as createAstro, a as createComponent$1, r as renderTemplate, b as addAttribute, d as renderHead, e as renderSlot, f as renderComponent, m as maybeRenderHead, _ as __astro_tag_component__, F as Fragment, g as createVNode } from '../astro.846112cf.mjs';
import 'html-escaper';

function createSignal(value, options) {
  return [() => value, v => {
    return value = typeof v === "function" ? v(value) : v;
  }];
}
const sharedConfig = {};
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return sharedConfig.context ? {
    ...sharedConfig.context,
    id: `${sharedConfig.context.id}${sharedConfig.context.count++}-`,
    count: 0
  } : undefined;
}
function createComponent(Comp, props) {
  if (sharedConfig.context && !sharedConfig.context.noHydrate) {
    const c = sharedConfig.context;
    setHydrateContext(nextHydrateContext());
    const r = Comp(props || {});
    setHydrateContext(c);
    return r;
  }
  return Comp(props || {});
}
function Show(props) {
  let c;
  return props.when ? typeof (c = props.children) === "function" ? c(props.when) : c : props.fallback || "";
}

const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
/*#__PURE__*/new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...booleans]);

const {
  hasOwnProperty
} = Object.prototype;
const REF_START_CHARS = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_";
const REF_START_CHARS_LEN = REF_START_CHARS.length;
const REF_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_";
const REF_CHARS_LEN = REF_CHARS.length;
const STACK = [];
const BUFFER = [""];
let ASSIGNMENTS = new Map();
let INDEX_OR_REF = new WeakMap();
let REF_COUNT = 0;
BUFFER.pop();
function stringify(root) {
  if (writeProp(root, "")) {
    let result = BUFFER[0];
    for (let i = 1, len = BUFFER.length; i < len; i++) {
      result += BUFFER[i];
    }
    if (REF_COUNT) {
      if (ASSIGNMENTS.size) {
        let ref = INDEX_OR_REF.get(root);
        if (typeof ref === "number") {
          ref = toRefParam(REF_COUNT++);
          result = ref + "=" + result;
        }
        for (const [assignmentRef, assignments] of ASSIGNMENTS) {
          result += ";" + assignments + assignmentRef;
        }
        result += ";return " + ref;
        ASSIGNMENTS = new Map();
      } else {
        result = "return " + result;
      }
      result = "(function(" + refParamsString() + "){" + result + "}())";
    } else if (root && root.constructor === Object) {
      result = "(" + result + ")";
    }
    BUFFER.length = 0;
    INDEX_OR_REF = new WeakMap();
    return result;
  }
  return "void 0";
}
function writeProp(cur, accessor) {
  switch (typeof cur) {
    case "string":
      BUFFER.push(quote(cur, 0));
      break;
    case "number":
      BUFFER.push(cur + "");
      break;
    case "boolean":
      BUFFER.push(cur ? "!0" : "!1");
      break;
    case "object":
      if (cur === null) {
        BUFFER.push("null");
      } else {
        const ref = getRef(cur, accessor);
        switch (ref) {
          case true:
            return false;
          case false:
            switch (cur.constructor) {
              case Object:
                writeObject(cur);
                break;
              case Array:
                writeArray(cur);
                break;
              case Date:
                BUFFER.push('new Date("' + cur.toISOString() + '")');
                break;
              case RegExp:
                BUFFER.push(cur + "");
                break;
              case Map:
                BUFFER.push("new Map(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case Set:
                BUFFER.push("new Set(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case undefined:
                BUFFER.push("Object.assign(Object.create(null),");
                writeObject(cur);
                BUFFER.push(")");
                break;
              default:
                return false;
            }
            break;
          default:
            BUFFER.push(ref);
            break;
        }
      }
      break;
    default:
      return false;
  }
  return true;
}
function writeObject(obj) {
  let sep = "{";
  STACK.push(obj);
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      const escapedKey = toObjectKey(key);
      BUFFER.push(sep + escapedKey + ":");
      if (writeProp(val, escapedKey)) {
        sep = ",";
      } else {
        BUFFER.pop();
      }
    }
  }
  if (sep === "{") {
    BUFFER.push("{}");
  } else {
    BUFFER.push("}");
  }
  STACK.pop();
}
function writeArray(arr) {
  BUFFER.push("[");
  STACK.push(arr);
  writeProp(arr[0], 0);
  for (let i = 1, len = arr.length; i < len; i++) {
    BUFFER.push(",");
    writeProp(arr[i], i);
  }
  STACK.pop();
  BUFFER.push("]");
}
function getRef(cur, accessor) {
  let ref = INDEX_OR_REF.get(cur);
  if (ref === undefined) {
    INDEX_OR_REF.set(cur, BUFFER.length);
    return false;
  }
  if (typeof ref === "number") {
    ref = insertAndGetRef(cur, ref);
  }
  if (STACK.includes(cur)) {
    const parent = STACK[STACK.length - 1];
    let parentRef = INDEX_OR_REF.get(parent);
    if (typeof parentRef === "number") {
      parentRef = insertAndGetRef(parent, parentRef);
    }
    ASSIGNMENTS.set(ref, (ASSIGNMENTS.get(ref) || "") + toAssignment(parentRef, accessor) + "=");
    return true;
  }
  return ref;
}
function toObjectKey(name) {
  const invalidIdentifierPos = getInvalidIdentifierPos(name);
  return invalidIdentifierPos === -1 ? name : quote(name, invalidIdentifierPos);
}
function toAssignment(parent, key) {
  return parent + (typeof key === "number" || key[0] === '"' ? "[" + key + "]" : "." + key);
}
function getInvalidIdentifierPos(name) {
  let char = name[0];
  if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char === "$" || char === "_")) {
    return 0;
  }
  for (let i = 1, len = name.length; i < len; i++) {
    char = name[i];
    if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char >= "0" && char <= "9" || char === "$" || char === "_")) {
      return i;
    }
  }
  return -1;
}
function quote(str, startPos) {
  let result = "";
  let lastPos = 0;
  for (let i = startPos, len = str.length; i < len; i++) {
    let replacement;
    switch (str[i]) {
      case '"':
        replacement = '\\"';
        break;
      case "\\":
        replacement = "\\\\";
        break;
      case "<":
        replacement = "\\x3C";
        break;
      case "\n":
        replacement = "\\n";
        break;
      case "\r":
        replacement = "\\r";
        break;
      case "\u2028":
        replacement = "\\u2028";
        break;
      case "\u2029":
        replacement = "\\u2029";
        break;
      default:
        continue;
    }
    result += str.slice(lastPos, i) + replacement;
    lastPos = i + 1;
  }
  if (lastPos === startPos) {
    result = str;
  } else {
    result += str.slice(lastPos);
  }
  return '"' + result + '"';
}
function insertAndGetRef(obj, pos) {
  const ref = toRefParam(REF_COUNT++);
  INDEX_OR_REF.set(obj, ref);
  if (pos) {
    BUFFER[pos - 1] += ref + "=";
  } else {
    BUFFER[pos] = ref + "=" + BUFFER[pos];
  }
  return ref;
}
function refParamsString() {
  let result = REF_START_CHARS[0];
  for (let i = 1; i < REF_COUNT; i++) {
    result += "," + toRefParam(i);
  }
  REF_COUNT = 0;
  return result;
}
function toRefParam(index) {
  let mod = index % REF_START_CHARS_LEN;
  let ref = REF_START_CHARS[mod];
  index = (index - mod) / REF_START_CHARS_LEN;
  while (index > 0) {
    mod = index % REF_CHARS_LEN;
    ref += REF_CHARS[mod];
    index = (index - mod) / REF_CHARS_LEN;
  }
  return ref;
}
function renderToString(code, options = {}) {
  let scripts = "";
  sharedConfig.context = {
    id: options.renderId || "",
    count: 0,
    suspense: {},
    lazy: {},
    assets: [],
    nonce: options.nonce,
    writeResource(id, p, error) {
      if (sharedConfig.context.noHydrate) return;
      if (error) return scripts += `_$HY.set("${id}", ${serializeError(p)});`;
      scripts += `_$HY.set("${id}", ${stringify(p)});`;
    }
  };
  let html = resolveSSRNode(escape(code()));
  sharedConfig.context.noHydrate = true;
  html = injectAssets(sharedConfig.context.assets, html);
  if (scripts.length) html = injectScripts(html, scripts, options.nonce);
  return html;
}
function ssr(t, ...nodes) {
  if (nodes.length) {
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
      result += t[i];
      const node = nodes[i];
      if (node !== undefined) result += resolveSSRNode(node);
    }
    t = result + t[nodes.length];
  }
  return {
    t
  };
}
function ssrHydrationKey() {
  const hk = getHydrationKey();
  return hk ? ` data-hk="${hk}"` : "";
}
function escape(s, attr) {
  const t = typeof s;
  if (t !== "string") {
    if (!attr && t === "function") return escape(s(), attr);
    if (!attr && Array.isArray(s)) {
      let r = "";
      for (let i = 0; i < s.length; i++) r += resolveSSRNode(escape(s[i], attr));
      return {
        t: r
      };
    }
    if (attr && t === "boolean") return String(s);
    return s;
  }
  const delim = attr ? '"' : "<";
  const escDelim = attr ? "&quot;" : "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");
  if (iDelim < 0 && iAmp < 0) return s;
  let left = 0,
    out = "";
  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }
  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else while (iAmp >= 0) {
    if (left < iAmp) out += s.substring(left, iAmp);
    out += "&amp;";
    left = iAmp + 1;
    iAmp = s.indexOf("&", left);
  }
  return left < s.length ? out + s.substring(left) : out;
}
function resolveSSRNode(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode(node[i]);
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode(node());
  return String(node);
}
function getHydrationKey() {
  const hydrate = sharedConfig.context;
  return hydrate && !hydrate.noHydrate && `${hydrate.id}${hydrate.count++}`;
}
function injectAssets(assets, html) {
  if (!assets || !assets.length) return html;
  let out = "";
  for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
  return html.replace(`</head>`, out + `</head>`);
}
function injectScripts(html, scripts, nonce) {
  const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}</script>`;
  const index = html.indexOf("<!--xs-->");
  if (index > -1) {
    return html.slice(0, index) + tag + html.slice(index);
  }
  return html + tag;
}
function serializeError(error) {
  if (error.message) {
    const fields = {};
    const keys = Object.getOwnPropertyNames(error);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = error[key];
      if (!value || key !== "message" && typeof value !== "function") {
        fields[key] = value;
      }
    }
    return `Object.assign(new Error(${stringify(error.message)}), ${stringify(fields)})`;
  }
  return stringify(error);
}

const $$Astro$5 = createAstro("https://vincentdorian.me");
const $$Layout = createComponent$1(async ($$result, $$props, $$slots) => {
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
    <link rel="icon" type="image/png" href="/favicon.png">
    <meta name="description" content="I am a full-stack developer build fast, reliable and intuitive web apps.">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <title>Vincent Dorian</title>
  ${renderHead($$result)}</head>
  <body>
    <header class="max-w-7xl w-full mx-auto px-5 sm:px-8 2xl:px-0 flex flex-col items-start justify-start pt-8 sm:pt-12">
    <a href="/" class="text-2xl font-bold text-gray-800">
      Vincent Dorian
    </a>
    
      <nav class="flex flex-row items-center gap-x-5 py-5 font-semibold tracking-wide text-gray-900">
        ${links.map(
    (link) => renderTemplate`<a${addAttribute(
      pathname === link.href ? "relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-1 after:bg-black after:w-full" : "relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-1 after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center",
      "class"
    )}${addAttribute(link.href, "href")}>
              ${link.name}
            </a>`
  )}
      </nav>
    </header>
    
    <main class="max-w-7xl w-full mx-auto px-5 sm:px-8 2xl:px-0 pt-4 sm:pt-6 pb-5 text-gray-800">
      
      ${renderSlot($$result, $$slots["default"])}
    </main>
  </body></html>`;
}, "/Users/vincentschilling/Projects/portfolio/src/layouts/Layout.astro");

const $$Astro$4 = createAstro("https://vincentdorian.me");
const $$Index$2 = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index$2;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="max-w-3xl">
		<h1 class="text-3xl sm:text-4xl font-bold">Hi there 👋 </h1>

		<p class="text-base sm:text-lg mt-5">
			My name is Vincent. I am a <strong>full-stack developer</strong> building <strong>fast, reliable and easy-to-use web applications.</strong>

			I am always enthusiasthic about new technologies, trying to find the optimal way to create the <strong>best user experience</strong> possible and chasing after the <strong>perfect lighthouse scores.</strong>
		</p>

		<p class="text-base sm:text-lg mt-5">
			I have a well-founded proficiencies with <strong>Javascript</strong> and <strong>PHP</strong> and experience with modern rendering frameworks like <strong>Svelte, React, Vue and Astro</strong>, as well as technologies and meta-frameworks like <strong>NextJS, SvelteKit, NuxtJS, Typescript, Laravel and Tailwindcss.</strong>
		</p>

		<p class="text-base sm:text-lg mt-5">
			In case you would like to get to know me a little better, feel free to stay a while and read more <strong><a href="/about-me" class="underline">about me.</a></strong>
			If you are curious about my work you can browse through some of my previous <strong><a href="/projects" class="underline">projects.</a></strong>
			I have also just recently started a <strong><a href="/blog" class="underline">blog</a></strong>, where I share some of my experiences and documenting some of my side projects.
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
const $$Maintenance = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
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

const $$file$3 = "/Users/vincentschilling/Projects/portfolio/src/pages/maintenance.astro";
const $$url$3 = "/maintenance";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Maintenance,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$ = ["<p", " class=\"text-base sm:text-lg mt-5\">Now that I think about it, my path in web development was partly laid in <strong>2014-2016</strong> when I went to August-Bebel-Schule (Offenbach, Germany) a high school with a focus on <strong>media design. </strong>Here, I made my first experience with <strong>web design and static HTML</strong>, however the biggest gain back then was learning about basic design principles and how to apply them.</p>"],
  _tmpl$2 = ["<p", " class=\"text-base sm:text-lg mt-5\">After graduating and spending some time abroad, I began studying Advanced Technology at the <strong>University of Twente (Enschede, Netherlands) in 2017</strong>. This Bachelor of Science program was a mix of interdisciplinary fields, ranging from <strong>electrical engineering, advanced mechanics, mechatronics and robotics to technical computer science and systems engineering.</strong>During my studies I was was tought the fundamentals of Computer Science, <strong>basics in hard- and software engineering and writing algorithms using languages like C, C++, Python and Java. </strong>Back then I was looking forward to a career in the fields of Robotics, which had turnt out to have come differently.</p>"],
  _tmpl$3 = ["<p", " class=\"text-base sm:text-lg mt-5\">In <strong>2021</strong> I finished my <strong>BSc thesis</strong> about virtual agents in <strong>Augmented Reality</strong>  used in primary education. This work was an explorative study where I have designed a virtual robot in AR on a mobile device, that should assist children while doing their homework to foster learning motivation. I think this way of human computer interaction will play a major role in the future of society and looking at the current emergence of artificial intelligence and its implications.</p>"],
  _tmpl$4 = ["<p", " class=\"text-base sm:text-lg mt-5\">All together my educational background has prepared my quite well for all the challenges I am encountering in my daily work. Having a design and engineering background also helps me to create user centered products that run reliably and performant.</p>"],
  _tmpl$5 = ["<p", " class=\"text-base sm:text-lg mt-5\">After graduating in <strong>April 2021,</strong> I got my first job in web dev, working on several projects based on <strong>Laravel and VueJS or NuxtJS.</strong></p>"],
  _tmpl$6 = ["<p", " class=\"text-base sm:text-lg mt-5\">Since the middle of 2022 I am broadening my scope and exploring all kinds of different technologies in the web space. For the future I am looking to become an active member in the web community, contributing to open source and building something that moves people.</p>"],
  _tmpl$7 = ["<p", " class=\"text-base sm:text-lg mt-5\">I started my career as a <strong>web developer</strong> back in <strong>2021</strong> and my job has become my hobby and passion. Through my <strong>design and engineering background</strong>, I am a <strong>good generalist,</strong> always able to look at problems from different angles.</p>"],
  _tmpl$8 = ["<p", " class=\"text-base sm:text-lg mt-5\">Apart from web development I am interested in the topics <strong>virtual worlds, AI, blockchain, web3</strong> and many more.</p>"],
  _tmpl$9 = ["<p", " class=\"text-base sm:text-lg mt-5\">When I am not coding, you can probably catch me riding my gravel bike, reading a book or eating.</p>"],
  _tmpl$10 = ["<div", " class=\"max-w-3xl relative\"><span class=\"inline-flex\"><h1 class=\"text-3xl sm:text-4xl font-bold\">About me</h1><button class=\"ml-3 inline-flex bg-indigo-700 font-semibold text-indigo-50 rounded w-20 hover:bg-indigo-600 hover:text-white items-center justify-center text-xl\">", "</button></span><!--#-->", "<!--/--><!--#-->", "<!--/--></div>"];
const [show, setShow] = createSignal("short");
const AboutMeSection = () => {
  return ssr(_tmpl$10, ssrHydrationKey(), show() === "long" ? "long" : "short", escape(createComponent(Show, {
    get when() {
      return show() === "long";
    },
    get children() {
      return [ssr(_tmpl$, ssrHydrationKey()), ssr(_tmpl$2, ssrHydrationKey()), ssr(_tmpl$3, ssrHydrationKey()), ssr(_tmpl$4, ssrHydrationKey()), ssr(_tmpl$5, ssrHydrationKey()), ssr(_tmpl$6, ssrHydrationKey())];
    }
  })), escape(createComponent(Show, {
    get when() {
      return show() === "short";
    },
    get children() {
      return [ssr(_tmpl$7, ssrHydrationKey()), ssr(_tmpl$8, ssrHydrationKey()), ssr(_tmpl$9, ssrHydrationKey())];
    }
  })));
};

__astro_tag_component__(AboutMeSection, "@astrojs/solid-js");

const $$Astro$2 = createAstro("https://vincentdorian.me");
const $$AboutMe = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AboutMe;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "AboutMeSection", AboutMeSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/vincentschilling/Projects/portfolio/src/components/about-me/AboutMeSection", "client:component-export": "default" })}` })}`;
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
const $$Index$1 = createComponent$1(async ($$result, $$props, $$slots) => {
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
const $$Index = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = await Astro2.glob(/* #__PURE__ */ Object.assign({"./nav-link-animations-using-tailwindcss.mdx": () => Promise.resolve().then(() => _page5)}), () => "./*.mdx");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="max-w-3xl">
        <h1 class="text-3xl sm:text-4xl font-bold">Blog</h1>

		<p class="text-base sm:text-lg mt-5">
            I share some of the things I encounter during my projects. If you like my stuff, I would be happy to hear from you and connect (if you don't - feel free to criticize and let me know why).
        </p>
    <ul class="mt-5">
        ${posts.map((p) => renderTemplate`<li>
                    <a class="flex flex-col items-start"${addAttribute(p.frontmatter.url, "href")}>
                    <span class="text-lg font-semibold">${p.frontmatter.title}</span>
                    <span class="text-gray-600">${p.frontmatter.date}</span>
                    </a>
                </li>`)}
    </ul>
</div>` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/blog/index.astro");

const $$file = "/Users/vincentschilling/Projects/portfolio/src/pages/blog/index.astro";
const $$url = "/blog";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const MDXLayout = async function ({
  children
}) {
  const Layout = (await import('../BlogPostLayout.a1cfde4d.mjs')).default;
  const {
    layout,
    ...content
  } = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode(Layout, {
    file,
    url,
    content,
    frontmatter: content,
    headings: getHeadings(),
    "server:root": true,
    children
  });
};
const frontmatter = {
  "layout": "../../layouts/BlogPostLayout.astro",
  "title": "Nav link animations using Tailwindcss",
  "description": "Let me show you how you can easily achieve some cool animations using pseudo-elements with Tailwindcss!",
  "draft": true,
  "url": "/blog/nav-link-animations-using-tailwindcss",
  "date": "27/02/2023"
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p"
  }, props.components);
  return createVNode(Fragment, {
    children: ["\n", createVNode(_components.p, {
      children: "Post coming soon\u2026"
    })]
  });
}
function MDXContent(props = {}) {
  return createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  });
}

__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "/blog/nav-link-animations-using-tailwindcss";
const file = "/Users/vincentschilling/Projects/portfolio/src/pages/blog/nav-link-animations-using-tailwindcss.mdx";
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

export { $$Layout as $, _page0 as _, _page1 as a, _page2 as b, createComponent as c, _page3 as d, _page4 as e, _page5 as f, renderToString as r, ssr as s };
