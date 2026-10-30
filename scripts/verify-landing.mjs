/**
 * Verification for /[locale]/tibet-without-permit.
 *
 *   node scripts/verify-landing.mjs [baseUrl]
 *
 * What is worth asserting here is not "the page loads". It is:
 *
 *   - the four locales all render the same number of regions, barriers, limits,
 *     places, table rows and FAQ answers (a locale that lost one is invisible
 *     until a reader hits it);
 *   - the FAQPage markup carries exactly the questions that are visible in the
 *     DOM — Google treats structured data that disagrees with the page as spam,
 *     and the easiest way to break that is to edit one and not the other;
 *   - canonical and hreflang point at the right URLs;
 *   - nothing scrolls sideways at 390 px, where the comparison table is the
 *     obvious candidate to overflow;
 *   - the dark "what you give up" block is legible (≥ 4.5:1), since it is the
 *     only inverted section on the page;
 *   - the homepage links here, and no longer promises Larung Gar.
 *
 * Negative control — point LP_PATH at a page without the sections and the
 * browser assertions must go red:
 *
 *   LP_PATH=/en/about node scripts/verify-landing.mjs
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';

const BASE = process.argv[2] || 'http://localhost:3000';
const FORCED_PATH = process.env.LP_PATH || '';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9336;
const LOCALES = ['en', 'zh', 'es', 'th'];
const PAGE = 'tibet-without-permit';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let pass = 0;
let fail = 0;
const failures = [];
function check(ok, label, detail) {
  if (ok) {
    pass++;
    console.log('PASS  ' + label);
  } else {
    fail++;
    failures.push(label + (detail ? '  [' + detail + ']' : ''));
    console.log('FAIL  ' + label + (detail ? '  [' + detail + ']' : ''));
  }
}

function get(u) {
  return new Promise((r) => {
    const q = http.get(u, (s) => {
      let d = '';
      s.setEncoding('utf8');
      s.on('data', (c) => (d += c));
      s.on('end', () => r(d));
    });
    q.on('error', () => r(''));
    q.setTimeout(20000, () => {
      q.destroy();
      r('');
    });
  });
}

(async () => {
  // ---- static: the copy itself ----
  for (const locale of LOCALES) {
    const m = JSON.parse(fs.readFileSync(`messages/${locale}.json`, 'utf8'));
    const p = m.permitPage;
    check(!!p, `${locale}: permitPage copy exists`);
    if (!p) continue;
    check(p.faq.items.length === 6, `${locale}: six FAQ answers`, String(p.faq.items.length));
    check(p.regions.cards.length === 3, `${locale}: three regions`, String(p.regions.cards.length));
    check(p.limits.items.length === 5, `${locale}: five honest limits`, String(p.limits.items.length));
    check(p.instead.items.length === 6, `${locale}: six places on this side`, String(p.instead.items.length));
    check(p.table.rows.length === 6, `${locale}: six comparison rows`, String(p.table.rows.length));
    check(p.seo.title.length <= 62, `${locale}: title fits a SERP`, `${p.seo.title.length} chars`);
    check(p.seo.desc.length <= 165, `${locale}: description fits a SERP`, `${p.seo.desc.length} chars`);
    // The dark block cannot use the site brick: #8C3B2E on #1F1F1F is 2.2:1.
    // If someone "tidies" the copy to mention it, this catches the regression.
    check(!p.limits.note.includes('#8C3B2E'), `${locale}: no low-contrast token leaked into copy`);
  }

  // ---- sitemap ----
  const sitemap = await get(`${BASE}/sitemap.xml`);
  for (const locale of LOCALES) {
    check(
      sitemap.includes(`/${locale}/${PAGE}`),
      `sitemap lists /${locale}/${PAGE}`
    );
  }

  // ---- browser ----
  const proc = spawn(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--remote-debugging-port=' + PORT,
      '--no-first-run',
      '--user-data-dir=' + path.join(os.tmpdir(), '_lp-verify-' + process.pid),
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  let targets = null;
  for (let i = 0; i < 40; i++) {
    const raw = await get(`http://127.0.0.1:${PORT}/json/list`);
    try {
      targets = JSON.parse(raw);
      if (targets.length) break;
    } catch (e) {}
    await sleep(400);
  }
  const pg = targets && targets.find((x) => x.type === 'page');
  if (!pg) throw new Error('no page target');

  const ws = new WebSocket(pg.webSocketDebuggerUrl);
  let id = 0;
  const pend = new Map();
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) {
      pend.get(m.id)(m);
      pend.delete(m.id);
    }
  };
  const S = (method, params) =>
    new Promise((r) => {
      const i = ++id;
      pend.set(i, r);
      ws.send(JSON.stringify({ id: i, method, params }));
    });
  const evaluate = async (expression) => {
    const r = await S('Runtime.evaluate', { expression, returnByValue: true });
    return r && r.result && r.result.result ? r.result.result.value : undefined;
  };

  await S('Page.enable');
  await S('Runtime.enable');

  const measure = async (locale, w) => {
    await S('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: 900,
      deviceScaleFactor: 1,
      mobile: w < 500,
    });
    await S('Page.navigate', { url: `${BASE}${FORCED_PATH || `/${locale}/${PAGE}`}` });

    /*
      Wait for a styled page, not merely a parsed one. Selector presence only
      proves the HTML arrived; measuring before the stylesheet lands reads the
      unstyled document and has already produced false failures once on this
      project (a nav that "wrapped" at 1024). `position: fixed` on the nav comes
      only from Tailwind, and text width depends on the web font.
    */
    for (let i = 0; i < 60; i++) {
      const styled = await evaluate(`(() => {
        const nav = document.querySelector('nav');
        if (!nav) return document.readyState === 'complete';
        return getComputedStyle(nav).position === 'fixed'
          && document.fonts.status === 'loaded';
      })()`);
      if (styled) break;
      await sleep(250);
    }

    return evaluate(`(() => {
      const q = (s) => document.querySelector(s);
      const all = (s) => Array.from(document.querySelectorAll(s));
      const text = (el) => (el ? el.textContent.replace(/\\s+/g, ' ').trim() : '');

      const lum = (rgb) => {
        const [r, g, b] = rgb.map((v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const parse = (s) => (s.match(/[\\d.]+/g) || []).map(Number);
      const ratio = (fg, bg) => {
        const a = parse(fg).slice(0, 3);
        const b = parse(bg).slice(0, 3);
        const L1 = lum(a);
        const L2 = lum(b);
        return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      };

      const limits = q('#limits');
      const limitLi = limits ? limits.querySelector('li') : null;
      const limitBg = limits ? getComputedStyle(limits).backgroundColor : '';

      const ld = all('script[type="application/ld+json"]')
        .map((s) => {
          try { return JSON.parse(s.textContent); } catch (e) { return null; }
        })
        .filter(Boolean);

      const faqLd = ld.find((x) => x['@type'] === 'FAQPage');
      const crumbLd = ld.find((x) => x['@type'] === 'BreadcrumbList');

      const canon = q('link[rel="canonical"]');

      return {
        h1: all('h1').length,
        h1Text: text(q('h1')),
        regions: all('#map article').length,
        barriers: all('#barriers h3').length,
        limits: all('#limits li').length,
        places: all('#instead h3').length,
        rows: all('#compare tbody tr').length,
        /*
          No-overflow is not the same as no-clipping: at 390 a three-column
          table fits the viewport and is still unreadable, one word per line.
          Below md the table stacks, so a body cell should be almost the full
          column width. If someone deletes the max-md classes this drops to
          about 90 px and the assertion catches it.
        */
        compareCell: (() => {
          const td = document.querySelector('#compare tbody td');
          return td ? Math.round(td.getBoundingClientRect().width) : 0;
        })(),
        qa: all('#faq dt').length,
        answers: all('#faq dd').length,
        faqLdCount: faqLd && faqLd.mainEntity ? faqLd.mainEntity.length : -1,
        // Every structured question must exist verbatim in the visible DOM.
        faqLdMatchesDom:
          faqLd && faqLd.mainEntity
            ? faqLd.mainEntity.every((e) => all('#faq dt').some((dt) => text(dt) === e.name))
            : false,
        crumbCount: crumbLd ? crumbLd.itemListElement.length : -1,
        crumbLast: crumbLd ? crumbLd.itemListElement[crumbLd.itemListElement.length - 1].item : '',
        canonical: canon ? canon.getAttribute('href') : '',
        hreflang: all('link[rel="alternate"][hreflang]').length,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        limitsContrast: limitLi ? ratio(getComputedStyle(limitLi).color, limitBg) : 0,
        title: document.title,
        desc: (q('meta[name="description"]') || {}).content || '',
      };
    })()`);
  };

  for (const locale of LOCALES) {
    for (const w of [1440, 390]) {
      const r = await measure(locale, w);
      if (!r) {
        check(false, `${locale} ${w}: page measured`);
        continue;
      }
      check(r.h1 === 1, `${locale} ${w}: exactly one h1`, String(r.h1));
      check(r.h1Text.length > 10, `${locale} ${w}: h1 has text`, r.h1Text.slice(0, 30));
      check(r.overflow <= 1, `${locale} ${w}: no horizontal overflow`, String(r.overflow));
      check(r.regions === 3, `${locale} ${w}: three region cards`, String(r.regions));
      check(r.barriers === 4, `${locale} ${w}: four barriers`, String(r.barriers));
      check(r.limits === 5, `${locale} ${w}: five limits rendered`, String(r.limits));
      check(r.places === 6, `${locale} ${w}: six places rendered`, String(r.places));
      check(r.rows === 6, `${locale} ${w}: comparison table has six rows`, String(r.rows));
      if (w === 390) {
        check(
          r.compareCell >= 240,
          `${locale} 390: comparison table stacks instead of squeezing`,
          `${r.compareCell}px`
        );
      }
      check(r.qa === 6 && r.answers === 6, `${locale} ${w}: six FAQ pairs`, `${r.qa}/${r.answers}`);
      check(r.faqLdCount === 6, `${locale} ${w}: FAQPage markup has six questions`, String(r.faqLdCount));
      check(r.faqLdMatchesDom, `${locale} ${w}: FAQ markup matches the visible questions`);
      check(r.crumbCount === 2, `${locale} ${w}: breadcrumb markup has two levels`, String(r.crumbCount));
      check(
        r.crumbLast.endsWith(`/${locale}/${PAGE}`),
        `${locale} ${w}: breadcrumb points at this page`,
        r.crumbLast
      );
      check(
        r.canonical === `/${locale}/${PAGE}` || r.canonical.endsWith(`/${locale}/${PAGE}`),
        `${locale} ${w}: canonical is self-referential`,
        r.canonical
      );
      check(r.hreflang >= 5, `${locale} ${w}: hreflang covers four locales + x-default`, String(r.hreflang));
      check(r.limitsContrast >= 4.5, `${locale} ${w}: dark block text clears 4.5:1`, r.limitsContrast.toFixed(2));
      check(r.title.length > 0 && r.title.length <= 70, `${locale} ${w}: document title is set and short`, `${r.title.length}`);
      check(r.desc.length >= 40, `${locale} ${w}: meta description is present`, `${r.desc.length}`);
    }
  }

  // ---- the homepage has to point here, and has to stop promising Larung Gar ----
  for (const locale of LOCALES) {
    const html = await get(`${BASE}/${locale}`);
    const permitBlock = html.includes('id="permit"');
    check(permitBlock, `${locale}: homepage still has the permit block`);
    check(
      html.includes(`/${locale}/${PAGE}`),
      `${locale}: homepage links to the landing page`
    );
    const landMatch = html.match(/id="land"[\s\S]{0,6000}/);
    const land = landMatch ? landMatch[0] : '';
    check(
      !/Larung Gar|色达|喇荣|Sêrtar|เซ่อต๋า/.test(land),
      `${locale}: the land section no longer promises Larung Gar`
    );
  }

  ws.close();
  proc.kill();

  console.log(`\nTOTAL ${pass + fail}   PASS ${pass}   FAIL ${fail}`);
  if (fail) {
    console.log('FAILURES:');
    for (const f of failures) console.log('  - ' + f);
    process.exitCode = 1;
  } else {
    console.log('LANDING OK');
  }
  process.exit(process.exitCode || 0);
})();
