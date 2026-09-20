import { getTranslations, getMessages } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ItinerarySection from './itinerary-section';
import { locales, defaultLocale } from '../../../../i18n';
import { SITE_URL, buildLocalizedAlternates } from '../../../../lib/seo';

type RouteLabels = {
  duration: string;
  meeting: string;
  time: string;
  price: string;
  itinerary: string;
  highlights: string;
  bookTrip: string;
  askWA: string;
  back: string;
  day: string;
  stay: string;
  dayLabel: string;
};

const routeMap: Record<string, { key: 'route1' | 'route2' | 'route3'; image: string; keywords: string[] }> = {
  'tibetan-walk-chengdu': {
    key: 'route1',
    image: '/images/walk-tour.jpg?v=2',
    keywords: [
      'Chengdu Tibetan walking tour',
      'Tibetan culture Chengdu',
      'Wuhouci Tibetan quarter',
      'Chengdu cultural tour',
    ],
  },
  'go-west-go-tibet': {
    key: 'route2',
    image: '/images/highland-trip.jpg?v=2',
    keywords: [
      'Chengdu to Tibet tour',
      'Kangding Tagong tour',
      'Western Sichuan highland tour',
      'Xinduqiao photographer paradise',
      'Zheduo Pass 4298m',
    ],
  },
  'tibetan-nomad': {
    key: 'route3',
    image: '/images/nomad.jpg?v=2',
    keywords: [
      'Tibetan nomad homestay',
      'Zoige grasslands tour',
      'Hongyuan nomad experience',
      'Sichuan nomad family stay',
    ],
  },
};

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const route = routeMap[slug];
  if (!route) return { title: 'Not Found' };

  const tr = await getTranslations({ locale, namespace: 'routes' });
  const name = tr(`${route.key}.name` as any);
  const tagline = tr(`${route.key}.tagline` as any);
  const duration = tr(`${route.key}.duration` as any);
  const description = tr(`${route.key}.description` as any);

  const title = `${name} | ${tagline} - Chengdu Journeys`;
  const path = `/routes/${slug}`;

  return {
    title,
    description,
    keywords: route.keywords,
    alternates: buildLocalizedAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: 'Chengdu Journeys',
      locale: locale === 'zh' ? 'zh_CN' : locale === 'es' ? 'es_ES' : locale === 'th' ? 'th_TH' : 'en_US',
      type: 'article',
      images: [{ url: route.image, width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [route.image],
    },
    other: {
      'tour:duration': duration,
    },
  };
}

