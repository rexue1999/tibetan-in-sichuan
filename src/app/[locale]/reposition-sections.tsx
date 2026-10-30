import { getTranslations } from 'next-intl/server';
import { teamMembers } from '../../content/company';

/**
 * The repositioning blocks.
 *
 * The homepage used to open with a hero and go straight into a product grid,
 * with four generic reasons ("small groups", "local insight") standing in for
 * an argument. Nothing on it said *why* a traveller should come to Sichuan
 * rather than to Tibet proper — which is the only question that matters for
 * this product. These four blocks answer it in order:
 *
 *   ThreeRegionsSection — the plateau is three cultures, not one
 *   PermitSection  — the four barriers to the Tibet Autonomous Region
 *   CompareSection — the same plateau, two different rulebooks
 *   LandSection    — what is actually out there, named and dated
 *   WhoSection     — the two people who take you
 *
 * They are server components: all copy comes from `messages/*.json`, so the
 * four locales cannot drift apart.
 */

type Fact = { n: string; title: string; text: string };
type CompareRow = { k: string; tar: string; kham: string };
type LandItem = { name: string; meta: string; text: string };
type RegionCard = {
  cn: string;
  rom: string;
  where: string;
  text: string;
  status: string;
  state: 'closed' | 'open' | 'split';
};

const eyebrow =
  'text-[10px] font-semibold tracking-[4px] uppercase text-[#8C3B2E] mb-5';
const h2 =
  'text-3xl md:text-5xl font-light tracking-[-0.5px] leading-[1.12] max-w-3xl';
const lede = 'text-base md:text-lg leading-relaxed text-stone-500 max-w-2xl mt-6';

/*
  Accent colours for the dark block. #8C3B2E — the brick used everywhere else —
  measures 2.2:1 on #1F1F1F, so it cannot carry text here. These two are the
  same hue lifted until they clear 4.5:1 against the dark ground.
*/
const DARK = '#1F1F1F';
const BONE = '#E8E1D9';
const BRICK_ON_DARK = '#C97F6B';

/**
 * Three regions, one of which is behind the permit.
 *
 * This block exists because the whole positioning collapses without it. "Tibet
 * without the permit" reads as "not really Tibet" to anyone who has not
 * thought about how the plateau is divided, and that suspicion is fatal on a
 * page whose entire job is trust. So before the permit section argues anything,
 * this one corrects the map: Ü-Tsang, Amdo and Kham are three cultures that
 * have been distinct for a millennium, and the permit is issued for an
 * administrative border that cuts across two of them.
 *
 * The three cards are marked with a two-pixel rule rather than a written
 * legend, because the split card has to *look* split. Kham is the one region
 * that is administered on both sides of the line — Chamdo needs the permit,
 * Garzê does not — and that single fact is the strongest answer to the
 * "substitute Tibet" objection available anywhere on this site.
 */
