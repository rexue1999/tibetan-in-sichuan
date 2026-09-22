import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides, getGuide } from '../../../../content/guides';
import { CONTACT } from '../../../../content/company';
import { SITE_URL, buildLocalizedAlternates } from '../../../../lib/seo';

type GuideSection = {
  heading: string;
  body?: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
};

type GuideFaq = { q: string; a: string };

/**
 * Rendered on demand rather than statically prerendered.
 *
 * The parent `[locale]` segment is resolved by middleware, so a static build
 * of this route would have no locale available and `getTranslations` would
 * fall back to request headers — which throws DYNAMIC_SERVER_USAGE. Every
 * other locale-aware page in this app is dynamic for the same reason.
 */
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const guide = getGuide(slug);
  if (!guide) return { title: 'Not Found' };

  const tg = await getTranslations({ locale, namespace: 'guides' });
  const path = `/guides/${slug}`;

  const title = tg(`${slug}.metaTitle` as any);
  const description = tg(`${slug}.metaDesc` as any);

  return {
    title,
    description,
    keywords: guide.keywords,
    alternates: buildLocalizedAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: 'Chengdu Journeys',
      locale:
        locale === 'zh' ? 'zh_CN' : locale === 'es' ? 'es_ES' : locale === 'th' ? 'th_TH' : 'en_US',
      type: 'article',
      publishedTime: guide.published,
      modifiedTime: guide.updated,
      images: [{ url: guide.image, width: 1200, height: 630, alt: tg(`${slug}.title` as any) }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [guide.image],
    },
  };
}

export default async function GuideArticlePage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const guide = getGuide(slug);
  if (!guide) notFound();

  const t = await getTranslations({ locale, namespace: 'guideIndex' });
  const tg = await getTranslations({ locale, namespace: 'guides' });

  const title = tg(`${slug}.title` as any);
  const sections = tg.raw(`${slug}.sections`) as unknown as GuideSection[];
  const faq = tg.raw(`${slug}.faq`) as unknown as GuideFaq[] | undefined;
  const url = `${SITE_URL}/${locale}/guides/${slug}`;

  // Other guides, excluding the one being read.
  const related = guides.filter((g) => g.slug !== slug).slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: tg(`${slug}.excerpt` as any),
    image: `${SITE_URL}${guide.image.split('?')[0]}`,
    datePublished: guide.published,
    dateModified: guide.updated,
    inLanguage: locale,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Chengdu Journeys',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Chengdu Journeys',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('label'),
        item: `${SITE_URL}/${locale}/guides`,
      },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  };

  // Per-article FAQ schema. Emitting this per page is what lets Google show
  // expandable Q&A directly in the results for long-tail queries.
  const faqJsonLd =
    faq && faq.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null;

  return (
    <>
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${locale}/guides`}
            className="text-[10px] tracking-[2px] uppercase text-stone-400 hover:text-[#8C3B2E] transition-colors inline-block mb-8"
          >
            ← {t('back')}
          </Link>

          <h1 className="text-3xl md:text-4xl font-light tracking-[-0.5px] leading-tight mb-5">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-[10px] tracking-[2px] uppercase text-stone-400 mb-8">
            <span>
              {t('published')} {guide.published}
            </span>
            <span className="w-px h-3 bg-stone-200" />
            <span>
              {t('updated')} {guide.updated}
            </span>
            <span className="w-px h-3 bg-stone-200" />
            <span>
              {guide.minutes} {t('minutes')}
            </span>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={guide.image}
            alt={title}
            className="w-full h-[300px] md:h-[380px] object-cover rounded-sm mb-12"
          />

          <p className="text-base leading-relaxed text-stone-600 italic border-l-2 border-[#8C3B2E]/30 pl-5 mb-12">
            {tg(`${slug}.excerpt` as any)}
          </p>

          <div className="space-y-12">
            {sections.map((section, i) => (
              <section key={i} id={`s${i + 1}`}>
                <h2 className="text-xl md:text-2xl font-medium tracking-[-0.3px] mb-4">
                  {section.heading}
                </h2>

                {section.body?.map((paragraph, j) => (
                  <p key={j} className="text-sm leading-[1.9] text-stone-600 mb-4">
                    {paragraph}
                  </p>
                ))}

                {section.list && (
                  <ul className="my-5 space-y-2.5">
                    {section.list.map((item, j) => (
                      <li key={j} className="text-sm leading-relaxed text-stone-600 flex gap-3">
                        <span className="text-[#8C3B2E] mt-[7px] shrink-0 block w-1 h-1 rounded-full bg-current" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-stone-300">
                          {section.table.headers.map((h, j) => (
                            <th
                              key={j}
                              className="text-left py-3 pr-4 text-[10px] tracking-[2px] uppercase text-stone-500 font-medium"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, j) => (
                          <tr key={j} className="border-b border-stone-100">
                            {row.map((cell, k) => (
                              <td
                                key={k}
                                className={`py-3 pr-4 text-stone-600 align-top ${
                                  k === 1 ? 'whitespace-nowrap tabular-nums' : ''
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Per-article FAQ */}
          {faq && faq.length > 0 && (
            <section className="mt-16 pt-12 border-t border-stone-200">
              <h2 className="text-xl md:text-2xl font-medium tracking-[-0.3px] mb-6">
                {t('toc')}
              </h2>
              <div className="divide-y divide-stone-100">
                {faq.map((item, i) => (
                  <details key={i} className="group py-4">
                    <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                      <h3 className="text-sm font-medium leading-relaxed">{item.q}</h3>
                      <span className="text-stone-400 shrink-0 mt-0.5 transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="text-sm leading-relaxed text-stone-500 mt-3 pr-8">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related guides */}
          <section className="mt-16 pt-12 border-t border-stone-200">
            <h2 className="text-sm font-medium tracking-[2px] uppercase text-stone-500 mb-6">
              {t('relatedTitle')}
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/${locale}/guides/${r.slug}`} className="group block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.image}
                    alt={tg(`${r.slug}.title` as any)}
                    className="w-full h-[110px] object-cover rounded-sm mb-3 group-hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                  <h3 className="text-xs leading-snug text-stone-600 group-hover:text-[#8C3B2E] transition-colors">
                    {tg(`${r.slug}.title` as any)}
                  </h3>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 py-10 px-8 bg-[#F5F2ED] rounded-sm text-center">
            <h2 className="text-lg font-medium tracking-[-0.3px] mb-3">{t('ctaTitle')}</h2>
            <p className="text-sm text-stone-500 leading-relaxed mb-6">{t('ctaText')}</p>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-xs font-medium tracking-[2px] uppercase rounded-sm border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
            >
              {t('ctaButton')}
            </a>
          </section>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </>
  );
}
