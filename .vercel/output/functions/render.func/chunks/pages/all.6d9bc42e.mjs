/* empty css                           */import { c as createAstro, a as createComponent$1, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderSlot, e as renderHead, _ as __astro_tag_component__, f as createVNode, F as Fragment, g as renderComponent } from '../astro.e8c50ea2.mjs';
import 'html-escaper';

const ERROR = Symbol("error");
function castError(err) {
  if (err instanceof Error || typeof err === "string") return err;
  return new Error("Unknown error");
}
function handleError(err) {
  err = castError(err);
  const fns = lookup(Owner, ERROR);
  if (!fns) throw err;
  for (const f of fns) f(err);
}
const UNOWNED = {
  context: null,
  owner: null,
  owned: null,
  cleanups: null
};
let Owner = null;
function createRoot(fn, detachedOwner) {
  const owner = Owner,
    root = fn.length === 0 ? UNOWNED : {
      context: null,
      owner: detachedOwner === undefined ? owner : detachedOwner,
      owned: null,
      cleanups: null
    };
  Owner = root;
  let result;
  try {
    result = fn(fn.length === 0 ? () => {} : () => cleanNode(root));
  } catch (err) {
    handleError(err);
  } finally {
    Owner = owner;
  }
  return result;
}
function createSignal(value, options) {
  return [() => value, v => {
    return value = typeof v === "function" ? v(value) : v;
  }];
}
function cleanNode(node) {
  if (node.owned) {
    for (let i = 0; i < node.owned.length; i++) cleanNode(node.owned[i]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (let i = 0; i < node.cleanups.length; i++) node.cleanups[i]();
    node.cleanups = null;
  }
}
function lookup(owner, key) {
  return owner ? owner.context && owner.context[key] !== undefined ? owner.context[key] : lookup(owner.owner, key) : undefined;
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
  let html = createRoot(d => {
    setTimeout(d);
    return resolveSSRNode(escape(code()));
  });
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

const $$Astro$6 = createAstro("https://vincentdorian.me");
const $$LinkBox = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$LinkBox;
  let { href } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<a class="group inline-flex items-center border border-gray-900 p-2 w-fit text-sm hover:bg-gray-900 hover:text-gray-100 gap-x-1 active:bg-gray-900 active:text-gray-100"${addAttribute(href, "href")}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-800 group-hover:text-gray-200 group-active:text-gray-200">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"></path>
    </svg>
    ${renderSlot($$result, $$slots["default"])}
</a>`;
}, "/Users/vincentschilling/Projects/portfolio/src/components/LinkBox.astro");

const $$Astro$5 = createAstro("https://vincentdorian.me");
const $$Layout = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
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
    }
    /* {
      name: "Contact",
      href: "/contact"
    } */
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
        ${renderSlot($$result, $$slots["default"])}
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
      children: ["Hi, I\u2019m Vincent. I\u2019m a ", createVNode(_components.strong, {
        children: "web developer"
      }), " that loves to create and explore.\nI am always enthusiasthic about new technologies, trying to shape the future of the web."]
    }), "\n", createVNode(_components.p, {
      children: ["I have a well-founded proficiencies with ", createVNode(_components.strong, {
        children: "Javascript"
      }), " and ", createVNode(_components.strong, {
        children: "PHP"
      }), ", and love building apps with modern rendering frameworks, like ", createVNode(_components.strong, {
        children: "React, Vue, Svelte and Astro"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "I am always happy to connect, so if you would like to get in touch you can either write me a DM, or send me an email."
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

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content: Content$1,
  default: Content$1,
  file: file$1,
  frontmatter: frontmatter$1,
  getHeadings: getHeadings$1,
  url: url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro("https://vincentdorian.me");
const $$Index$3 = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index$3;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Vincent Dorian" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section>
		<div class="mt-5 prose prose-p:font-light prose-strong:font-normal">
			${renderComponent($$result2, "Content", Content$1, {})}
		</div>
		<div class="mt-7 flex flex-col sm:flex-row gap-3">
			${renderComponent($$result2, "LinkBox", $$LinkBox, { "href": "https://www.linkedin.com/in/vincent-schilling-758246251/" }, { "default": ($$result3) => renderTemplate`Connect on LinkedIn` })}

			${renderComponent($$result2, "LinkBox", $$LinkBox, { "href": "/contact" }, { "default": ($$result3) => renderTemplate`Leave me a message` })}
		</div>
	</section>` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/index.astro");

const $$file$4 = "/Users/vincentschilling/Projects/portfolio/src/pages/index.astro";
const $$url$4 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$3,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("https://vincentdorian.me");
const $$Index$2 = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$2;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Projects" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section>
    <div class="prose prose-p:font-light prose-strong:font-normal mt-5">
      <p>
        Soon you will be able to view some of my projects here. Until then you
        can have a look at my GitHub.
      </p>
    </div>
    <div class="mt-7 flex flex-col sm:flex-row gap-3">
      ${renderComponent($$result2, "LinkBox", $$LinkBox, { "href": "https://github.com/vincentdorian" }, { "default": ($$result3) => renderTemplate`
        View my GitHub
      ` })}
    </div>
  </section>` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/projects/index.astro");

const $$file$3 = "/Users/vincentschilling/Projects/portfolio/src/pages/projects/index.astro";
const $$url$3 = "/projects";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$2,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$ = ["<div", " class=\"sm:border sm:border-gray-900 sm:p-8 mt-5\"><form class=\"max-w-3xl \"><div><label class=\"block text-sm font-normal tracking-wide\">Name</label><input class=\"w-full rounded-none focus:rounded-none focus:outline-none focus:ring-none border border-gray-900 px-3 py-1\"></div><div class=\"mt-3\"><label class=\"block text-sm font-normal tracking-wide\">Email</label><input class=\"w-full rounded-none focus:rounded-none focus:outline-none focus:ring-none border border-gray-900 px-3 py-1\"></div><div class=\"mt-3\"><label class=\"block text-sm font-normal tracking-wide\">Message</label><textarea class=\"w-full rounded-none focus:rounded-none focus:outline-none focus:ring-none border border-gray-900 px-3 py-1\"></textarea></div></form><button class=\"group flex flex-row mt-5 px-5 py-1.5 bg-gray-900 text-gray-100 items-center\"><span class=\"font-light tracking-wide\">Send</span><svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-5 h-5 group-hover:translate-x-1 group-active:translate-x-1 transition duration-200 ease-in-out\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75\"></path></svg></button></div>"],
  _tmpl$2 = ["<div", " class=\"mt-5\">Thankyou. I will get back to you shortly.</div>"];
const [submitted, setSubmitted] = createSignal(false);
const ContactForm = () => {
  return !submitted() ? ssr(_tmpl$, ssrHydrationKey()) : ssr(_tmpl$2, ssrHydrationKey());
};

__astro_tag_component__(ContactForm, "@astrojs/solid-js");

const $$Astro$2 = createAstro("https://vincentdorian.me");
const $$Index$1 = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section>
    <div class="prose prose-p:font-light prose-strong:font-normal mt-5">
      <p>
        If you want to reach out to me, you can always send me a DM on any of my
        social media or just use the following contact form.
      </p>
    </div>
    ${renderComponent($$result2, "ContactForm", ContactForm, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "/Users/vincentschilling/Projects/portfolio/src/components/ContactForm", "client:component-export": "default" })}
  </section>` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/contact/index.astro");

const $$file$2 = "/Users/vincentschilling/Projects/portfolio/src/pages/contact/index.astro";
const $$url$2 = "/contact";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Content,
  default: Content,
  file,
  frontmatter,
  getHeadings,
  url
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://vincentdorian.me");
const $$About = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section>
		<div class="mt-5 prose prose-p:font-light prose-strong:font-normal">
			${renderComponent($$result2, "Content", Content, {})}
		</div>

        <div class="mt-7 flex flex-col sm:flex-row gap-3">
			${renderComponent($$result2, "LinkBox", $$LinkBox, { "href": "https://twitter.com/vdoedev" }, { "default": ($$result3) => renderTemplate`Follow me on Twitter` })}

			${renderComponent($$result2, "LinkBox", $$LinkBox, { "href": "https://www.strava.com/athletes/106008249" }, { "default": ($$result3) => renderTemplate`Connect on Strava` })}
		</div>
    </section>` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/about.astro");

const $$file$1 = "/Users/vincentschilling/Projects/portfolio/src/pages/about.astro";
const $$url$1 = "/about";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://vincentdorian.me");
const $$Index = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section>
    <div class="prose prose-p:font-light prose-strong:font-normal mt-5">
      <p>
        I've recently begun to write some blog posts and am planning to become
        more active in the dev community. You can view my posts on Dev.to.
      </p>
    </div>
    <div class="mt-7 flex flex-col sm:flex-row gap-3">
      ${renderComponent($$result2, "LinkBox", $$LinkBox, { "href": "https://dev.to/vincentdorian" }, { "default": ($$result3) => renderTemplate`Read on DEV.TO` })}
    </div>
  </section>` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/pages/blog/index.astro");

const $$file = "/Users/vincentschilling/Projects/portfolio/src/pages/blog/index.astro";
const $$url = "/blog";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page1 as a, _page2 as b, createComponent as c, _page3 as d, _page4 as e, _page5 as f, _page6 as g, renderToString as r, ssr as s };
