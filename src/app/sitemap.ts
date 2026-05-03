import { locales } from '../i18n';

const SITE_URL = 'https://chengdujourneys.com';

const routes = [
  { slug: 'tibetan-walk-chengdu', priority: 0.8 },
  { slug: 'go-west-go-tibet', priority: 0.9 },
  { slug: 'tibetan-nomad', priority: 0.9 },
];

export default function sitemap() {
  const entries = [];

  for (const locale of locales) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
    entries.push({
      url: `${SITE_URL}/${locale}/booking`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}/routes/${route.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route.priority,
      });
    }
  }

  return entries;
}
