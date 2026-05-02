import Link from 'next/link';
import type { useTranslations } from 'next-intl';

type Translations = ReturnType<typeof useTranslations<'routes'>>;

const images = [
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
  'https://images.unsplash.com/photo-1579187626396-5a9dc3e09522?w=600&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80',
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
      className="group block bg-stone-900 rounded-xl overflow-hidden border border-stone-800 hover:border-amber-600/50 transition-all hover:-translate-y-1"
    >
      <div className="h-48 overflow-hidden">
        <div
          className="h-full w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${images[idx]})` }}
        />
      </div>
      <div className="p-6">
        <p className="text-amber-400 text-sm mb-2">{tr(`${routeKey}.tagline` as any)}</p>
        <h3 className="text-xl font-bold text-white mb-3">{tr(`${routeKey}.name` as any)}</h3>
        <p className="text-stone-400 text-sm mb-3">{tr(`${routeKey}.duration` as any)}</p>
        <p className="text-stone-300 text-sm leading-relaxed line-clamp-3">
          {tr(`${routeKey}.description` as any)}
        </p>
      </div>
    </Link>
  );
}
