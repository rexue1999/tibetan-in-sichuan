import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import RouteCard from './route-card';

const routeSlugs = ['tibetan-walk-chengdu', 'go-west-go-tibet', 'tibetan-nomad'];

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
  const tc = await getTranslations({ locale, namespace: 'cta' });
  const tu = await getTranslations({ locale, namespace: 'upsell' });

  return (
    <>
      {/* ==============================
          HERO
          ============================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579187626396-5a9dc3e09522?w=1920&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8E1D9]/90 via-[#E8E1D9]/60 to-[#1F1F1F]/60 z-10" />
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
        {/* Mountain silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-[35vh] opacity-[0.07] z-0">
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="0,200 180,80 260,110 340,55 440,100 500,65 600,120 680,90 760,130 840,75 920,110 1020,60 1120,105 1200,70 1300,115 1440,80 1440,200" fill="#1F1F1F"/>
          </svg>
        </div>
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
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/10" />
              <span className="absolute bottom-4 left-4 text-[9px] tracking-[2px] uppercase text-white/80">Wuhou Tibetan District, Chengdu</span>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12" style={{ gridTemplateRows: 'repeat(2, 240px)' }}>
            <div
              className="md:row-span-2 col-span-2 rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529688530647-93a6e1916f5f?w=800&q=80)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/20" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption1')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579187626396-5a9dc3e09522?w=600&q=80)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/15" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption2')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/15" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption3')}</span>
            </div>
            <div
              className="rounded-sm overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=80)' }}
            >
              <div className="absolute inset-0 bg-[#1F1F1F]/20" />
              <span className="absolute bottom-3 left-3 text-[9px] tracking-[2px] uppercase text-white/80">{tg('caption4')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          CTA CONVERSION
          ============================== */}
      <section id="contact" className="py-24 md:py-32 px-6 bg-[#1F1F1F] text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] font-semibold tracking-[4px] uppercase text-[#B85C4E] mb-5">{tc('label')}</p>
          <h2 className="text-3xl md:text-5xl font-light tracking-[-0.5px] leading-tight text-[#E8E1D9] mb-6">{tc('title')}</h2>
          <p className="text-base leading-relaxed text-white/40 mb-10">{tc('text')}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2 bg-[#E8E1D9] text-[#1F1F1F] px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:bg-white transition-all hover:-translate-y-0.5"
            >
              {tc('book')} →
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2 border border-white/20 text-[#E8E1D9] px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:border-[#E8E1D9] hover:bg-white/5 transition-all"
            >
              {tc('contact')}
            </Link>
          </div>
        </div>
      </section>

      {/* Upsell banner */}
      <div className="bg-[#1F1F1F] border-t border-white/5 py-4 px-6 text-center">
        <p className="text-sm leading-relaxed text-[#E8E1D9]/60">
          {tu('text')}
        </p>
      </div>
    </>
  );
}