export async function ThreeRegionsSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'three' });
  const cards = t.raw('cards') as RegionCard[];

  const rule: Record<RegionCard['state'], string> = {
    closed: 'rgba(232,225,217,0.22)',
    open: BRICK_ON_DARK,
    // Half brick, half ground: the border runs through this one.
    split: `linear-gradient(90deg, ${BRICK_ON_DARK} 0%, ${BRICK_ON_DARK} 50%, rgba(232,225,217,0.22) 50%, rgba(232,225,217,0.22) 100%)`,
  };
  const statusColor: Record<RegionCard['state'], string> = {
    closed: 'rgba(232,225,217,0.62)',
    open: BRICK_ON_DARK,
    split: BRICK_ON_DARK,
  };

  return (
    <section
      id="three"
      className="py-24 md:py-32 px-6 scroll-mt-16"
      style={{ background: DARK, color: BONE }}
    >
      <div className="max-w-7xl mx-auto">
        <p
          className="text-[10px] font-semibold tracking-[4px] uppercase mb-5"
          style={{ color: BRICK_ON_DARK }}
        >
          {t('label')}
        </p>
        <h2 className="text-3xl md:text-5xl font-light tracking-[-0.5px] leading-[1.14] max-w-4xl">
          {t('title')}
        </h2>
        <p
          className="text-base md:text-lg leading-relaxed max-w-3xl mt-6"
          style={{ color: 'rgba(232,225,217,0.72)' }}
        >
          {t('lede')}
        </p>

        <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 mt-16">
          {cards.map((c) => (
            <article key={c.rom} className="flex flex-col h-full">
              <span
                aria-hidden
                className="block h-[3px] w-full mb-7"
                style={{ background: rule[c.state] }}
              />
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="text-2xl md:text-[28px] font-light leading-none">
                  {c.cn}
                </h3>
                <span
                  className="text-[10px] tracking-[3px] uppercase"
                  style={{ color: 'rgba(232,225,217,0.55)' }}
                >
                  {c.rom}
                </span>
              </div>
              <p
                className="text-[10px] tracking-[2px] uppercase mt-4"
                style={{ color: 'rgba(232,225,217,0.6)' }}
              >
                {c.where}
              </p>
              <p
                className="text-sm leading-relaxed mt-5"
                style={{ color: 'rgba(232,225,217,0.72)' }}
              >
                {c.text}
              </p>
              <p
                className="mt-auto pt-6 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[2.5px] uppercase"
                style={{ color: statusColor[c.state] }}
              >
                <span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: statusColor[c.state] }}
                />
                {c.status}
              </p>
            </article>
          ))}
        </div>

        {/*
          One sentence the reader should be able to repeat to a friend. It is
          set larger than the body and given its own rule so the section ends on
          the argument rather than trailing off in a card.
        */}
        <div
          className="mt-16 md:mt-20 pt-10"
          style={{ borderTop: '1px solid rgba(232,225,217,0.15)' }}
        >
          <p className="text-xl md:text-3xl font-light leading-snug max-w-3xl">
            {t('punch')}
          </p>
          <p
            className="text-sm leading-relaxed max-w-2xl mt-5"
            style={{ color: 'rgba(232,225,217,0.62)' }}
          >
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Four barriers, laid out as a hairline grid. `gap-px` over a tinted parent is
 * how the rules stay exactly one pixel at every breakpoint — border utilities
 * on a two-column grid produce doubled lines wherever two cells meet.
 */
export async function PermitSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'permit' });
  const facts = t.raw('facts') as Fact[];

  return (
    <section id="permit" className="py-24 md:py-32 px-6 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <p className={eyebrow}>{t('label')}</p>
        <h2 className={h2}>{t('title')}</h2>
        <p className={lede}>{t('lede')}</p>

        <div className="grid md:grid-cols-2 gap-px bg-black/10 border border-black/10 mt-16">
          {facts.map((f) => (
            <div key={f.n} className="bg-white p-8 md:p-10">
              <p className="text-[10px] tracking-[3px] text-[#8C3B2E] mb-4">
                {f.n}
              </p>
              <h3 className="text-lg font-medium mb-3 leading-snug">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-stone-500">{f.text}</p>
            </div>
          ))}
        </div>

        {/*
          The turn. Dark block, because it is the hinge of the whole page: the
          four cards above are the objection, this is the answer.
        */}
        <div className="mt-14 bg-[#1F1F1F] text-[#E8E1D9] px-8 py-12 md:px-14 md:py-14">
          <p className="text-xl md:text-3xl font-light leading-snug mb-5 max-w-2xl">
            {t('turnTitle')}
          </p>
          <p className="text-sm md:text-base leading-relaxed text-[#E8E1D9]/70 max-w-2xl">
            {t('turnText')}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * The comparison table.
 *
 * A real `<table>` on desktop would be the semantic choice, but the same markup
 * has to work at 390px where three columns of prose is unreadable. Rather than
 * duplicating the content into a card layout, each row is a CSS grid whose
 * cells stack on a phone and pick up their column label from a label element
 * that is only shown at that size. One copy of the text, two layouts.
 */
export async function CompareSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'compare' });
  const rows = t.raw('rows') as CompareRow[];
  const head = t.raw('head') as string[];

  return (
    <section id="why" className="py-24 md:py-32 px-6 bg-[#F5F2ED] scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <p className={eyebrow}>{t('label')}</p>
        <h2 className={h2}>{t('title')}</h2>
        <p className={lede}>{t('lede')}</p>

        <div className="mt-14">
          <div className="hidden md:grid grid-cols-[1.05fr_1fr_1fr] gap-6 pb-4 border-b border-black/20 text-[10px] tracking-[3px] uppercase">
            <span className="text-stone-400">{head[0]}</span>
            <span className="text-stone-400">{head[1]}</span>
            <span className="text-[#8C3B2E] border-l border-[#8C3B2E]/40 pl-5">
              {head[2]}
            </span>
          </div>

          {rows.map((r) => (
            <div
              key={r.k}
              className="grid md:grid-cols-[1.05fr_1fr_1fr] gap-x-6 gap-y-2 py-6 md:py-5 border-b border-black/10"
            >
              <span className="text-sm font-medium text-[#1F1F1F]">{r.k}</span>

              {/* stone-500, not stone-400: 400 measures about 2.4:1 on this
                  beige, which is under the 4.5:1 floor for 14px text. The
                  left column reads as secondary through weight and the absence
                  of the brick rule, not through low contrast. */}
              <span className="text-sm leading-relaxed text-stone-500">
                <span className="md:hidden block text-[9px] tracking-[2px] uppercase text-stone-400/80 mb-1">
                  {head[1]}
                </span>
                {r.tar}
              </span>

              <span className="text-sm leading-relaxed text-[#1F1F1F] md:border-l md:border-[#8C3B2E]/40 md:pl-5">
                <span className="md:hidden block text-[9px] tracking-[2px] uppercase text-[#8C3B2E] mb-1">
                  {head[2]}
                </span>
                {r.kham}
              </span>
            </div>
          ))}
        </div>

        <p className="text-xs leading-relaxed text-stone-400 max-w-2xl mt-8">
          {t('note')}
        </p>
      </div>
    </section>
  );
}

