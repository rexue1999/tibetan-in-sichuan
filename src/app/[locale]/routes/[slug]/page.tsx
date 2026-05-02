import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const routeMap: Record<string, { key: 'route1' | 'route2' | 'route3'; image: string }> = {
  'tibetan-walk-chengdu': {
    key: 'route1',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
  },
  'go-west-go-tibet': {
    key: 'route2',
    image: 'https://images.unsplash.com/photo-1579187626396-5a9dc3e09522?w=1200&q=80',
  },
  'tibetan-nomad': {
    key: 'route3',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80',
  },
};

export default async function RouteDetail({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const route = routeMap[slug];
  if (!route) notFound();

  const tr = await getTranslations({ locale, namespace: 'routes' });
  const tu = await getTranslations({ locale, namespace: 'upsell' });

  return (
    <div className="min-h-screen pt-16">
      {/* Hero image */}
      <div className="relative h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${route.image})` }}
        />
        <div className="absolute inset-0 bg-[#1F1F1F]/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-3xl md:text-5xl font-light tracking-[-0.5px] text-white mb-4">
              {tr(`${route.key}.name` as any)}
            </h1>
            <p className="text-[#B85C4E] text-lg">{tr(`${route.key}.tagline` as any)}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#8C3B2E] mb-4">
            {tr(`${route.key}.duration` as any)}
          </p>
          <p className="text-lg leading-relaxed text-stone-600">
            {tr(`${route.key}.description` as any)}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-medium text-[#1F1F1F] mb-6">
            {locale === 'zh' ? '行程亮点' : locale === 'th' ? 'ไฮไลท์' : 'Highlights'}
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {([0, 1, 2, 3] as const).map((i) => (
              <li key={i} className="flex items-center gap-3 text-stone-600 bg-[#F5F2ED] rounded-sm p-4 border border-black/5">
                <span className="text-[#8C3B2E] text-sm">✦</span>
                {tr(`${route.key}.highlights.${i}` as any)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 text-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1 text-xs font-semibold tracking-[2px] uppercase text-[#8C3B2E] hover:text-[#1F1F1F] transition-colors"
          >
            ← {locale === 'zh' ? '返回首页' : locale === 'th' ? 'กลับหน้าแรก' : 'Back to Home'}
          </Link>
        </div>
      </div>

      {/* Upsell banner */}
      <div className="bg-[#1F1F1F] py-4 px-6 text-center">
        <p className="text-sm leading-relaxed text-[#E8E1D9]/60">
          {tu('text')}
        </p>
      </div>
    </div>
  );
}
