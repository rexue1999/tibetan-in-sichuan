/**
 * Inject the "Tibet out of Tibet" repositioning copy into messages/*.json.
 *
 * Copy lives in scripts/reposition-copy.json so the prose can be edited without
 * touching code. This script only merges: it overwrites the hero and home SEO
 * strings, adds the `permit`, `compare`, `land` and `who` namespaces, and
 * leaves every other key untouched.
 *
 *   node scripts/apply-reposition.mjs
 *
 * Idempotent — run it as often as the copy changes.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const copy = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'scripts/reposition-copy.json'), 'utf8')
);

// The three-region block lives in its own file: it is the longest copy on the
// site and the one most likely to be edited (facts, place names, statuses),
// so it should not require scrolling past the hero strings to reach.
const three = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'scripts/three-copy.json'), 'utf8')
);

// Nav labels live outside the copy files, so they are spelled out here.
const NAV_THREE = {
  en: 'Three Tibets',
  zh: '三个藏区',
  es: 'Tres Tíbet',
  th: 'สามทิเบต',
};

const REQUIRED = ['hero', 'seo', 'permit', 'compare', 'land', 'who'];

let changed = 0;
for (const [locale, c] of Object.entries(copy)) {
  const missing = REQUIRED.filter((k) => !c[k]);
  if (missing.length) {
    throw new Error(`${locale}: missing ${missing.join(', ')}`);
  }

  const file = path.join(ROOT, 'messages', `${locale}.json`);
  const m = JSON.parse(fs.readFileSync(file, 'utf8'));

  // Hero: five strings, all previously generic.
  for (const k of ['kicker', 'title', 'subtitle', 'cta', 'learnMore']) {
    m.hero[k] = c.hero[k];
  }

  // Home metadata and the site-wide description both carried the old
  // "small-group tours" positioning; search snippets are the first line of the
  // new argument, so they have to move with it.
  m.seo.tagline = c.seo.tagline;
  m.seo.description = c.seo.description;
  m.seoPages.homeTitle = c.seo.homeTitle;
  m.seoPages.homeDesc = c.seo.homeDesc;

  m.permit = c.permit;
  m.compare = c.compare;
  m.land = c.land;
  m.who = c.who;

  if (!three[locale]) throw new Error(`${locale}: missing three-copy entry`);
  m.three = three[locale];
  m.nav.three = NAV_THREE[locale];

  fs.writeFileSync(file, JSON.stringify(m, null, 2) + '\n', 'utf8');
  changed++;
  console.log(`patched messages/${locale}.json`);
}

console.log(`${changed} locales updated`);
