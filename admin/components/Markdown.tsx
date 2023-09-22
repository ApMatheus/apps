import { fromFileUrl } from "std/path/mod.ts";
import { CSS, KATEX_CSS, render } from "https://deno.land/x/gfm@0.2.5/mod.ts";
import "https://esm.sh/prismjs@1.27.0/components/prism-jsx.js?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-typescript.js?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-tsx.js?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-diff.js?no-check";

export const Markdown = (path: string) => () => {
  const content = Deno.readTextFileSync(fromFileUrl(path));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <style dangerouslySetInnerHTML={{ __html: KATEX_CSS }} />
      <div
        class="markdown-body"
        style={{ padding: "16px 32px" }}
        dangerouslySetInnerHTML={{
          __html: render(content, {
            allowIframes: true,
            allowMath: true,
            disableHtmlSanitization: true,
          }),
        }}
      />
    </>
  );
};
