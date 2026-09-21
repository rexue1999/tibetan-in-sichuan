import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { publishedReviews, hasRatings, averageRating, reviewText } from '../../../content/reviews';
import { SITE_URL, buildLocalizedAlternates } from '../../../lib/seo';

const ROUTE_LABELS: Record<string, string> = {
  'tibetan-walk-chengdu': 'Chengdu Tibetan Walking Tour',
  'go-west-go-tibet': 'Highland Roads & Temple Views',
  'tibetan-nomad': 'Nomad Between Earth & Sky',
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'seoPagesExtra' });
  const title = t('reviewsTitle');
  const description = t('reviewsDesc');

  return {
    title,
    description,
    alternates: buildLocalizedAlternates(locale, '/reviews'),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/reviews`,
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
    // Keep the page out of the index while there is nothing on it — an empty
    // page dilutes site quality signals.
    robots: publishedReviews.length ? { index: true, follow: true } : { index: false, follow: true },
  };
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6L2.5 9.5l6.6-.9L12 2.5z"
            fill={n <= rating ? '#BA7517' : 'none'}
            stroke={n <= rating ? '#BA7517' : '#D3D1C7'}
            strokeWidth="1.3"
          />
        </svg>
      ))}
    </div>
  );
}

export default async function ReviewsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'reviews' });
  const avg = averageRating();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('title'),
        item: `${SITE_URL}/${locale}/reviews`,
      },
    ],
  };

  // Review schema is only emitted once real reviews exist. Publishing
  // AggregateRating with no underlying reviews is a structured-data violation.
  const reviewJsonLd =
    publishedReviews.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          '@id': `${SITE_URL}/#organization`,
          name: 'Chengdu Journeys',
          ...(hasRatings && avg !== null
            ? {
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: avg,
                  reviewCount: publishedReviews.filter((r) => typeof r.rating === 'number').length,
                  bestRating: 5,
                  worstRating: 1,
                },
              }
            : {}),
          review: publishedReviews.map((r) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: r.name },
            datePublished: r.dateISO,
            ...(typeof r.rating === 'number'
              ? {
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: r.rating,
                    bestRating: 5,
                    worstRating: 1,
                  },
                }
              : {}),
            reviewBody: reviewText(r, 'en'),
          })),
        }
      : null;

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
          {hasRatings && avg !== null && (
            <div className="mt-8 inline-flex items-center gap-3">
              <Stars rating={avg} />
              <span className="text-sm text-stone-600">
                {avg} / 5 · {publishedReviews.length}
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          {publishedReviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm leading-relaxed text-stone-500 max-w-md mx-auto mb-8">
                {t('empty')}
              </p>
              <Link
                href={`/${locale}/booking`}
                className="inline-flex items-center justify-center px-8 py-3 text-xs font-medium tracking-[2px] uppercase rounded-sm border border-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white transition-colors"
              >
                {t('emptyCta')}
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {publishedReviews.map((r) => (
                <blockquote
                  key={r.id}
                  className="bg-[#F5F2ED] rounded-sm p-7 md:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <div>
                      <div className="text-sm font-medium">{r.name}</div>
                      <div className="text-[10px] tracking-[2px] uppercase text-stone-400 mt-1">
                        {r.country} · {r.date}
                      </div>
                    </div>
                    {typeof r.rating === 'number' && <Stars rating={r.rating} />}
                  </div>

                  <p className="text-sm leading-[1.9] text-stone-600 mb-5 whitespace-pre-line">
                    {reviewText(r, locale)}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[10px] tracking-[2px] uppercase text-stone-400">
                    {r.verified && (
                      <span className="inline-flex items-center gap-1.5 text-[#0F6E56]">
                        <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M20 6L9 17l-5-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {t('verified')}
                      </span>
                    )}
                    {r.route && (
                      <span>
                        {t('routeLabel')}: {ROUTE_LABELS[r.route] ?? r.route}
                      </span>
                    )}
                  </div>
                </blockquote>
              ))}
            </div>
          )}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {reviewJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
        />
      )}
    </>
  );
}
