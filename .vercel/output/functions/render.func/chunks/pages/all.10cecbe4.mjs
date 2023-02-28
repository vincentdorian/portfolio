/* empty css                           */import { c as createAstro, a as createComponent$1, r as renderTemplate, b as addAttribute, d as renderHead, e as renderSlot, f as renderComponent, m as maybeRenderHead, _ as __astro_tag_component__, F as Fragment, g as createVNode } from '../astro.846112cf.mjs';
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
    <div class="min-h-screen">
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
    <footer class="max-w-7xl w-full mx-auto px-5 sm:px-8 2xl:px-0 pt-4 sm:pt-6 pb-5 text-gray-800">
      <div class="max-w-3xl border-2 border-indigo-700 w-full rounded-lg px-6 py-5">
        <span class="text-xl font-semibold">
          Wanna get in touch?
        </span>

        <p class="text-base sm:text-lg">
          You can always contact me on social media or just write an email. I'm always happy to connect.
        </p>

        <div class="flex flex-row items-center gap-x-3 mt-3">
          <a class="text-gray-500 hover:text-gray-600 h-6 w-6" href="mailto:vincentdoriandev@gmail.com">
            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <title>
              Link to my mail
            </title>
            <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/vincent-schilling-758246251/">
            <svg class="text-gray-500 hover:text-gray-600 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <title>
                Link to my LinkedIn
              </title>
              <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
          </a>
          <a class="text-gray-500 hover:text-gray-600 h-6 w-6" href="https://twitter.com/vincentdorian_">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <title>
                Link to my Twitter
              </title>
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
          </a>
          <a class="text-gray-500 hover:text-gray-600 h-6 w-6" href="https://github.com/vincentdorian">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 496 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <title>
                Link to my GitHub
              </title>
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
          </a>
          

          <a class="text-gray-500 hover:text-gray-600 h-6 w-6" href="https://dev.to/vincentdorian">
            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <title>
              Link to Dev.to Account
            </title>
            <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z"></path></svg>
          </a>
          
        </div>
      </div>
    </footer>
    </div>
    
   
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

const $$Astro$2 = createAstro("https://vincentdorian.me");
const $$Index$1 = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$1;
  return Astro2.redirect("/maintenance");
}, "/Users/vincentschilling/Projects/portfolio/src/pages/projects/index.astro");

const $$file$2 = "/Users/vincentschilling/Projects/portfolio/src/pages/projects/index.astro";
const $$url$2 = "/projects";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$ = ["<p", " class=\"text-base sm:text-lg mt-5\">My path in web development was partly laid in <strong>2014-2016</strong> when I went to August-Bebel-Schule (Offenbach, Germany) a high school with a focus on <strong>media design. </strong>Here, I made my first experience with <strong>web design and static HTML</strong>, however the biggest gain back then was learning about basic design principles and how to apply them.</p>"],
  _tmpl$2 = ["<p", " class=\"text-base sm:text-lg mt-5\">After graduating and spending some time abroad, I began studying Advanced Technology at the <strong>University of Twente (Enschede, Netherlands) in 2017</strong>. This Bachelor of Science program was a mix of interdisciplinary fields, ranging from <strong>electrical engineering, advanced mechanics, mechatronics and robotics to technical computer science and systems engineering.</strong>During my studies I was was tought the fundamentals of Computer Science, <strong>basics in hard- and software engineering and writing algorithms using languages like C, C++, Python and Java. </strong>Back then I was looking forward to a career in the fields of Robotics, which had turnt out to have come differently.</p>"],
  _tmpl$3 = ["<p", " class=\"text-base sm:text-lg mt-5\">In <strong>2021</strong> I finished my <strong>BSc thesis</strong> about virtual agents in <strong>Augmented Reality</strong>  used in primary education. This work was an explorative study where I have designed a virtual robot in AR on a mobile device, that should assist children while doing their homework to foster learning motivation. I think this way of human computer interaction will play a major role in the future of society and looking at the current emergence of artificial intelligence and its implications.</p>"],
  _tmpl$4 = ["<p", " class=\"text-base sm:text-lg mt-5\">All together my educational background has prepared my quite well for all the challenges I am encountering in my daily work. Having a design and engineering background also helps me to create user centered products that run reliably and performant.</p>"],
  _tmpl$5 = ["<p", " class=\"text-base sm:text-lg mt-5\">After graduating in <strong>April 2021,</strong> I got my first job in web dev, working on several projects based on <strong>Laravel and VueJS or NuxtJS.</strong></p>"],
  _tmpl$6 = ["<p", " class=\"text-base sm:text-lg mt-5\">Since the middle of 2022 I am broadening my scope and exploring all kinds of different technologies in the web space. For the future I am looking to become an active member in the web community, contributing to open source and building something that moves people.</p>"],
  _tmpl$7 = ["<p", " class=\"text-base sm:text-lg mt-5\">I started my career as a <strong>web developer</strong> back in <strong>2021</strong> and my job has become my hobby and passion. Through my <strong>design and engineering background</strong>, I am a <strong>good generalist,</strong> always able to look at problems from different angles.</p>"],
  _tmpl$8 = ["<p", " class=\"text-base sm:text-lg mt-5\">Apart from web development I am interested in the topics <strong>virtual worlds, AI, blockchain, web3</strong> and many more.</p>"],
  _tmpl$9 = ["<p", " class=\"text-base sm:text-lg mt-5\">When I am not coding, you can probably catch me riding my gravel bike, reading a book or eating.</p>"],
  _tmpl$10 = ["<div", " class=\"max-w-3xl relative\"><span class=\"inline-flex\"><h1 class=\"text-3xl sm:text-4xl font-bold\">About</h1><button class=\"ml-3 inline-flex bg-indigo-700 font-semibold text-indigo-50 rounded w-20 hover:bg-indigo-600 hover:text-white items-center justify-center text-xl\">", "</button></span><!--#-->", "<!--/--><!--#-->", "<!--/--></div>"];
const [show, setShow] = createSignal("short");
const AboutSection = () => {
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

__astro_tag_component__(AboutSection, "@astrojs/solid-js");

const $$Astro$1 = createAstro("https://vincentdorian.me");
const $$About = createComponent$1(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "AboutSection", AboutSection, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/vincentschilling/Projects/portfolio/src/components/about/AboutSection", "client:component-export": "default" })}` })}`;
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
  const posts = await Astro2.glob(/* #__PURE__ */ Object.assign({"./nav-link-animations-using-tailwindcss.mdx": () => Promise.resolve().then(() => _page5)}), () => "./*.mdx");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="max-w-3xl">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-800">Blog</h1>

		<p class="text-base sm:text-lg mt-5 text-gray-800">
            I write about some my thoughts and projects. Mainly about JS frameworks, Laravel and Tailwindcss.
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
  const Layout = (await import('../BlogPostLayout.a230f30c.mjs')).default;
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
