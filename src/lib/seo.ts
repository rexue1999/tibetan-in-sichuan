import { locales, defaultLocale } from '../i18n';

export const SITE_URL = 'https://chengdujourneys.com';
export const SITE_NAME = 'Chengdu Journeys';

/**
 * Build a correctly-populated `alternates` object for Next.js metadata.
 *
 * Next.js expects the `languages` keys to be lower-case hreflang codes.
 * Values must be absolute URLs or root-relative paths (never empty strings).
 *
 * Note: `x-default` intentionally points at the bare root path rather than the
 * default-locale path. Google treats a duplicate target (x-default === en) as a
 * conflicting annotation, so x-default must be a distinct URL that exists.
 */
export function buildLocalizedAlternates(locale: string, path: string) {
  const languages: Record<string, string> = {};

  for (const loc of locales) {
    languages[loc] = `/${loc}${path}`;
  }
  languages['x-default'] = path === '' ? '/' : path;

  return {
    canonical: `/${locale}${path}`,
    languages,
  };
}

/** Locale-independent alternates; canonical points at the default locale. */
export function buildAlternates(path: string) {
  return buildLocalizedAlternates(defaultLocale, path);
}
