import Link from 'next/link';
import type { useTranslations } from 'next-intl';
import type { RouteMeta } from '../../content/routes';

type Translations = ReturnType<typeof useTranslations<'routes'>>;

interface Props {
  route: RouteMeta;
  locale: string;
  tr: Translations;
}

export default function RouteCard({ route, locale, tr }: Props) {
  const routeKey = route.key;

  return (
    <Link
      href={`/${locale}/routes/${route.slug}`}
      className="group block bg-white rounded-sm overflow-hidden border border-black/5 hover:border-[#8C3B2E]/20 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/3"
    >
      <div className="h-48 overflow-hidden relative">
        <div
          className="h-full w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${route.image})` }}
        />
        <span className={`absolute top-4 left-4 text-[9px] font-semibold tracking-[2px] uppercase px-3 py-1.5 rounded-sm text-white ${route.tierColor}`}>
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

        {/* Price sits directly above the CTA so it reads as part of the
            decision, not fine print. Insurance is included in every price. */}
        <div className="flex items-baseline justify-between gap-3 pt-4 mb-4 border-t border-black/5">
          <div>
            <p className="text-base font-medium text-[#1F1F1F] leading-none">
              {tr(`${routeKey}.pricing` as any)}
            </p>
            <p className="text-[10px] tracking-[1px] uppercase text-stone-400 mt-1.5">
              {tr(`${routeKey}.groupSize` as any)}
            </p>
          </div>
          <span className="text-[9px] font-semibold tracking-[1.5px] uppercase text-[#0F6E56] shrink-0 text-right leading-tight">
            {tr('insuranceBadge')}
          </span>
        </div>

        <span className="text-[11px] font-semibold tracking-[2px] uppercase text-[#8C3B2E] inline-flex items-center gap-1 group-hover:gap-3 transition-all">
          {locale === 'zh' ? '了解详情' : locale === 'th' ? 'ดูเพิ่มเติม' : locale === 'es' ? 'Ver más' : 'Learn More'} →
        </span>
      </div>
    </Link>
  );
}
