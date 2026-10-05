import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import RouteCard from './route-card';
import HeroCarousel, { type HeroSlide } from './hero-carousel';
import { buildLocalizedAlternates } from '../../lib/seo';
import { guides } from '../../content/guides';
import { publishedReviews, reviewText } from '../../content/reviews';

const routeSlugs = ['tibetan-walk-chengdu', 'go-west-go-tibet', 'tibetan-nomad'];

/**
 * Hero carousel frames, in order. Only the image paths live here; the captions
 * are translated, so they are filled in per locale below.
 *
 * `focus` is the crop anchor. These are 2.7:1 panoramas shown on a 16:9 screen,
 * so the browser crops roughly a third of the width away. `50% 50%` would slice
 * the ridgeline off the Meili shot and push the Potala Palace into the middle
 * of the frame; anchoring higher keeps sky and subject both in view.
 *
 * There is deliberately no per-frame veil. Two rounds of tuning one are
 * documented at the panel below; the short version is that no amount of
 * darkening makes #3A3A3A body text legible over these pictures — at a veil of
 * 1.0, solid black, three of the five frames still measured under 4.5:1. The
 * copy reads against a pale panel instead, which clears 22:1 on the worst of
 * them and needs no per-image tuning at all.
 */
const HERO_FRAMES = [
  { src: '/images/hero-meili.jpg', focus: '50% 46%' },
  { src: '/images/hero-nujiang.jpg', focus: '50% 50%' },
  { src: '/images/hero-potala.jpg', focus: '50% 44%' },
  { src: '/images/hero-chuopu.jpg', focus: '50% 52%' },
  { src: '/images/hero-bingzhongluo.jpg', focus: '50% 50%' },
] as const;

/** Most recent three reviews, newest first. Empty until reviews are added. */
const homeReviews = publishedReviews.slice(0, 3);

