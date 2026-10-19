import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import RouteCard from '../route-card';
import { routes } from '../../../content/routes';
import { CONTACT } from '../../../content/company';
import { SITE_URL, buildLocalizedAlternates } from '../../../lib/seo';

/**
 * Routes hub — the index page behind the "Explore All Trips" button.
 *
 * Every card on the homepage links from here too, so this page existed only as
 * an anchor (`/#trips`) and the "explore all" button pointed at the section it
 * already sat in. A hub gives that button somewhere to go, gives the nav's
 * "Trips" a real page, and gives crawlers a collection point between the
 * homepage and the three route detail pages.
 *
 * Dynamic for the same reason as the other locale-aware pages: the `[locale]`
 * segment is resolved by middleware, so a static build has no locale to read.
 */
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'seoPagesExtra' });
  const title = t('routesIndexTitle');
  const description = t('routesIndexDesc');

  return {
    title,
    description,
    alternates: buildLocalizedAlternates(locale, '/routes'),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/routes`,
      siteName: 'Chengdu Journeys',
      locale:
        locale === 'zh' ? 'zh_CN' : locale === 'es' ? 'es_ES' : locale === 'th' ? 'th_TH' : 'en_US',
      type: 'website',
      images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.png'],
    },
  };
}

export default async function RoutesIndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const tr = await getTranslations({ locale, namespace: 'routes' });

  const homeLabel =
    locale === 'zh' ? '首页' : locale === 'th' ? 'หน้าแรก' : locale === 'es' ? 'Inicio' : 'Home';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tr('labels.trips' as any),
        item: `${SITE_URL}/${locale}/routes`,
      },
    ],
  };

  // An ItemList tells crawlers this is a curated collection of the three
  // routes, not three unrelated links.
  const listJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: routes.map((route, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/${locale}/routes/${route.slug}`,
      name: tr(`${route.key}.name` as any),
    })),
  };

  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-[#D9D0C5]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-light tracking-[-0.5px] leading-tight mb-6">
            {tr('indexTitle')}
          </h1>
          <p className="text-base leading-relaxed text-stone-600 max-w-xl mx-auto">
            {tr('indexSubtitle')}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {routes.map((route) => (
              <RouteCard key={route.slug} route={route} locale={locale} tr={tr} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#F5F2ED] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-medium tracking-[-0.3px] mb-3">{tr('indexCtaTitle')}</h2>
          <p className="text-sm text-stone-500 leading-relaxed mb-8">{tr('indexCtaText')}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-xs font-medium tracking-[2px] uppercase rounded-sm border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
            >
              {tr('labels.askWA' as any)}
            </a>
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center justify-center px-8 py-3 text-xs font-medium tracking-[2px] uppercase rounded-sm bg-[#1F1F1F] text-[#E8E1D9] hover:bg-[#8C3B2E] transition-all"
            >
              {tr('labels.bookTrip' as any)}
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
      />
    </>
  );
}
