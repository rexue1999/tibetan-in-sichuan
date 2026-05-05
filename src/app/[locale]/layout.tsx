import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { locales, defaultLocale } from '../../i18n';
import '../globals.css';
import MobileMenu from './mobile-menu';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const ts = await getTranslations({ locale, namespace: 'seo' });

  const title = `${t('brand')} — ${ts('tagline')}`;
  const description = ts('description');
  const siteUrl = 'https://chengdujourneys.com';

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((loc) => [loc, `/${loc}`])),
        'x-default': `/${defaultLocale}`,
      },
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: t('brand'),
      locale: locale === 'zh' ? 'zh_CN' : locale === 'th' ? 'th_TH' : 'en_US',
      type: 'website',
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.jpg'],
    },
    robots: { index: true, follow: true },
    verification: { google: 'PxCoM2vTKeM9_A0VDPQSkVSZjhaTof13lLe7VPGXlEA' },
  };
}

function LangSwitcher({ locale }: { locale: string }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={`/${loc}`}
          className={`px-2 py-1 rounded transition-colors ${
            loc === locale
              ? 'bg-[#8C3B2E] text-white'
              : 'text-stone-400 hover:text-white'
          }`}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

const navLinks = [
  { href: '#trips', key: 'trips' },
  { href: '#why', key: 'why' },
  { href: '#gallery', key: 'gallery' },
  { href: '#contact', key: 'contact' },
] as const;

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html lang={locale}>
      <body className="bg-[#F5F2ED] text-[#1F1F1F] min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <nav className="fixed top-0 w-full z-50 bg-[#F5F2ED]/90 backdrop-blur-md border-b border-black/5 transition-all">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link href={`/${locale}`} className="flex items-center gap-3 text-[#1F1F1F]">
                <Image src="/icon.svg" alt="" width={36} height={36} />
                <span className="text-lg font-light tracking-[4px]">CHENGDU JOURNEYS</span>
              </Link>
              <div className="hidden md:flex items-center gap-8 text-xs tracking-[2px] uppercase">
                {navLinks.map(({ href, key }) => (
                  <Link key={key} href={`/${locale}${href}`} className="text-stone-500 hover:text-[#8C3B2E] transition-colors">
                    {t(key)}
                  </Link>
                ))}
              </div>
              <LangSwitcher locale={locale} />
              <MobileMenu locale={locale} navLinks={navLinks.map(({ href, key }) => ({ href: `${href}`, label: t(key) }))} />
            </div>
          </nav>
          <main>{children}</main>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'TravelAgency',
                name: 'Chengdu Journeys',
                url: `https://chengdujourneys.com/${locale}`,
                logo: 'https://chengdujourneys.com/logo.svg',
                description: messages.seo?.description || 'Small-group journeys from Chengdu into Tibetan culture and Western China',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Chengdu',
                  addressRegion: 'Sichuan',
                  addressCountry: 'CN',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'customer service',
                  telephone: '+86-19045478878',
                  availableLanguage: ['English', 'Chinese', 'Thai'],
                },
                sameAs: ['https://wa.me/8619045478878'],
                makesOffer: [
                  {
                    '@type': 'TouristTrip',
                    name: 'Chengdu Tibetan Walking Tour',
                    description: 'A two-hour introduction to Tibetan culture hidden inside the city',
                    url: `https://chengdujourneys.com/${locale}/routes/tibetan-walk-chengdu`,
                  },
                  {
                    '@type': 'TouristTrip',
                    name: 'Highland Roads & Temple Views',
                    description: 'Explore highland roads, ancient temples, and mountain panoramas across the Tibetan plateau',
                    url: `https://chengdujourneys.com/${locale}/routes/go-west-go-tibet`,
                  },
                  {
                    '@type': 'TouristTrip',
                    name: 'Nomad in Tibetan Area',
                    description: 'Venture deep into the high grasslands of western Sichuan for an immersive nomad experience',
                    url: `https://chengdujourneys.com/${locale}/routes/tibetan-nomad`,
                  },
                ],
              }),
            }}
          />
          <footer className="bg-[#1F1F1F] py-12 px-6">
            <div className="max-w-7xl mx-auto text-center text-white/50 text-[10px] tracking-[2px] uppercase">
              <p>© 2026 Chengdu Journeys. All rights reserved.</p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
