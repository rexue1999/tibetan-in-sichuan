import { locales, defaultLocale } from '../i18n';

const SITE_URL = 'https://chengdujourneys.com';

export default function robots() {
  // IMPORTANT: never disallow /_next/ (or any static asset dir).
  // Googlebot must fetch CSS/JS to render pages; blocking them makes
  // rendered pages look unstyled/broken and can get them devalued in search.
  const disallowedPaths = ['/api/', '/admin/'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
