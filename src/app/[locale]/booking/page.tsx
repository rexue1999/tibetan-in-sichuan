import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const WHATSAPP_URL = 'https://wa.me/8619045478878';

const routes = [
  { key: 'route1', color: 'bg-[#5B7B5A]' },
  { key: 'route2', color: 'bg-[#B8934E]' },
  { key: 'route3', color: 'bg-[#8C3B2E]' },
];

export default async function BookingPage({ params: { locale } }: { params: { locale: string } }) {
  const tb = await getTranslations({ locale, namespace: 'booking' });
  const tr = await getTranslations({ locale, namespace: 'routes' });
  const tnav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-[#D9D0C5]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-semibold tracking-[4px] uppercase text-[#8C3B2E] mb-5">
            {tnav('contact')}
          </p>
          <h1 className="text-3xl md:text-5xl font-light tracking-[-0.5px] leading-tight mb-6">
            {tb('title')}
          </h1>
          <p className="text-base leading-relaxed text-stone-600 max-w-lg mx-auto">
            {tb('subtitle')}
          </p>
        </div>
      </section>

      {/* Routes overview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {routes.map(({ key, color }, i) => (
              <div key={key} className="border border-stone-200 rounded-sm p-6 flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center text-white text-lg font-light rounded-sm" style={{ backgroundColor: color === 'bg-[#5B7B5A]' ? '#5B7B5A' : color === 'bg-[#B8934E]' ? '#B8934E' : '#8C3B2E' }}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-medium tracking-[-0.3px]">{tr(`${key}.name` as any)}</h3>
                    <span className={`inline-block text-[9px] font-semibold tracking-[1.5px] uppercase text-white px-2 py-0.5 rounded-sm ${color}`}>
                      {tr(`${key}.tier` as any)}
                    </span>
                  </div>
                  <p className="text-[10px] font-semibold tracking-[3px] uppercase text-stone-400 mb-2">
                    {tr(`${key}.duration` as any)}
                  </p>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {tb(`${key}Desc` as any)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Contact */}
      <section className="py-20 px-6 bg-[#F5F2ED]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xl font-medium tracking-[-0.3px] mb-4">{tb('pricing')}</h2>
          <p className="text-sm text-stone-500 leading-relaxed mb-10">
            {tb('pricingNote')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:bg-[#1ebe57] transition-all rounded-sm"
            >
              {tb('whatsapp')} →
            </a>
            <a
              href="mailto:info@tibet-in-sichuan.com"
              className="inline-flex items-center justify-center gap-2 border border-[#1F1F1F] text-[#1F1F1F] px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:bg-[#1F1F1F] hover:text-white transition-all rounded-sm"
            >
              {tb('email')}
            </a>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="bg-[#F5F2ED] pb-20 text-center">
        <Link
          href={`/${locale}#trips`}
          className="text-xs tracking-[2px] uppercase text-stone-400 hover:text-[#8C3B2E] transition-colors"
        >
          ← {tr('ctaAll')}
        </Link>
      </div>
    </>
  );
}
