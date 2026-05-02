import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { locales } from '../../i18n';
import '../globals.css';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  return { title: t('brand') };
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
              <Link href={`/${locale}`} className="text-lg font-light tracking-[4px] text-[#1F1F1F]">
                CHENGDU JOURNEYS
              </Link>
              <div className="hidden md:flex items-center gap-8 text-xs tracking-[2px] uppercase">
                <Link href={`/${locale}#trips`} className="text-stone-500 hover:text-[#8C3B2E] transition-colors">{t('trips')}</Link>
                <Link href={`/${locale}#why`} className="text-stone-500 hover:text-[#8C3B2E] transition-colors">{t('why')}</Link>
                <Link href={`/${locale}#gallery`} className="text-stone-500 hover:text-[#8C3B2E] transition-colors">{t('gallery')}</Link>
                <Link href={`/${locale}#contact`} className="text-stone-500 hover:text-[#8C3B2E] transition-colors">{t('contact')}</Link>
              </div>
              <LangSwitcher locale={locale} />
            </div>
          </nav>
          <main>{children}</main>
          <footer className="bg-[#1F1F1F] py-12 px-6">
            <div className="max-w-7xl mx-auto text-center text-white/30 text-[10px] tracking-[2px] uppercase">
              <p>© 2026 Chengdu Journeys. All rights reserved.</p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
