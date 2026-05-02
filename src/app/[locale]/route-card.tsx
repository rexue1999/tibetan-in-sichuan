import Link from 'next/link';
import type { useTranslations } from 'next-intl';

type Translations = ReturnType<typeof useTranslations<'routes'>>;

const images = [
  '/images/walk-tour.jpg',
  '/images/highland-trip.jpg',
  '/images/nomad.jpg',
];

const tiers = [
  { color: 'bg-[#5B7B5A]', label: 'tier' as const },
  { color: 'bg-[#B8934E]', label: 'tier' as const },
  { color: 'bg-[#8C3B2E]', label: 'tier' as const },
];

interface Props {
  slug: string;
  locale: string;
  routeKey: 'route1' | 'route2' | 'route3';
  tr: Translations;
}

export default function RouteCard({ slug, locale, routeKey, tr }: Props) {
  const idx = parseInt(routeKey.replace('route', '')) - 1;

  return (
    <Link
      href={`/${locale}/routes/${slug}`}
      className="group block bg-white rounded-sm overflow-hidden border border-black/5 hover:border-[#8C3B2E]/20 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/3"
    >
      <div className="h-48 overflow-hidden relative">
        <div
          className="h-full w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${images[idx]})` }}
        />
        <span className={`absolute top-4 left-4 text-[9px] font-semibold tracking-[2px] uppercase px-3 py-1.5 rounded-sm text-white ${tiers[idx].color}`}>
          {tr(`${routeKey}.tier` as any)}
        </span>
      </div>
      <div className="p-6">
        <p className="text-[10px] font-semibold tracking-[3px] uppercase text-stone-300 mb-2">
          {tr(`${routeKey}.duration` as any)}
        </p>
        <p className="text-xs tracking-[2px] uppercase text-[#8C3B2E] mb-3">{tr(`${routeKey}.tagline` as any)}</p>
        <h3 className="text-xl font-normal tracking-[-0.3px] text-[#1F1F1F] mb-3">{tr(`${routeKey}.name` as any)}</h3>
        <p className="text-sm leading-relaxed text-stone-400 line-clamp-3 mb-4">
          {tr(`${routeKey}.description` as any)}
        </p>
        <span className="text-[11px] font-semibold tracking-[2px] uppercase text-[#8C3B2E] inline-flex items-center gap-1 group-hover:gap-3 transition-all">
          {locale === 'zh' ? '了解详情' : locale === 'th' ? 'ดูเพิ่มเติม' : 'Learn More'} →
        </span>
      </div>
    </Link>
  );
}