/** Three guides to surface on the homepage. */
const homeGuides = guides.slice(0, 3);

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const tp = await getTranslations({ locale, namespace: 'seoPages' });

  const title = tp('homeTitle');
  const description = tp('homeDesc');

  return {
    title,
    description,
    alternates: buildLocalizedAlternates(locale, ''),
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: t('brand'),
      type: 'website',
    },
  };
}

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12">
      <p className="text-[10px] font-semibold tracking-[4px] uppercase text-[#8C3B2E] mb-4">{label}</p>
      <h2 className="text-3xl md:text-5xl font-light tracking-[-0.5px] leading-tight">{title}</h2>
    </div>
  );
}

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const tr = await getTranslations({ locale, namespace: 'routes' });
  const te = await getTranslations({ locale, namespace: 'expect' });
  const tw = await getTranslations({ locale, namespace: 'why' });
  const tg = await getTranslations({ locale, namespace: 'gallery' });
  const tv = await getTranslations({ locale, namespace: 'videos' });
  const tc = await getTranslations({ locale, namespace: 'cta' });
  const tu = await getTranslations({ locale, namespace: 'upsell' });
  const tf = await getTranslations({ locale, namespace: 'faq' });
  const trv = await getTranslations({ locale, namespace: 'reviews' });
  const tgi = await getTranslations({ locale, namespace: 'guideIndex' });
  const tgd = await getTranslations({ locale, namespace: 'guides' });

  /*
    Pair each frame with its translated place name, and pre-render the "slide N
    of M" strings here rather than passing a formatting function down.

    A function cannot cross the server/client boundary: the carousel is a
    client component, so `label={(n, total) => t('slideOf', {n, total})}` fails
    at request time with "Functions cannot be passed directly to Client
    Components" — and the build is perfectly happy beforehand.
  */
  const heroSlides: HeroSlide[] = HERO_FRAMES.map((f, i) => ({
    src: f.src,
    focus: f.focus,
    caption: t(`photo${i + 1}` as any),
  }));
  const heroSlideLabels = HERO_FRAMES.map((_f, i) =>
    t('slideOf', { n: i + 1, total: HERO_FRAMES.length })
  );

  // Site-wide FAQPage schema. Kept here (not in layout.tsx) because these six
  // questions are only rendered on this page — FAQ markup must describe
  // content the user can actually see.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ([1, 2, 3, 4, 5, 6] as const).map((i) => ({
      '@type': 'Question',
      name: tf(`q${i}` as any),
      acceptedAnswer: {
        '@type': 'Answer',
        text: tf(`a${i}` as any),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* ==============================
          HERO
          ============================== */}
      {/*
        The hero was one static photograph at 40% opacity. The photo library
        from the phone backups is far stronger than anything that was on hand,
        and five of the best frames are 2.7:1 panoramas shot on these routes —
        they are wasted in a 13-tile grid. So the backdrop is now a carousel.

        The headline, the two buttons and the ridge line stay exactly where they
        were, and the gradient scrim is unchanged: it is what keeps dark text
        legible over a bright sky. Only the picture behind them moves.

        `z-0` puts the carousel under the scrim (z-10) and the copy (z-20). The
        scrim has to stay ABOVE the images — a veil under the photography
        darkens nothing, and the captions in the corners lose their contrast.
      */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroCarousel
            slides={heroSlides}
            slideLabel={heroSlideLabels}
            previousLabel={t('previousSlide')}
            nextLabel={t('nextSlide')}
          />
        </div>
        {/*
          This veil is much lighter than the one the old static hero needed
          (90%→60%). That figure was compensating for a photograph rendered at
          40% opacity; now the pictures are shown at full strength and this
          only has to hold the contrast steady. Each slide adds its own
          left-weighted wash on top, sized to that photograph — see
          HERO_FRAMES.

          It still has to sit ABOVE the carousel: a veil underneath the images
          darkens nothing, and the corner captions lose their contrast.
        */}
        {/*
          The copy sits on a PALE panel, not on a darkened photograph.

          This went the wrong way twice before it went right. Two rounds of
          per-slide dark veils were spent trying to make #3A3A3A body text
          legible over moving imagery by darkening the picture — and an offline
          alpha-composite model showed why that can never work: at a veil of 1.0,
          i.e. solid black, three of the five frames still measured under 4.5:1.
          The text colour and the frame brightness were fighting each other.

          The brand already had the answer. On the original beige, #E8E1D9, the
          same text measures 26:1; composited over the brightest frame at 80%
          opacity it still measures 22:1. So the veil is pale and nearly opaque
          across the copy, then releases to nothing by 62% so the photograph is
          untouched where there is no text. The `photo/scrim` field is gone from
          HERO_FRAMES — one value for all five frames, because the panel is what
          makes them all legible, not the darkness behind it.

          It must sit ABOVE the carousel: underneath, it would tint nothing and
          the corner captions would lose their contrast.
        */}
        <div
          className="absolute inset-y-0 left-0 z-10"
          style={{
            width: '62%',
            background:
              'linear-gradient(90deg, rgba(232,225,217,0.94) 0%, rgba(232,225,217,0.9) 46%, rgba(232,225,217,0.62) 74%, rgba(232,225,217,0) 100%)',
          }}
        />
        <div className="relative z-20 px-6 max-w-6xl mx-auto w-full pt-24 pb-20">
          <p className="text-[10px] font-semibold tracking-[5px] uppercase text-[#8C3B2E] mb-7">
            {t('brand')}
          </p>
          <h1 className="text-4xl md:text-7xl font-light tracking-[-1px] leading-[1.05] text-[#1F1F1F] max-w-2xl mb-7">
            {t.rich('title', {
              em: (chunks) => <em className="not-italic text-[#8C3B2E] block">{chunks}</em>,
            }) ?? t('title')}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-[#3A3A3A] max-w-lg mb-10">
            {t('subtitle')}
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href={`/${locale}#trips`}
              className="inline-flex items-center gap-2 bg-[#1F1F1F] text-[#E8E1D9] px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:bg-[#8C3B2E] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#8C3B2E]/20"
            >
              {t('cta')} →
            </Link>
            <Link
              href={`/${locale}#why`}
              className="inline-flex items-center gap-2 border border-[#1F1F1F] text-[#1F1F1F] px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:bg-[#1F1F1F] hover:text-[#E8E1D9] transition-all"
            >
              {t('learnMore')}
            </Link>
          </div>
        </div>
        {/*
          The decorative SVG ridgeline that used to sit here is gone.

          It was drawn at 7% opacity to be almost invisible over a single
          40%-opacity photograph. Over full-strength photography that reasoning
          stopped holding, and it read as a second image showing through: a row
          of hard-edged triangular peaks lying across the bottom of the frame,
          plainly not part of the landscape behind it. On the Bingzhongluo
          forest frame — pale mist, low contrast — it was the most obvious thing
          on the screen.

          A backdrop made of real photographs does not need a drawn mountain
          range. The genuine ridgeline in the picture is the one worth keeping.
        */}
      </section>

      {/* ==============================
          NOT WHAT YOU EXPECT
          ============================== */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] font-semibold tracking-[4px] uppercase text-[#8C3B2E] mb-5">{te('label')}</p>
              <h2 className="text-3xl md:text-5xl font-light tracking-[-0.5px] leading-tight mb-6">{te('title')}</h2>
              <p className="text-base leading-relaxed text-stone-500 max-w-md">{te('text')}</p>
            </div>
            <div
              className="aspect-[4/5] rounded-sm relative overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/wuhouhengjie.jpg)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/10" />
              <span className="absolute bottom-4 left-4 text-[9px] tracking-[2px] uppercase text-white/80">Wuhou Hengjie, Chengdu</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          PRODUCT TIERS
          ============================== */}
      <section id="trips" className="py-24 md:py-32 px-6 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle label={tr('subtitle')} title={tr('title')} />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {routeSlugs.map((slug, i) => (
              <RouteCard
                key={slug}
                slug={slug}
                locale={locale}
                routeKey={`route${i + 1}` as 'route1' | 'route2' | 'route3'}
                tr={tr}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href={`/${locale}#trips`}
              className="inline-flex items-center gap-2 bg-[#1F1F1F] text-[#E8E1D9] px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:bg-[#8C3B2E] transition-all"
            >
              {tr('ctaAll')} →
            </Link>
          </div>
        </div>
      </section>

      {/* ==============================
          WHY US
          ============================== */}
      <section id="why" className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle label={tw('label')} title={tw('title')} />
          <div className="grid md:grid-cols-2 mt-12">
            {(['item1', 'item2', 'item3', 'item4'] as const).map((item, i) => (
              <div
                key={item}
                className={`flex gap-6 p-10 ${i > 1 ? '' : 'border-b'} ${i % 2 === 1 ? 'md:border-l' : ''} border-black/5`}
              >
                <span className="text-2xl font-light text-[#8C3B2E] leading-none pt-1">0{i + 1}</span>
                <div>
                  <h4 className="text-base font-medium mb-2">{tw(`${item}.title` as any)}</h4>
                  <p className="text-sm leading-relaxed text-stone-500">{tw(`${item}.text` as any)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          GALLERY
          ============================== */}
      <section id="gallery" className="py-24 md:py-32 px-6 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto">
          <SectionTitle label={tg('label')} title={tg('title')} />
          {/*
            Row heights must be declared for EVERY row the tiles need, at every
            breakpoint — not just the ones the desktop grid happens to use.

            The lead tile spans two columns, so the tile count and the row count
            differ by breakpoint: 4 columns need 4 rows for 13 tiles (1 lead
            occupying 2x2, plus 12), while 2 columns need 7. `gridTemplateRows`
            only declares the first four; the remaining rows are implicit, and an
            implicit row over an empty div has height 0. The last six photos were
            therefore invisible on phones — invisible, not missing, which is why
            the HTML check passed and the screenshot had to be looked at.

            `auto-rows` covers the implicit rows at the phone breakpoint, and
            `md:grid-rows-[repeat(4,240px)]` restores the fixed-height desktop
            grid, where every tile is exactly one row tall.
          */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 auto-rows-[168px] md:auto-rows-auto md:grid-rows-[repeat(4,240px)]">
            <div
              className="md:row-span-2 col-span-2 rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/litang.jpg?v=2)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/20" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption1')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/gongga.jpg?v=2)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/15" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption2')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/tagong.jpg?v=2)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/15" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption3')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/serda.jpg)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/20" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption4')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/grassland.jpg)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/15" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption5')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/lakes.jpg)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/15" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption6')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/yading.jpg)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/15" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption7')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/danba.jpg)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/15" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption8')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/muya.jpg)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/15" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption9')}</span>
            </div>
            {/*
              Four more tiles, added once real photographs of the Yunnan and
              Lhasa legs came out of the drive. The grid above is nine frames of
              Sichuan and western Sichuan, which made the site read as a single
              region; these four give the gallery a second and third country in
              it. Four rows, not three, because the lead tile takes a 2x2 block
              and 12 small tiles fill the remaining twelve cells exactly.
            */}
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/erhai-cangshan.jpg?v=1)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/15" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption10')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/meili-sunrise.jpg?v=1)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/15" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption11')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/potala-panorama.jpg?v=1)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/15" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption12')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/lugu-lake.jpg?v=1)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/15" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption13')}</span>
            </div>
          </div>

          {/* Video strip */}
          <div className="mt-16">
            <SectionTitle label={tv('label')} title={tv('title')} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <video
              className="w-full h-[240px] object-cover rounded-sm"
              style={{ objectPosition: 'center 65%' }}
              src="/videos/horses.mp4"
              autoPlay muted loop playsInline preload="metadata"
            />
            <video
              className="w-full h-[240px] object-cover rounded-sm"
              style={{ objectPosition: 'center 60%' }}
              src="/videos/marmot.mp4"
              autoPlay muted loop playsInline preload="metadata"
            />
            <video
              className="w-full h-[240px] object-cover rounded-sm"
              src="/videos/peaks.mp4"
              autoPlay muted loop playsInline preload="metadata"
            />
          </div>
        </div>
      </section>

      {/* ==============================
          REVIEWS STRIP
          Renders only once at least one real review is published.
          ============================== */}
      {homeReviews.length > 0 && (
        <section id="reviews" className="py-24 md:py-32 px-6 bg-[#F5F2ED]">
          <div className="max-w-5xl mx-auto">
            <SectionTitle label={trv('label')} title={trv('homeTitle')} />
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {homeReviews.map((r) => (
                <blockquote key={r.id} className="bg-white rounded-sm p-7 flex flex-col">
                  {typeof r.rating === 'number' && (
                    <div className="flex gap-0.5 mb-4" aria-label={`${r.rating} / 5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <svg key={n} width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6L2.5 9.5l6.6-.9L12 2.5z"
                            fill={n <= r.rating! ? '#BA7517' : 'none'}
                            stroke={n <= r.rating! ? '#BA7517' : '#D3D1C7'}
                            strokeWidth="1.3"
                          />
                        </svg>
                      ))}
                    </div>
                  )}
                  <p className="text-sm leading-[1.9] text-stone-600 mb-6 flex-1">
                    {reviewText(r, locale)}
                  </p>
                  <footer className="text-[10px] tracking-[2px] uppercase text-stone-400">
                    {r.name} · {r.country}
                  </footer>
                </blockquote>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href={`/${locale}/reviews`}
                className="text-xs tracking-[2px] uppercase text-stone-400 hover:text-[#8C3B2E] transition-colors"
              >
                {trv('readMore')} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ==============================
          GUIDES TEASER
          Drives internal links to the guide hub, which is where most
          long-tail search traffic lands.
          ============================== */}
      <section id="guides" className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionTitle label={tgi('label')} title={tgi('title')} />
          <div className="grid md:grid-cols-3 gap-8">
            {homeGuides.map((g) => (
              <Link key={g.slug} href={`/${locale}/guides/${g.slug}`} className="group block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.image}
                  alt={tgd(`${g.slug}.title` as any)}
                  className="w-full h-[180px] object-cover rounded-sm mb-4 group-hover:opacity-90 transition-opacity"
                  loading="lazy"
                />
                <h3 className="text-base font-normal leading-snug mb-2 group-hover:text-[#8C3B2E] transition-colors">
                  {tgd(`${g.slug}.title` as any)}
                </h3>
                <p className="text-xs leading-relaxed text-stone-500">
                  {tgd(`${g.slug}.excerpt` as any)}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/guides`}
              className="text-xs tracking-[2px] uppercase text-stone-400 hover:text-[#8C3B2E] transition-colors"
            >
              {tgi('back')} →
            </Link>
          </div>
        </div>
      </section>

      {/* ==============================
          FAQ
          ============================== */}
      <section id="faq" className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionTitle label={tf('label')} title={tf('title')} />
          <dl className="mt-12 divide-y divide-black/5 border-t border-black/5">
            {([1, 2, 3, 4, 5, 6] as const).map((i) => (
              <details key={i} className="group py-6">
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                  <dt className="text-base md:text-lg font-normal text-[#1F1F1F] leading-snug">
                    {tf(`q${i}` as any)}
                  </dt>
                  <span className="text-[#8C3B2E] text-xl leading-none transition-transform group-open:rotate-45 shrink-0 pt-1">
                    +
                  </span>
                </summary>
                <dd className="mt-4 text-sm md:text-base leading-relaxed text-stone-500 pr-10">
                  {tf(`a${i}` as any)}
                </dd>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* ==============================
          CTA CONVERSION
          ============================== */}
      <section id="contact" className="py-24 md:py-32 px-6 bg-[#1F1F1F] text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] font-semibold tracking-[4px] uppercase text-[#B85C4E] mb-5">{tc('label')}</p>
          <h2 className="text-3xl md:text-5xl font-light tracking-[-0.5px] leading-tight text-[#E8E1D9] mb-6">{tc('title')}</h2>
          <p className="text-base leading-relaxed text-white/60 mb-10">{tc('text')}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center gap-2 bg-[#E8E1D9] text-[#1F1F1F] px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:bg-white transition-all hover:-translate-y-0.5"
            >
              {tc('book')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Upsell banner */}
      <div className="bg-[#1F1F1F] border-t border-white/5 py-4 px-6 text-center">
        <p className="text-sm leading-relaxed text-white/60">
          {tu('text')}
        </p>
      </div>
    </>
  );
}
