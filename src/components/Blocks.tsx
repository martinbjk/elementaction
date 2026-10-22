import { Link } from '@/i18n/navigation';
import type { ReactNode } from 'react';
import { formatArticleDate, type Article } from '@/lib/articles';
import type { DesignItem } from '@/lib/design-wall';
import { withBase } from '@/lib/base-path';

/** Rubrik för ett innehållsblock, med valfri "se alla"-länk till höger. */
export function BlockHeader({ title, href, linkText }: { title: string; href?: string; linkText?: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-sec-line/20 pb-3">
      <h2 className="font-head text-2xl leading-tight text-sec-ink sm:text-3xl">{title}</h2>
      {href && linkText && (
        <Link href={href} className="shrink-0 text-sm font-medium text-sec-ink underline decoration-sec-accent decoration-2 underline-offset-4 hover:text-sec-accent">
          {linkText}
        </Link>
      )}
    </div>
  );
}

/** Tomt läge: säger rakt ut vad som saknas och att det är på väg. */
export function EmptyState({ title, body, children }: { title: string; body: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-sec-line/30 px-6 py-12 text-center">
      <p className="font-head text-xl text-sec-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sec-muted">{body}</p>
      {children}
    </div>
  );
}

export function ArticleCard({ article, locale, onlyInEnglish }: { article: Article; locale: string; onlyInEnglish: string }) {
  return (
    <Link href={`/${article.section}/articles/${article.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sec-line/15 bg-sec-card/70 transition hover:border-sec-accent/70">
      <span className="block aspect-[1200/630] overflow-hidden bg-sec-deep">
        {/* eslint-disable-next-line @next/next/no-img-element -- statisk export, ingen bildoptimering */}
        <img src={withBase(article.ogImage)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="text-xs text-sec-muted">
          {formatArticleDate(article.date, locale)}
          {article.isFallback && <span className="ml-2 rounded-full border border-sec-line/25 px-2 py-0.5">{onlyInEnglish}</span>}
        </span>
        <span className="mt-2 font-head text-xl leading-snug text-sec-ink group-hover:underline group-hover:decoration-sec-accent group-hover:underline-offset-4">
          {article.title}
        </span>
        <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-sec-muted">{article.excerpt}</span>
      </span>
    </Link>
  );
}

export function DesignWall({ items, fromArticle }: { items: DesignItem[]; fromArticle: string }) {
  return (
    <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
      {items.map((item) => (
        <li key={item.src} className="break-inside-avoid overflow-hidden rounded-2xl border border-sec-line/15 bg-sec-card/70">
          <a href={withBase(item.src)} target="_blank" rel="noreferrer" className="block bg-white/90">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBase(item.src)} alt={item.alt} loading="lazy" className="w-full" />
          </a>
          <p className="px-4 py-3 text-sm text-sec-muted">
            {fromArticle}:{' '}
            <Link href={`/${item.section}/articles/${item.article.slug}`} className="text-sec-ink underline decoration-sec-accent underline-offset-4">
              {item.article.title}
            </Link>
          </p>
        </li>
      ))}
    </ul>
  );
}
