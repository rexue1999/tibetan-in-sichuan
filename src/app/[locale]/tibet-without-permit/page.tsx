import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { SITE_URL, buildLocalizedAlternates } from '../../../lib/seo';

/**
 * /tibet-without-permit — the standalone answer to the one question this
 * business can answer and TAR operators cannot.
 *
 * The homepage makes the argument; this page exists because nobody searching
 * "can you visit Tibet without a permit" arrives at a homepage. It is written
 * to be the page that answers that query and then earns the click, which means
 * it has to survive a sceptical reader who has already been told by three other
 * sites that Tibet is closed to them.
 *
 * Three rules govern the layout:
 *
 *   1. The answer comes first and is three sentences long. Everything below is
 *      the evidence for it, not a build-up to it.
 *   2. What you lose is stated as plainly as what you get. A page that only
 *      sells is read as an advert; a page that names Lhasa, Everest and
 *      Kailash as things you are giving up is read as information.
 *   3. The FAQ is static markup, not a collapsed accordion. The answers are the
 *      part that should rank, and content behind a click is worth less to a
 *      crawler than content in the document.
 */

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'permitPage' });
  const title = t('seo.title');
  const description = t('seo.desc');

  return {
    title,
    description,
    alternates: buildLocalizedAlternates(locale, '/tibet-without-permit'),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/tibet-without-permit`,
      siteName: 'Chengdu Journeys',
      locale:
        locale === 'zh' ? 'zh_CN' : locale === 'es' ? 'es_ES' : locale === 'th' ? 'th_TH' : 'en_US',
      type: 'article',
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

type Card = {
  cn: string;
  rom: string;
  where: string;
  status: string;
  state: 'closed' | 'open' | 'split';
  text: string;
};
type Item = { n: string; title: string; text: string };
type Place = { name: string; meta: string; text: string };
type Faq = { q: string; a: string };

const DARK = '#1F1F1F';
const BONE = '#E8E1D9';
const BRICK = '#8C3B2E';
const STONE = '#9C948B';

const eyebrow = 'text-[10px] font-semibold tracking-[4px] uppercase text-[#8C3B2E] mb-5';
const h2 = 'text-3xl md:text-4xl font-light tracking-[-0.5px] leading-[1.14] max-w-2xl';
const lede = 'text-base md:text-lg leading-relaxed text-stone-500 max-w-2xl mt-5';

const rule: Record<Card['state'], string> = {
  closed: STONE,
  open: BRICK,
  split: `linear-gradient(90deg, ${STONE} 0 50%, ${BRICK} 50% 100%)`,
};
const status: Record<Card['state'], string> = {
  closed: 'text-stone-500',
  open: 'text-[#8C3B2E]',
  split: 'text-stone-600',
};

export default async function PermitPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'permitPage' });

  const answer = t.raw('answer.items') as string[];
  const cards = t.raw('regions.cards') as Card[];
  const barriers = t.raw('barriers.items') as Item[];
  const limits = t.raw('limits.items') as string[];
  const places = t.raw('instead.items') as Place[];
  const tableRows = t.raw('table.rows') as { k: string; tar: string; kham: string }[];
  const tableHead = t.raw('table.head') as string[];
  const practical = t.raw('practical.items') as Item[];
  const faqs = t.raw('faq.items') as Faq[];

  const url = `${SITE_URL}/${locale}/tibet-without-permit`;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t('breadcrumb'), item: url },
    ],
  };

  /*
    FAQPage markup is only valid if the same questions and answers are visible
    on the page — Google treats a mismatch as spam. Both come from the same
    `faqs` array below, so they cannot diverge.
  */
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ---------------- hero ---------------- */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 bg-[#F5F2ED]">
        <div className="max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-[10px] tracking-[2px] uppercase mb-10">
            <Link href={`/${locale}`} className="text-stone-500 hover:text-[#8C3B2E] transition-colors">
              {t('home')}
            </Link>
            <span className="text-stone-400 mx-3">/</span>
            <span className="text-stone-500">{t('breadcrumb')}</span>
          </nav>

          <p className={eyebrow}>{t('hero.kicker')}</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-[-1px] leading-[1.06]">
            {t('hero.title')}
          </h1>
          <p className={lede}>{t('hero.lede')}</p>
        </div>
      </section>

      {/* ---------------- the three-line answer ---------------- */}
      <section id="answer" className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className={eyebrow}>{t('answer.label')}</p>
          <ol className="space-y-8 mt-2">
            {answer.map((line, i) => (
              <li key={i} className="flex gap-6">
                <span className="text-sm text-[#8C3B2E] font-medium pt-1 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-base md:text-lg leading-relaxed text-stone-700">{line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- the map ---------------- */}
      <section id="map" className="py-16 md:py-24 px-6 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto">
          <p className={eyebrow}>{t('regions.label')}</p>
          <h2 className={h2}>{t('regions.title')}</h2>
          <p className={lede}>{t('regions.lede')}</p>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10 mt-14">
            {cards.map((c) => (
              <article key={c.rom}>
                <span aria-hidden className="block h-[2px] w-full mb-7" style={{ background: rule[c.state] }} />
                <h3 className="text-2xl font-light">
                  <span className="mr-2">{c.cn}</span>
                  <span className="text-stone-400 text-base">{c.rom}</span>
                </h3>
                <p className="text-[11px] tracking-[1.5px] uppercase text-stone-400 mt-2">{c.where}</p>
                <p className="text-sm leading-relaxed text-stone-600 mt-5">{c.text}</p>
                <p
                  className={`mt-6 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[2.5px] uppercase ${status[c.state]}`}
                >
                  <span aria-hidden className="w-1.5 h-1.5 rounded-full" style={{ background: rule[c.state] }} />
                  {c.status}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- the barriers ---------------- */}
      <section id="barriers" className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className={eyebrow}>{t('barriers.label')}</p>
          <h2 className={h2}>{t('barriers.title')}</h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 mt-14">
            {barriers.map((b) => (
              <div key={b.n} className="border-t border-black/10 pt-6">
                <span className="text-[11px] tracking-[2px] text-[#8C3B2E] tabular-nums">{b.n}</span>
                <h3 className="text-lg font-medium mt-3 mb-2">{b.title}</h3>
                <p className="text-sm leading-relaxed text-stone-600">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*
        The honest list. This is the block that decides whether the rest is
        believed: it is the only place on the site that tells the reader what
        they are *not* getting, and it is styled to feel like a concession
        rather than a sell.
      */}
      <section id="limits" className="py-16 md:py-24 px-6" style={{ background: DARK }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] font-semibold tracking-[4px] uppercase mb-5" style={{ color: '#C97F6B' }}>
            {t('limits.label')}
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-[-0.5px] leading-[1.14]" style={{ color: BONE }}>
            {t('limits.title')}
          </h2>
          <p className="text-base leading-relaxed mt-5 max-w-xl" style={{ color: `${BONE}a6` }}>
            {t('limits.lede')}
          </p>

          <ul className="mt-12 space-y-5">
            {limits.map((l, i) => (
              <li key={i} className="flex gap-5 text-[15px] leading-relaxed" style={{ color: BONE }}>
                <span aria-hidden className="mt-[10px] w-4 h-px shrink-0" style={{ background: '#C97F6B' }} />
                {l}
              </li>
            ))}
          </ul>

          <p
            className="mt-12 pt-8 text-sm leading-relaxed border-t max-w-xl"
            style={{ color: `${BONE}b3`, borderColor: '#ffffff1a' }}
          >
            {t('limits.note')}
          </p>
        </div>
      </section>

      {/* ---------------- what is on this side ---------------- */}
      <section id="instead" className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className={eyebrow}>{t('instead.label')}</p>
          <h2 className={h2}>{t('instead.title')}</h2>
          <p className={lede}>{t('instead.lede')}</p>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 mt-14">
            {places.map((p) => (
              <div key={p.name} className="border-t border-black/10 pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-medium">{p.name}</h3>
                  <span className="text-[10px] tracking-[1.5px] uppercase text-stone-400 shrink-0">{p.meta}</span>
                </div>
                <p className="text-sm leading-relaxed text-stone-600 mt-2">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- side by side ---------------- */}
      <section id="compare" className="py-16 md:py-24 px-6 bg-[#F5F2ED]">
        <div className="max-w-5xl mx-auto">
          <p className={eyebrow}>{t('table.label')}</p>
          <h2 className={h2}>{t('table.title')}</h2>

          {/*
            A real <table>, but displayed as stacked blocks below `md`.

            Three columns inside 390 px leaves the right-hand column wrapping
            every two or three characters — technically no overflow, and
            completely unreadable, which is what the screenshot showed. Below
            `md` the header row is hidden and each cell prints its own column
            name from `data-label`, so the reader still knows which side of the
            border they are looking at. The table element stays for semantics;
            the labels are CSS content, so nothing is duplicated in the DOM.
          */}
          <div className="mt-12 max-md:mt-8">
            <table className="w-full text-left border-collapse max-md:block">
              <thead className="max-md:hidden">
                <tr className="border-b border-black/15">
                  <th className="py-4 pr-4 text-[10px] tracking-[2px] uppercase text-stone-400 font-semibold w-1/4" />
                  <th className="py-4 px-4 text-[10px] tracking-[2px] uppercase text-stone-500 font-semibold">
                    {tableHead[1]}
                  </th>
                  <th className="py-4 pl-6 text-[10px] tracking-[2px] uppercase text-[#8C3B2E] font-semibold border-l-2 border-[#8C3B2E]">
                    {tableHead[2]}
                  </th>
                </tr>
              </thead>
              <tbody className="max-md:block">
                {tableRows.map((r) => (
                  <tr
                    key={r.k}
                    className="border-b border-black/5 align-top max-md:block max-md:py-5"
                  >
                    <th
                      scope="row"
                      className="py-4 pr-4 text-sm font-medium text-stone-700 max-md:block max-md:py-0 max-md:pb-2 max-md:pr-0"
                    >
                      {r.k}
                    </th>
                    <td
                      data-label={tableHead[1]}
                      className="py-4 px-4 text-sm text-stone-500 leading-relaxed max-md:block max-md:px-0 max-md:py-0 max-md:before:mb-1 max-md:before:block max-md:before:text-[9px] max-md:before:tracking-[2px] max-md:before:uppercase max-md:before:text-stone-400 max-md:before:content-[attr(data-label)]"
                    >
                      {r.tar}
                    </td>
                    <td
                      data-label={tableHead[2]}
                      className="py-4 pl-6 text-sm text-stone-700 leading-relaxed border-l-2 border-[#8C3B2E] max-md:mt-2 max-md:block max-md:border-l-0 max-md:pl-0 max-md:before:mb-1 max-md:before:block max-md:before:text-[9px] max-md:before:tracking-[2px] max-md:before:uppercase max-md:before:text-[#8C3B2E] max-md:before:content-[attr(data-label)]"
                    >
                      {r.kham}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------------- practical ---------------- */}
      <section id="practical" className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className={eyebrow}>{t('practical.label')}</p>
          <h2 className={h2}>{t('practical.title')}</h2>

          <div className="mt-12 space-y-10">
            {practical.map((s) => (
              <div key={s.n} className="flex gap-6">
                <span className="text-3xl font-light text-stone-300 leading-none tabular-nums">{s.n}</span>
                <div>
                  <h3 className="text-base font-medium mb-2">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-stone-600">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section id="faq" className="py-16 md:py-24 px-6 bg-[#F5F2ED]">
        <div className="max-w-3xl mx-auto">
          <p className={eyebrow}>{t('faq.label')}</p>
          <h2 className={h2}>{t('faq.title')}</h2>

          <dl className="mt-12 space-y-8">
            {faqs.map((f) => (
              <div key={f.q} className="border-t border-black/10 pt-6">
                <dt className="text-base font-medium leading-snug">{f.q}</dt>
                <dd className="text-sm leading-relaxed text-stone-600 mt-3">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- cta ---------------- */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-[-0.5px] leading-[1.14]">{t('cta.title')}</h2>
          <p className="text-base leading-relaxed text-stone-500 mt-5 max-w-xl mx-auto">{t('cta.text')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href={`/${locale}/routes`}
              className="inline-flex items-center gap-2 bg-[#1F1F1F] text-[#E8E1D9] px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:bg-[#8C3B2E] transition-colors"
            >
              {t('cta.primary')}
            </Link>
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center gap-2 border border-[#1F1F1F] text-[#1F1F1F] px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:bg-[#1F1F1F] hover:text-[#E8E1D9] transition-colors"
            >
              {t('cta.secondary')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
