import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { resolveArticleImage } from '@/lib/articles-shared';
import { withBase } from '@/lib/base-path';

/**
 * Renderar artikelns Markdown. Läsytan är alltid ljust "papper" (se
 * artikelsidan), oavsett sektion — lång text läses bäst så, och de
 * interaktiva embeds som flyttats från skateboardeventcalendar (park-
 * sök, vågpooler, surfverktyg) är byggda för ljus bakgrund.
 * Rubriker och länkar tar sektionens färg (sec-paper) och rubrikfont.
 */
export function ArticleMarkdown({ content, slug }: { content: string; slug: string }) {
  const components: Components = {
    h2: ({ children }) => <h2 className="mt-12 font-head text-[1.7rem] leading-tight text-neutral-950">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-lg font-semibold text-neutral-900">{children}</h3>,
    p: ({ children }) => <p className="mt-4 text-[1.0625rem] leading-[1.7] text-neutral-800">{children}</p>,
    ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-5 text-[1.0625rem] leading-[1.65] text-neutral-800">{children}</ul>,
    ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-[1.0625rem] leading-[1.65] text-neutral-800">{children}</ol>,
    li: ({ children }) => <li className="marker:text-sec-paper">{children}</li>,
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noreferrer noopener' : undefined}
        className="text-sec-paper underline decoration-sec-paper/40 underline-offset-2 transition hover:decoration-sec-paper"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-semibold text-neutral-950">{children}</strong>,
    blockquote: ({ children }) => <blockquote className="mt-6 border-l-4 border-sec-paper pl-5 italic text-neutral-700">{children}</blockquote>,
    hr: () => <hr className="mt-10 border-neutral-200" />,
    code: ({ children }) => <code className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-[0.85em]">{children}</code>,
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element -- statisk export, okända mått
      <img src={withBase(resolveArticleImage(src ?? '', slug))} alt={alt ?? ''} loading="lazy" className="mt-8 w-full rounded-xl border border-neutral-200" />
    ),
    table: ({ children }) => (
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="border-b-2 border-neutral-300 text-left text-neutral-600">{children}</thead>,
    th: ({ children }) => <th className="py-2 pr-4 align-top font-semibold">{children}</th>,
    tr: ({ children }) => <tr className="border-b border-neutral-200">{children}</tr>,
    td: ({ children }) => <td className="py-2.5 pr-4 align-top text-neutral-800">{children}</td>
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
