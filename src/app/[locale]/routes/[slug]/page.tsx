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
    image: 'https://images.unsplash.com/photo-uOEN95HcGNI?w=1200&q=80',
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

  return (
    <div className="min-h-screen pt-16">
      <div className="relative h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${route.image})` }}
        />
        <div className="absolute inset-0 bg-stone-950/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {tr(`${route.key}.name` as any)}
            </h1>
            <p className="text-amber-400 text-xl">{tr(`${route.key}.tagline` as any)}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-amber-400 font-medium mb-4">{tr(`${route.key}.duration` as any)}</p>
          <p className="text-stone-300 text-lg leading-relaxed">
            {tr(`${route.key}.description` as any)}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-amber-400 mb-6">
            {locale === 'zh' ? '行程亮点' : locale === 'th' ? 'ไฮไลท์' : 'Highlights'}
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {([0, 1, 2, 3] as const).map((i) => (
              <li key={i} className="flex items-center gap-3 text-stone-300 bg-stone-900 rounded-lg p-4 border border-stone-800">
                <span className="text-amber-400 text-lg">✦</span>
                {tr(`${route.key}.highlights.${i}` as any)}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 text-center">
          <Link
            href={`/${locale}`}
            className="inline-block border border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg transition-colors"
          >
            {locale === 'zh' ? '← 返回首页' : locale === 'th' ? '← กลับหน้าแรก' : '← Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
