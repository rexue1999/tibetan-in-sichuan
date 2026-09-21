import { locales } from '../i18n';
import { SITE_URL } from '../lib/seo';
import { guideSlugs } from '../content/guides';
import { publishedReviews } from '../content/reviews';

/**
 * Content revision date. Bump this when route copy or page content changes so
 * crawlers see a meaningful lastmod instead of a timestamp that shifts on every
 * deploy (which Google learns to ignore).
 */
const CONTENT_UPDATED = new Date('2026-09-20');

/** Guide articles were added on this date. */
const GUIDES_UPDATED = new Date('2026-09-21');

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
    entries.push({
      url: `${SITE_URL}/${locale}/about`,
      lastModified: GUIDES_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    });

    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}/routes/${route.slug}`,
        lastModified: CONTENT_UPDATED,
        changeFrequency: 'monthly',
        priority: route.priority,
      });
    }

    // Guides hub + individual articles. These carry the long-tail search
    // traffic, so they get their own entries with a slightly higher priority
    // than generic pages.
    entries.push({
      url: `${SITE_URL}/${locale}/guides`,
      lastModified: GUIDES_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
    for (const slug of guideSlugs) {
      entries.push({
        url: `${SITE_URL}/${locale}/guides/${slug}`,
        lastModified: GUIDES_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.75,
      });
    }

    // Only list the reviews page once it actually has content on it.
    if (publishedReviews.length > 0) {
      entries.push({
        url: `${SITE_URL}/${locale}/reviews`,
        lastModified: GUIDES_UPDATED,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
