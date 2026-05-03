import { locales, defaultLocale } from '../i18n';

const SITE_URL = 'https://chengdujourneys.com';

export default function robots() {
  const disallowedPaths = ['/api/', '/_next/', '/admin/'];

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
