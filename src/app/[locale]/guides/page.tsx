import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { guides } from '../../../content/guides';
import { SITE_URL, buildLocalizedAlternates } from '../../../lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'seoPagesExtra' });
  const g = await getTranslations({ locale, namespace: 'guideIndex' });

  const title = t('guidesIndexTitle');
  const description = t('guidesIndexDesc');

  return {
    title,
    description,
    alternates: buildLocalizedAlternates(locale, '/guides'),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/guides`,
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

export default async function GuidesIndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'guideIndex' });
  const tg = await getTranslations({ locale, namespace: 'guides' });

  // Breadcrumb schema for the hub page.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('title'),
        item: `${SITE_URL}/${locale}/guides`,
      },
    ],
  };

  // An ItemList helps Google understand this is a curated collection.
  const listJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: guides.map((guide, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/${locale}/guides/${guide.slug}`,
      name: tg(`${guide.slug}.title` as any),
    })),
  };

  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-[#D9D0C5]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] tracking-[3px] uppercase text-stone-500 mb-4 block">
            {t('label')}
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-[-0.5px] leading-tight mb-6">
            {t('title')}
          </h1>
          <p className="text-base leading-relaxed text-stone-600 max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-10 md:gap-12">
            {guides.map((guide) => (
              <article key={guide.slug} className="grid md:grid-cols-[280px_1fr] gap-6 items-start">
                <Link
                  href={`/${locale}/guides/${guide.slug}`}
                  className="block overflow-hidden rounded-sm bg-stone-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={guide.image}
                    alt={tg(`${guide.slug}.title` as any)}
                    className="w-full h-[190px] object-cover hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                </Link>
                <div>
                  <h2 className="text-xl md:text-2xl font-light tracking-[-0.3px] leading-snug mb-3">
                    <Link
                      href={`/${locale}/guides/${guide.slug}`}
                      className="hover:text-[#8C3B2E] transition-colors"
                    >
                      {tg(`${guide.slug}.title` as any)}
                    </Link>
                  </h2>
                  <p className="text-sm text-stone-500 leading-relaxed mb-4">
                    {tg(`${guide.slug}.excerpt` as any)}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] tracking-[2px] uppercase text-stone-400">
                    <span>
                      {guide.minutes} {t('minutes')}
                    </span>
                    <span className="w-px h-3 bg-stone-200" />
                    <span>
                      {t('updated')} {guide.updated}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#F5F2ED] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-medium tracking-[-0.3px] mb-3">{t('ctaTitle')}</h2>
          <p className="text-sm text-stone-500 leading-relaxed mb-8">{t('ctaText')}</p>
          <a
            href="https://wa.me/8619045478878"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 text-xs font-medium tracking-[2px] uppercase rounded-sm border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
          >
            {t('ctaButton')}
          </a>
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
