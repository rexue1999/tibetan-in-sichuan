import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import RouteCard from './route-card';

const routeSlugs = ['tibetan-walk-chengdu', 'go-west-go-tibet', 'tibetan-nomad'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const tr = await getTranslations({ locale, namespace: 'routes' });

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/30 via-stone-950 to-stone-950" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1692476409717-b953ca8b9efe?w=1920&q=80)',
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
            <span className="text-amber-400">{t('title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          <Link
            href={`/${locale}#routes`}
            className="inline-block bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all hover:scale-105"
          >
            {t('cta')}
          </Link>
        </div>
        <div className="absolute bottom-8 z-10 animate-bounce">
          <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section id="routes" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-4">{tr('title')}</h2>
          <p className="text-stone-400 text-lg">{tr('subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
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
      </section>

      <section id="about" className="py-24 px-6 bg-stone-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-400 mb-6">
            {locale === 'zh' ? '关于川西藏韵' : locale === 'th' ? 'เกี่ยวกับเรา' : 'About Tibet in Sichuan'}
          </h2>
          <p className="text-stone-300 leading-relaxed text-lg">
            {locale === 'zh'
              ? '我们是一群热爱藏文化的旅行者，致力于向世界展示四川藏区的独特魅力。从繁华都市到高原牧区，我们精心设计每一条路线，让您以最真实、最深入的方式体验藏地文化。'
              : locale === 'th'
                ? 'เราคือกลุ่มนักเดินทางที่หลงใหลในวัฒนธรรมทิเบต มุ่งมั่นที่จะแสดงเสน่ห์อันเป็นเอกลักษณ์ของเขตทิเบตในเสฉวนให้โลกได้เห็น จากเมืองที่คึกคักสู่ทุ่งหญ้าบนที่ราบสูง เราออกแบบทุกเส้นทางอย่างพิถีพิถันเพื่อให้คุณได้สัมผัสวัฒนธรรมทิเบตอย่างแท้จริงและลึกซึ้งที่สุด'
                : 'We are a group of travelers passionate about Tibetan culture, dedicated to showcasing the unique charm of Sichuan\'s Tibetan regions to the world. From bustling cities to highland pastures, we carefully design every route so you can experience Tibetan culture in the most authentic and immersive way.'}
          </p>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-amber-400 mb-6">
          {locale === 'zh' ? '联系我们' : locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
        </h2>
        <p className="text-stone-400 mb-8">
          {locale === 'zh'
            ? '准备好开启您的藏地之旅了吗？请随时联系我们。'
            : locale === 'th'
              ? 'พร้อมที่จะเริ่มการเดินทางทิเบตของคุณหรือยัง? ติดต่อเราได้เลย'
              : 'Ready to start your Tibetan journey? Feel free to reach out.'}
        </p>
        <div className="space-y-2 text-stone-300">
          <p>info@tibet-in-sichuan.com</p>
          <p>+86 19045478878</p>
        </div>
      </section>
    </>
  );
}
