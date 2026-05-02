import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { locales } from '../../i18n';
import '../globals.css';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  return { title: t('title') };
}

function LangSwitcher({ locale }: { locale: string }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={`/${loc}`}
          className={`px-2 py-1 rounded transition-colors ${
            loc === locale
              ? 'bg-amber-600 text-white'
              : 'text-gray-300 hover:text-white'
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
      <body className="bg-stone-950 text-stone-100 min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <nav className="fixed top-0 w-full z-50 bg-stone-950/80 backdrop-blur-md border-b border-stone-800">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link href={`/${locale}`} className="text-xl font-bold tracking-wider text-amber-500">
                Tibet in Sichuan
              </Link>
              <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
                <Link href={`/${locale}`} className="hover:text-amber-400 transition-colors">{t('home')}</Link>
                <Link href={`/${locale}#routes`} className="hover:text-amber-400 transition-colors">{t('routes')}</Link>
                <Link href={`/${locale}#about`} className="hover:text-amber-400 transition-colors">{t('about')}</Link>
                <Link href={`/${locale}#contact`} className="hover:text-amber-400 transition-colors">{t('contact')}</Link>
              </div>
              <LangSwitcher locale={locale} />
            </div>
          </nav>
          <main>{children}</main>
          <footer className="bg-stone-900 border-t border-stone-800 py-12 px-6">
            <div className="max-w-7xl mx-auto text-center text-stone-400 text-sm">
              <p>© 2026 Tibet in Sichuan. All rights reserved.</p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
