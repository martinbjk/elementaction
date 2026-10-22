'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Play } from 'lucide-react';
import type { FeaturedVideo } from '@/data/videos';

/**
 * Videorutnät med "klicka för att spela": först visas bara YouTubes
 * miniatyrbild (lätt), och spelaren laddas när man trycker. Sidan blir
 * då snabb även med många videos. youtube-nocookie används för integritet.
 */
export function VideoGrid({ videos, limit }: { videos: FeaturedVideo[]; limit?: number }) {
  const list = limit ? videos.slice(0, limit) : videos;
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((v) => (
        <li key={v.id}>
          <VideoCard video={v} />
        </li>
      ))}
    </ul>
  );
}

function VideoCard({ video }: { video: FeaturedVideo }) {
  const t = useTranslations('videos');
  const [playing, setPlaying] = useState(false);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-sec-line/15 bg-sec-card/70">
      <div className="relative aspect-video bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`${video.title} — Play`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sec-accent text-sec-accent-ink shadow-lg transition group-hover:scale-110">
              <Play size={22} fill="currentColor" aria-hidden />
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-head text-lg leading-snug text-sec-ink">{video.title.trim()}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-sec-muted">{video.intro}</p>
        <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" className="mt-4 text-sm text-sec-ink underline decoration-sec-accent underline-offset-4">
          {t('watch')}
        </a>
      </div>
    </article>
  );
}
