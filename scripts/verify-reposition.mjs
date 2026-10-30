/**
 * Verification for the repositioned homepage.
 *
 *   node scripts/verify-reposition.mjs [baseUrl]
 *
 * Asserts the things that would actually break: the new sections exist in all
 * four locales, the page does not scroll sideways on a phone, the comparison
 * table renders every row, the document still has one and only one h1, and the
 * four message files are structurally identical.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';

const BASE = process.argv[2] || 'http://localhost:3000';
/**
 * Negative control. Set RP_PATH to a route that does NOT carry the new
 * sections (e.g. /en/about) and the browser assertions must go red — an
 * assertion that has never failed is not evidence of anything.
 *
 *   RP_PATH=/en/about node scripts/verify-reposition.mjs
 */
const FORCED_PATH = process.env.RP_PATH || '';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9334;
const LOCALES = ['en', 'zh', 'es', 'th'];
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

/** Deep key-path comparison, so a missing translation fails here and not in prod. */
function keyPaths(o, prefix = '', out = []) {
  for (const [k, v] of Object.entries(o)) {
    const q = prefix ? prefix + '.' + k : k;
    if (Array.isArray(v)) {
      v.forEach((x, i) => {
        if (x && typeof x === 'object') keyPaths(x, q + '[' + i + ']', out);
        else out.push(q + '[' + i + ']');
      });
    } else if (v && typeof v === 'object') {
      keyPaths(v, q, out);
    } else {
      out.push(q);
    }
  }
  return out;
}

