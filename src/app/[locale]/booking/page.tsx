import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const WHATSAPP_URL = 'https://wa.me/8619045478878';

const contactMethods = [
  {
    key: 'whatsapp',
    href: WHATSAPP_URL,
    external: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
    color: 'bg-[#25D366] hover:bg-[#1ebe57]',
    labelKey: 'whatsapp' as const,
  },
  {
    key: 'email',
    href: 'mailto:info@chengdujourneys.com',
    external: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    color: 'border border-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white',
    labelKey: 'email' as const,
  },
  {
    key: 'wechat',
    href: '#',
    external: false,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.67 2.697c-3.334 0-6.038 2.43-6.038 5.425 0 2.637 2.07 4.84 4.795 5.38l1.066.587-.022.008.416.246c.078.046.141.018.141-.076l-.03-.213-.21-1.21a.464.464 0 0 1 .104-.37c1.595-1.372 2.582-3.317 2.582-5.345 0-2.995-2.704-5.425-6.038-5.425zm-2.918 2.96c.525 0 .951.427.951.953a.952.952 0 0 1-.951.953.952.952 0 0 1-.951-.953c0-.526.426-.953.951-.953zm4.91 1.906c.525 0 .951.427.951.953a.952.952 0 0 1-.951.953.952.952 0 0 1-.951-.953c0-.526.426-.953.951-.953z"/>
      </svg>
    ),
    color: 'border border-[#07C160] text-[#07C160] hover:bg-[#07C160] hover:text-white',
    labelKey: 'wechat' as const,
    idKey: 'wechatId' as const,
  },
];

const steps = [
  { key: 'step1' as const },
  { key: 'step2' as const },
  { key: 'step3' as const },
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const tb = await getTranslations({ locale, namespace: 'booking' });
  const ts = await getTranslations({ locale, namespace: 'seo' });

  return {
    title: `${tb('title')} — CHENGDU JOURNEYS`,
    description: tb('subtitle'),
  };
}

export default async function BookingPage({ params: { locale } }: { params: { locale: string } }) {
  const tb = await getTranslations({ locale, namespace: 'booking' });
  const th = await getTranslations({ locale, namespace: 'howItWorks' });
  const tr = await getTranslations({ locale, namespace: 'routes' });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-[#D9D0C5]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-light tracking-[-0.5px] leading-tight mb-6">
            {tb('title')}
          </h1>
          <p className="text-base leading-relaxed text-stone-600 max-w-lg mx-auto">
            {tb('subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4">
            {contactMethods.map(({ key, href, external, icon, color, labelKey, idKey }) => (
              <div key={key} className="border border-stone-200 rounded-sm p-6 flex flex-col items-center text-center gap-3">
                <div className="text-stone-600 mb-1">{icon}</div>
                <span className="text-xs font-medium tracking-[2px] uppercase text-stone-500">
                  {tb(labelKey as any)}
                </span>
                {idKey ? (
                  <span className="text-sm font-medium text-[#07C160] font-mono tracking-wide">{tb(idKey as any)}</span>
                ) : (
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-medium tracking-[2px] uppercase rounded-sm transition-all mt-auto text-white ${color}`}
                  >
                    {tb(labelKey as any)}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[#F5F2ED]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-medium tracking-[-0.3px] mb-10 text-center">{th('title')}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map(({ key }, i) => (
              <div key={key} className="text-center">
                <div className="w-10 h-10 rounded-full bg-[#8C3B2E] text-white flex items-center justify-center mx-auto mb-4 text-sm font-medium">
                  {i + 1}
                </div>
                <h3 className="text-sm font-medium mb-2">{th(`${key}Title` as any)}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{th(`${key}Text` as any)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6 bg-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-lg font-medium tracking-[-0.3px] mb-3">{tb('pricing')}</h2>
          <p className="text-sm text-stone-500 leading-relaxed mb-8">{tb('pricingNote')}</p>
          <Link
            href={`/${locale}#trips`}
            className="text-xs tracking-[2px] uppercase text-stone-400 hover:text-[#8C3B2E] transition-colors"
          >
            ← {tr('ctaAll')}
          </Link>
        </div>
      </section>
    </>
  );
}
