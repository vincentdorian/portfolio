import { c as createAstro, a as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead, e as renderSlot } from './astro.846112cf.mjs';
import 'html-escaper';
import { $ as $$Layout } from './pages/all.4c0aae0a.mjs';
import 'path-to-regexp';
import 'mime';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import 'slash';
/* empty css                             */
const $$Astro = createAstro("https://vincentdorian.me");
const $$BlogPostLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPostLayout;
  const { frontmatter } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="max-w-3xl -mt-8">
        <span>
            <a href="/blog" class="text-gray-800">
                &larr; back to overview
            </a>
        </span>

        <h1 class="text-3xl sm:text-4xl font-bold">
            ${frontmatter.title}
        </h1>
        
        
        
        <div class="text-base sm:text-lg mt-5">
            ${renderSlot($$result2, $$slots["default"])}
        </div>
    </div>` })}`;
}, "/Users/vincentschilling/Projects/portfolio/src/layouts/BlogPostLayout.astro");

const $$file = "/Users/vincentschilling/Projects/portfolio/src/layouts/BlogPostLayout.astro";
const $$url = undefined;

export { $$BlogPostLayout as default, $$file as file, $$url as url };