/** Six concrete things, each with a place and an altitude. No adjectives. */
export async function LandSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'land' });
  const items = t.raw('items') as LandItem[];

  return (
    <section id="land" className="py-24 md:py-32 px-6 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <p className={eyebrow}>{t('label')}</p>
        <h2 className={h2}>{t('title')}</h2>
        <p className={lede}>{t('lede')}</p>

        <div className="grid md:grid-cols-3 gap-px bg-black/10 border-t border-black/10 mt-16">
          {items.map((item) => (
            <div key={item.name} className="bg-white pt-8 pb-10 md:pr-8">
              <p className="text-[9px] font-semibold tracking-[2.5px] uppercase text-[#8C3B2E] mb-3">
                {item.meta}
              </p>
              <h3 className="text-xl font-light mb-3">{item.name}</h3>
              <p className="text-sm leading-relaxed text-stone-500">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Who takes you.
 *
 * Portraits come from `teamMembers`; the role line comes from `about.team.*`
 * so it stays in step with the About page. Only the pull-quote is new, and it
 * is keyed by member id (`who.aaronQuote`), so adding a third guide means
 * adding a quote and nothing else.
 */
export async function WhoSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'who' });
  const ta = await getTranslations({ locale, namespace: 'about' });

  return (
    <section id="who" className="py-24 md:py-32 px-6 bg-[#F5F2ED] scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <p className={eyebrow}>{t('label')}</p>
        <h2 className={h2}>{t('title')}</h2>
        <p className={lede}>{t('lede')}</p>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 mt-16">
          {teamMembers.map((m) => (
            <figure key={m.id} className="md:flex md:gap-8 items-start">
              <div className="w-32 h-40 md:w-48 md:h-60 shrink-0 overflow-hidden bg-[#E8E1D9] mb-6 md:mb-0">
                {m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div>
                <figcaption className="text-lg font-medium">{m.name}</figcaption>
                <p className="text-[10px] tracking-[2.5px] uppercase text-[#8C3B2E] mt-1 mb-5">
                  {m.i18nKey ? ta(`team.${m.i18nKey}.role` as any) : m.role}
                </p>
                <blockquote className="text-sm md:text-base leading-relaxed text-stone-600">
                  {t(`${m.id}Quote` as any)}
                </blockquote>
              </div>
            </figure>
          ))}
        </div>

        <div className="mt-14">
          <a
            href={`/${locale}/about`}
            className="inline-flex items-center gap-2 border border-[#1F1F1F] text-[#1F1F1F] px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:bg-[#1F1F1F] hover:text-[#E8E1D9] transition-all"
          >
            {t('cta')} →
          </a>
        </div>
      </div>
    </section>
  );
}
