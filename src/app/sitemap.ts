import { locales } from '../i18n';
import { SITE_URL } from '../lib/seo';

/**
 * Content revision date. Bump this when route copy or page content changes so
 * crawlers see a meaningful lastmod instead of a timestamp that shifts on every
 * deploy (which Google learns to ignore).
 */
const CONTENT_UPDATED = new Date('2026-09-20');

const routes = [
  { slug: 'tibetan-walk-chengdu', priority: 0.8 },
  { slug: 'go-west-go-tibet', priority: 0.9 },
  { slug: 'tibetan-nomad', priority: 0.9 },
];

export default function sitemap() {
  const entries: {
    url: string;
    lastModified: Date;
    changeFrequency: 'weekly' | 'monthly';
    priority: number;
  }[] = [];

  for (const locale of locales) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'weekly',
      priority: 1,
    });
    entries.push({
      url: `${SITE_URL}/${locale}/booking`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}/routes/${route.slug}`,
        lastModified: CONTENT_UPDATED,
        changeFrequency: 'monthly',
        priority: route.priority,
      });
    }
  }

  return entries;
}
