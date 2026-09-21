import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { locales, defaultLocale } from '../../i18n';
import { SITE_URL, buildLocalizedAlternates } from '../../lib/seo';
import '../globals.css';
import MobileMenu from './mobile-menu';

const ogLocales: Record<string, string> = {
  en: 'en_US',
  es: 'es_ES',
  th: 'th_TH',
  zh: 'zh_CN',
};

const htmlLang: Record<string, string> = {
  en: 'en',
  es: 'es',
  th: 'th',
  zh: 'zh-CN',
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const ts = await getTranslations({ locale, namespace: 'seo' });
  const tp = await getTranslations({ locale, namespace: 'seoPages' });

  const title = tp('homeTitle');
  const description = tp('homeDesc');

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: buildLocalizedAlternates(locale, ''),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: t('brand'),
      locale: ogLocales[locale] ?? 'en_US',
      alternateLocale: locales.filter((loc) => loc !== locale).map((loc) => ogLocales[loc]),
      type: 'website',
      images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.png'],
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
  { href: '/#trips', key: 'trips' },
  { href: '/guides', key: 'guides' },
  { href: '/about', key: 'about' },
  { href: '/reviews', key: 'reviews' },
  { href: '/booking', key: 'contact' },
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
  const ts = await getTranslations({ locale, namespace: 'seoPages' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Chengdu Journeys',
        alternateName: '成都旅程',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.svg`,
          caption: 'Chengdu Journeys',
        },
        description:
          messages.seo?.description ||
          'Small-group journeys from Chengdu into Tibetan culture and Western China',
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
          email: 'info@chengdujourneys.com',
          availableLanguage: ['English', 'Chinese', 'Thai', 'Spanish', 'Tibetan'],
        },
        sameAs: ['https://wa.me/8619045478878'],
      },
      {
        '@type': 'TravelAgency',
        '@id': `${SITE_URL}/${locale}/#agency`,
        name: 'Chengdu Journeys',
        url: `${SITE_URL}/${locale}`,
        image: `${SITE_URL}/images/og-image.png`,
        priceRange: '$$',
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chengdu',
          addressRegion: 'Sichuan',
          addressCountry: 'CN',
        },
        areaServed: [
          { '@type': 'Place', name: 'Chengdu' },
          { '@type': 'Place', name: 'Western Sichuan' },
          { '@type': 'Place', name: 'Ganzi Tibetan Autonomous Prefecture' },
          { '@type': 'Place', name: 'Aba Tibetan and Qiang Autonomous Prefecture' },
          { '@type': 'Place', name: 'Tibet' },
        ],
        knowsLanguage: ['en', 'zh', 'th', 'es'],
        makesOffer: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'TouristTrip',
              name: 'Chengdu Tibetan Walking Tour',
              description:
                'A two-hour introduction to Tibetan culture hidden inside the city - temples, tea houses, and living traditions.',
              url: `${SITE_URL}/${locale}/routes/tibetan-walk-chengdu`,
              touristType: ['Cultural travellers', 'Solo travellers', 'Couples'],
              itinerary: {
                '@type': 'ItemList',
                numberOfItems: 4,
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Meet & Greet' },
                  { '@type': 'ListItem', position: 2, name: 'Tibetan Quarter Walk' },
                  { '@type': 'ListItem', position: 3, name: 'Tibetan Tea & Snacks' },
                  { '@type': 'ListItem', position: 4, name: 'Tibetan Guozhuang Dance' },
                ],
              },
            },
            price: '39',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'TouristTrip',
              name: 'Highland Roads & Temple Views',
              description:
                'Explore highland roads, ancient temples, and mountain panoramas across the Tibetan plateau eastern edge, from Kangding to Tagong and Xinduqiao.',
              url: `${SITE_URL}/${locale}/routes/go-west-go-tibet`,
              touristType: ['Adventure travellers', 'Photographers', 'Small groups'],
            },
            price: '690',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            // 3 days from US$690 up to 7 days at US$1,390 per person;
            // longer itineraries cost less per day.
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              minPrice: '690',
              maxPrice: '1390',
              valueAddedTaxIncluded: false,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'TouristTrip',
              name: 'Nomad Between Earth & Sky',
              description:
                'A four-day nomadic homestay on the Zoige-Hongyuan grasslands: yak milking, butter tea, black tent camping and plateau horse riding.',
              url: `${SITE_URL}/${locale}/routes/tibetan-nomad`,
              touristType: ['Culture seekers', 'Families', 'Small groups'],
            },
            price: '1999',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            // The camp is a fixed-cost stay, so the per-person rate falls as
            // the group grows. Entry price shown on the page matches `price`;
            // the full ladder is declared here so the markup does not
            // contradict the tiers listed on the route page.
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              minPrice: '1750',
              maxPrice: '2980',
              valueAddedTaxIncluded: false,
            },
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Chengdu Journeys',
        description: ts('homeDesc'),
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['en', 'es', 'th', 'zh-CN'],
      },
    ],
  };

  // NOTE: the site-wide FAQPage schema is intentionally NOT emitted here.
  // The 6 questions in the `faq` namespace are only rendered on the homepage,
  // and Google requires FAQ markup to match content visible on the page.
  // Emitting it layout-wide also collided with the per-route FAQPage blocks.
  // It now lives in src/app/[locale]/page.tsx, next to the visible FAQ.

  return (
    <html lang={htmlLang[locale] ?? locale}>
      <body className="bg-[#F5F2ED] text-[#1F1F1F] min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <nav className="fixed top-0 w-full z-50 bg-[#F5F2ED]/90 backdrop-blur-md border-b border-black/5 transition-all">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link href={`/${locale}`} className="flex items-center gap-3 text-[#1F1F1F]">
                <Image src="/icon.svg" alt="Chengdu Journeys — Sichuan & Tibet small-group tours" width={36} height={36} />
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