export default async function RouteDetail({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const route = routeMap[slug];
  if (!route) notFound();

  const tr = await getTranslations({ locale, namespace: 'routes' });
  const tu = await getTranslations({ locale, namespace: 'upsell' });
  const messages = await getMessages();

  const routeData = (messages as any).routes?.[route.key] || {};
  const pricing = routeData.pricing as string | undefined;
  const meetingPoint = routeData.meetingPoint as string | undefined;
  const meetingTime = routeData.meetingTime as string | undefined;
  const itinerary = routeData.itinerary;
  const itineraries = routeData.itineraries;

  const labelMap: Record<string, RouteLabels> = {
    en: {
      duration: 'Duration', meeting: 'Meeting Point', time: 'Meeting Time', price: 'Price',
      itinerary: 'Itinerary', highlights: 'Highlights', bookTrip: 'Book This Trip',
      askWA: 'Ask on WhatsApp', back: 'Back to Home', day: 'Days', stay: 'Stay', dayLabel: 'Day',
    },
    es: {
      duration: 'Duración', meeting: 'Punto de encuentro', time: 'Hora de encuentro', price: 'Precio',
      itinerary: 'Itinerario', highlights: 'Destacados', bookTrip: 'Reservar este viaje',
      askWA: 'Consultar por WhatsApp', back: 'Volver al inicio', day: 'Días', stay: 'Alojamiento', dayLabel: 'Día',
    },
    th: {
      duration: 'ระยะเวลา', meeting: 'จุดนัดพบ', time: 'เวลานัดพบ', price: 'ราคา',
      itinerary: 'กำหนดการ', highlights: 'ไฮไลท์', bookTrip: 'จองเส้นทางนี้',
      askWA: 'สอบถามทาง WhatsApp', back: 'กลับหน้าแรก', day: 'วัน', stay: 'พัก', dayLabel: 'วันที่',
    },
    zh: {
      duration: '时长', meeting: '集合地点', time: '集合时间', price: '价格',
      itinerary: '行程安排', highlights: '行程亮点', bookTrip: '预订此行程',
      askWA: 'WhatsApp 咨询', back: '返回首页', day: '天', stay: '住', dayLabel: '第',
    },
  };
  const labels: RouteLabels = labelMap[locale] ?? labelMap.en;

  const homeLabel =
    locale === 'zh' ? '首页' : locale === 'th' ? 'หน้าแรก' : locale === 'es' ? 'Inicio' : 'Home';
  const tripsLabel =
    locale === 'zh' ? '行程' : locale === 'th' ? 'เส้นทาง' : locale === 'es' ? 'Viajes' : 'Trips';
  const routeName = tr(`${route.key}.name` as any);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: tripsLabel,
        item: `${SITE_URL}/${locale}#trips`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: routeName,
        item: `${SITE_URL}/${locale}/routes/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero image */}
      <div className="relative h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${route.image})` }}
        />
        <div className="absolute inset-0 bg-[#1F1F1F]/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-3xl md:text-5xl font-light tracking-[-0.5px] text-white mb-4">
              {tr(`${route.key}.name` as any)}
            </h1>
            <p className="text-[#B85C4E] text-lg">{tr(`${route.key}.tagline` as any)}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Duration + Description */}
        <div className="mb-12">
          <p className="text-[10px] font-semibold tracking-[3px] uppercase text-[#8C3B2E] mb-4">
            {tr(`${route.key}.duration` as any)}
          </p>
          <p className="text-lg leading-relaxed text-stone-600">
            {tr(`${route.key}.description` as any)}
          </p>
        </div>

        {/* Meeting info + Pricing card */}
        {(meetingPoint || pricing) && (
          <div className="grid md:grid-cols-3 gap-4 mb-14">
            {meetingPoint && (
              <>
                <div className="bg-[#F5F2ED] rounded-sm p-5 border border-black/5">
                  <p className="text-[10px] font-semibold tracking-[2px] uppercase text-[#8C3B2E] mb-2">{labels.meeting}</p>
                  <p className="text-sm text-[#1F1F1F]">{meetingPoint}</p>
                </div>
                <div className="bg-[#F5F2ED] rounded-sm p-5 border border-black/5">
                  <p className="text-[10px] font-semibold tracking-[2px] uppercase text-[#8C3B2E] mb-2">{labels.time}</p>
                  <p className="text-sm text-[#1F1F1F]">{meetingTime}</p>
                </div>
              </>
            )}
            {pricing && (
              <div className="bg-[#1F1F1F] rounded-sm p-5">
                <p className="text-[10px] font-semibold tracking-[2px] uppercase text-white/50 mb-2">{labels.price}</p>
                <p className="text-xl font-light text-white">{pricing}</p>
              </div>
            )}
          </div>
        )}

        {/* Itinerary */}
        <ItinerarySection itinerary={itinerary} itineraries={itineraries} labels={labels} locale={locale} />

        {/* Highlights */}
        <div>
          <h2 className="text-xl font-medium text-[#1F1F1F] mb-6">{labels.highlights}</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {([0, 1, 2, 3] as const).map((i) => (
              <li key={i} className="flex items-center gap-3 text-stone-600 bg-[#F5F2ED] rounded-sm p-4 border border-black/5">
                <span className="text-[#8C3B2E] text-sm">✦</span>
                {tr(`${route.key}.highlights.${i}` as any)}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-center gap-6">
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center gap-2 bg-[#1F1F1F] text-[#E8E1D9] px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:bg-[#8C3B2E] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#8C3B2E]/20"
            >
              {labels.bookTrip} →
            </Link>
            <a
              href="https://wa.me/8619045478878"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#1F1F1F] text-[#1F1F1F] px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:bg-[#1F1F1F] hover:text-[#E8E1D9] transition-all"
            >
              {labels.askWA}
            </a>
          </div>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1 text-xs font-semibold tracking-[2px] uppercase text-[#8C3B2E] hover:text-[#1F1F1F] transition-colors"
          >
            ← {labels.back}
          </Link>
        </div>
      </div>

      {/* Upsell banner */}
      <div className="bg-[#1F1F1F] py-4 px-6 text-center">
        <p className="text-sm leading-relaxed text-white/60">
          {tu('text')}
        </p>
      </div>
    </div>
  );
}