(async () => {
  // ---- static checks first: no browser needed ----
  const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
  const enPaths = keyPaths(en);
  for (const l of LOCALES) {
    if (l === 'en') continue;
    const other = new Set(
      keyPaths(JSON.parse(fs.readFileSync(`messages/${l}.json`, 'utf8')))
    );
    const missing = enPaths.filter((p) => !other.has(p));
    check(
      missing.length === 0,
      `messages/${l}.json has every key en.json has`,
      missing.length ? missing.slice(0, 3).join(', ') : ''
    );
  }
  check(
    enPaths.length ===
      keyPaths(JSON.parse(fs.readFileSync('messages/zh.json', 'utf8'))).length,
    'zh.json key count matches en.json',
    String(enPaths.length)
  );

  // ---- browser checks ----
  const proc = spawn(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--remote-debugging-port=' + PORT,
      '--no-first-run',
      '--user-data-dir=' + path.join(os.tmpdir(), '_rp-verify-' + process.pid),
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  let targets = null;
  for (let i = 0; i < 40; i++) {
    const raw = await get('http://127.0.0.1:' + PORT + '/json/list');
    try {
      targets = JSON.parse(raw);
      if (targets.length) break;
    } catch (e) {}
    await sleep(400);
  }
  const pg = targets.find((x) => x.type === 'page');
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

  const layout = async (locale, w) => {
    await S('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: 900,
      deviceScaleFactor: 1,
      mobile: w < 500,
    });
    await S('Page.navigate', { url: `${BASE}${FORCED_PATH || '/' + locale}` });

    /*
      Wait for a *styled* page, not merely a parsed one.

      #who existing only proves the HTML arrived. On a cold production request
      the stylesheet lands a beat later, and anything measured in that window
      reads the unstyled document — nav items stacked, header 137px instead of
      65px. Running this against https://chengdujourneys.com produced four
      false "header keeps one row" failures that way, while a manual re-probe
      a second later measured 65px every time.

      `position: fixed` on the nav comes only from Tailwind's `fixed` utility,
      and `document.fonts.status === 'loaded'` covers the web font, which
      changes every text width. Both are real conditions rather than a sleep.

      The gate deliberately does not require #who: the negative control points
      at a page that has no such section, and should reach the assertions
      quickly to report the missing sections.
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
      const q = (s) => !!document.querySelector(s);

      /*
        Contrast is measured here rather than trusted to the stylesheet. The
        three-region block is the only dark section on the site, so it is the
        only place where the site-wide brick #8C3B2E cannot be reused for text
        (2.2:1 on #1F1F1F). If someone "tidies" the colours back to the shared
        token, this is the assertion that catches it.
      */
      const lum = (c) => {
        const [r, g, b] = c.map((v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const parse = (s) => {
        const m = (s.match(/[\\d.]+/g) || []).map(Number);
        return { rgb: m.slice(0, 3), a: m.length > 3 ? m[3] : 1 };
      };
      const ratio = (fgS, bgS) => {
        const fg = parse(fgS);
        const bg = parse(bgS);
        const flat = fg.rgb.map((v, i) => v * fg.a + bg.rgb[i] * (1 - fg.a));
        const L1 = lum(flat);
        const L2 = lum(bg.rgb);
        return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      };

      const three = document.querySelector('#three');
      const threeBg = three ? getComputedStyle(three).backgroundColor : '';
      const whereEl = three ? three.querySelector('article p') : null;
      const cards = three ? Array.from(three.querySelectorAll('article')) : [];

      return {
        permit: q('#permit'),
        three: q('#three'),
        why: q('#why'),
        land: q('#land'),
        who: q('#who'),
        rows: document.querySelectorAll('#why .grid').length,
        h1: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        title: document.title,
        kicker: (document.querySelector('h1') ? document.querySelector('h1').previousElementSibling.textContent.trim() : ''),

        threeBg,
        cardCount: cards.length,
        regionNames: cards.map((c) => (c.querySelector('h3') || {}).textContent || ''),
        regionStatuses: cards.map((c) => {
          const p = c.querySelectorAll('p');
          return p.length ? p[p.length - 1].textContent.trim() : '';
        }),
        splitRule: cards.length === 3
          ? (getComputedStyle(cards[2].querySelector('span')).backgroundImage || '')
          : '',
        smallContrast: whereEl ? ratio(getComputedStyle(whereEl).color, threeBg) : 0,
        navThree: document.querySelectorAll('nav a[href$="#three"]').length,
        navOverflow: (() => {
          const n = document.querySelector('nav');
          return n ? n.scrollWidth - n.clientWidth : -1;
        })(),
        headerH: Math.round(document.querySelector('nav').getBoundingClientRect().height),
      };
    })()`);
  };

  let headerAt1440 = 0;
  for (const l of LOCALES) {
    const r = await layout(l, 1440);
    check(
      r && r.three && r.permit && r.why && r.land && r.who,
      `${l} 1440: all five new sections render`
    );
    check(r && r.h1 === 1, `${l} 1440: exactly one h1`, r ? String(r.h1) : '');
    check(
      r && r.rows >= 8,
      `${l} 1440: comparison table renders 8 rows`,
      r ? String(r.rows) : ''
    );
    check(
      r && r.overflow <= 1,
      `${l} 1440: no horizontal overflow`,
      r ? String(r.overflow) : ''
    );
    check(r && r.kicker && r.kicker.length > 3, `${l}: hero kicker is set`);

    // ---- the three-region block ----
    check(r && r.cardCount === 3, `${l}: three regions are rendered`, r ? String(r.cardCount) : '');
    // The Chinese names are locale-invariant on purpose: a reader who lands in
    // Spanish still leaves knowing the words 卫藏 / 安多 / 康巴.
    const names = r ? r.regionNames.join('') : '';
    check(
      ['卫藏', '安多', '康巴'].every((n) => names.includes(n)),
      `${l}: names all three regions in Chinese`,
      names.replace(/\s+/g, ' ')
    );
    check(
      r && r.regionStatuses.filter((s) => s && s.length > 2).length === 3,
      `${l}: every region carries a permit status`,
      r ? r.regionStatuses.join(' | ') : ''
    );
    check(
      r && /gradient/.test(r.splitRule),
      `${l}: Kham is drawn as split, not as one label`,
      r ? r.splitRule.slice(0, 60) : ''
    );
    check(
      r && r.smallContrast >= 4.5,
      `${l}: smallest text on the dark block clears 4.5:1`,
      r ? r.smallContrast.toFixed(2) + ':1' : ''
    );
    // Two, not one: the desktop row and the burger menu each carry their own
    // anchor, so the section stays reachable at every breakpoint.
    check(r && r.navThree >= 1, `${l}: the section is reachable from the nav`, r ? String(r.navThree) : '');
    if (l === 'en') headerAt1440 = r.headerH;

    const m = await layout(l, 390);
    check(
      m && m.overflow <= 1,
      `${l} 390: no horizontal overflow`,
      m ? String(m.overflow) : ''
    );
    check(
      m && m.three && m.permit && m.why && m.land && m.who,
      `${l} 390: all five new sections render`
    );

    // A sixth nav link is the kind of change that breaks at exactly 1024px and
    // nowhere else: the wordmark and the links share one flex row that only
    // appears at `lg`. If they no longer fit, the header grows instead of the
    // page scrolling sideways, so measure the header itself.
    const t = await layout(l, 1024);
    check(t && t.overflow <= 1, `${l} 1024: no horizontal overflow`, t ? String(t.overflow) : '');
    check(t && t.navOverflow <= 1, `${l} 1024: nav does not overflow`, t ? String(t.navOverflow) : '');
    check(
      t && Math.abs(t.headerH - headerAt1440) <= 2,
      `${l} 1024: header keeps one row`,
      t ? `${t.headerH}px vs ${headerAt1440}px` : ''
    );
  }

  // The positioning has to reach the search snippet, not just the page body.
  const enPage = await layout('en', 1440);
  check(
    /Tibet Without the Permit/i.test(enPage.title),
    'en: <title> carries the new positioning',
    enPage.title
  );
  const zhPage = await layout('zh', 1440);
  check(
    /入藏函/.test(zhPage.title),
    'zh: <title> carries the new positioning',
    zhPage.title
  );

  ws.close();
  proc.kill();

  console.log('');
  console.log(`TOTAL ${pass + fail}   PASS ${pass}   FAIL ${fail}`);
  if (fail) {
    console.log('FAILURES:');
    failures.forEach((f) => console.log('  - ' + f));
    process.exit(1);
  }
  console.log('REPOSITION OK');
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
