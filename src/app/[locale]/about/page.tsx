import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { teamMembers, companyFacts, companyValues, CONTACT } from '../../../content/company';
import { SITE_URL, buildLocalizedAlternates } from '../../../lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'seoPagesExtra' });
  const title = t('aboutTitle');
  const description = t('aboutDesc');

  return {
    title,
    description,
    alternates: buildLocalizedAlternates(locale, '/about'),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/about`,
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

/** Initials for the monogram avatar used when no photo is set. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'about' });

  const story = t.raw('story') as unknown as string[];
  const values = t.raw('values') as unknown as Record<string, { title: string; text: string }>;
  const langNames = t.raw('langNames') as unknown as Record<string, string>;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('label'),
        item: `${SITE_URL}/${locale}/about`,
      },
    ],
  };

  // AboutPage schema tied to the site's Organisation entity. Using the same
  // @id as the layout's Organization node keeps the graph connected.
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: t('title'),
    description: t('subtitle'),
    url: `${SITE_URL}/${locale}/about`,
    mainEntity: { '@id': `${SITE_URL}/#organization` },
    inLanguage: locale,
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

      {/* Company facts */}
      <section className="py-16 px-6 bg-white border-b border-stone-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[10px] tracking-[3px] uppercase text-stone-400 text-center mb-10">
            {t('factsTitle')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {companyFacts.map((fact) => (
              <div key={fact.key} className="text-center">
                <div className="text-2xl font-light tracking-[-0.5px] mb-2">{fact.value}</div>
                <div className="text-[10px] tracking-[2px] uppercase text-stone-400">
                  {t(`facts.${fact.key}` as any)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light tracking-[-0.5px] mb-8 text-center">
            {t('storyTitle')}
          </h2>
          {story.map((paragraph, i) => (
            <p key={i} className="text-sm leading-[1.9] text-stone-600 mb-5">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-[#F5F2ED]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light tracking-[-0.5px] mb-12 text-center">
            {t('valuesTitle')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {companyValues.map((v, i) => (
              <div key={v.key} className="bg-white rounded-sm p-7">
                <div className="text-[10px] tracking-[2px] text-[#8C3B2E] mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-base font-medium mb-3">{values[v.key]?.title}</h3>
                <p className="text-sm leading-relaxed text-stone-500">{values[v.key]?.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light tracking-[-0.5px] mb-4 text-center">
            {t('teamTitle')}
          </h2>
          <p className="text-xs text-stone-400 text-center mb-12 max-w-lg mx-auto">{t('teamNote')}</p>

          <div className="grid sm:grid-cols-2 gap-10">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-5"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-[#F5F2ED] border border-stone-200 flex items-center justify-center mx-auto mb-5">
                    <span className="text-2xl font-light text-stone-400">
                      {initials(member.name)}
                    </span>
                  </div>
                )}
                <h3 className="text-base font-medium mb-1">{member.name}</h3>
                <div className="text-[10px] tracking-[2px] uppercase text-[#8C3B2E] mb-4">
                  {member.role}
                </div>
                <p className="text-sm leading-relaxed text-stone-500 mb-4">{member.bio}</p>
                <div className="text-[10px] tracking-[1.5px] uppercase text-stone-400">
                  {t('speaks')}: {member.languages.map((l) => langNames[l] ?? l).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#1F1F1F] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-light tracking-[-0.3px] mb-3 text-[#E8E1D9]">
            {t('ctaTitle')}
          </h2>
          <p className="text-sm text-white/50 leading-relaxed mb-8">{t('ctaText')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center justify-center px-8 py-3 text-xs font-medium tracking-[2px] uppercase rounded-sm bg-[#8C3B2E] text-white hover:bg-[#7a3327] transition-colors"
            >
              {t('ctaButton')}
            </Link>
            <Link
              href={`/${locale}#trips`}
              className="inline-flex items-center justify-center px-8 py-3 text-xs font-medium tracking-[2px] uppercase rounded-sm border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              {t('viewRoutes')}
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
    </>
  );
}
