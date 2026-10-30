/**
 * Screenshots of the repositioned homepage.
 *
 *   node scripts/shots-reposition.mjs [baseUrl]
 *
 * Chrome DevTools Protocol directly — no Playwright, no install. Each shot is
 * clipped to a real element, so it is the layout that gets reviewed rather than
 * a full-page thumbnail nobody can read.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';

const BASE = process.argv[2] || 'http://localhost:3000';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SHOTS = [
  { name: 'rp-01-hero-en', url: '/en', w: 1440, h: 900, viewport: true },
  { name: 'rp-11-three-en', url: '/en', w: 1440, h: 900, sel: '#three' },
  { name: 'rp-02-permit-en', url: '/en', w: 1440, h: 900, sel: '#permit' },
  { name: 'rp-03-compare-en', url: '/en', w: 1440, h: 900, sel: '#why' },
  { name: 'rp-04-land-en', url: '/en', w: 1440, h: 900, sel: '#land' },
  { name: 'rp-05-who-en', url: '/en', w: 1440, h: 900, sel: '#who' },
  { name: 'rp-06-hero-zh', url: '/zh', w: 1440, h: 900, viewport: true },
  { name: 'rp-07-permit-zh', url: '/zh', w: 1440, h: 900, sel: '#permit' },
  { name: 'rp-08-compare-zh', url: '/zh', w: 1440, h: 900, sel: '#why' },
  { name: 'rp-09-compare-390', url: '/en', w: 390, h: 844, sel: '#why' },
  { name: 'rp-10-permit-390', url: '/en', w: 390, h: 844, sel: '#permit' },
  { name: 'rp-12-three-zh', url: '/zh', w: 1440, h: 900, sel: '#three' },
  { name: 'rp-13-three-390', url: '/zh', w: 390, h: 844, sel: '#three' },
  { name: 'rp-14-nav-1024', url: '/es', w: 1024, h: 900, viewport: true },
];

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
  const proc = spawn(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--remote-debugging-port=' + PORT,
      '--no-first-run',
      '--user-data-dir=' + path.join(os.tmpdir(), '_rp-shots-' + process.pid),
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

  for (const s of SHOTS) {
    await S('Emulation.setDeviceMetricsOverride', {
      width: s.w,
      height: s.h,
      deviceScaleFactor: 1,
      mobile: s.w < 500,
    });
    await S('Page.navigate', { url: BASE + s.url });

    // Wait for the section itself, not a fixed sleep: the first compile of a
    // route in dev takes seconds and the second takes none.
    const probe = s.sel
      ? `!!document.querySelector(${JSON.stringify(s.sel)})`
      : `document.readyState === 'complete'`;
    for (let i = 0; i < 160; i++) {
      if (await evaluate(probe)) break;
      await sleep(250);
    }
    await sleep(600);

    let clip;
    if (s.viewport) {
      clip = { x: 0, y: 0, width: s.w, height: s.h, scale: 1 };
    } else {
      const box = await evaluate(`(function(){
        var el = document.querySelector(${JSON.stringify(s.sel)});
        if (!el) return null;
        var r = el.getBoundingClientRect();
        return { y: Math.round(r.top + window.scrollY), h: r.height };
      })()`);
      if (!box) {
        console.log('  !! not found: ' + s.name);
        continue;
      }
      clip = {
        x: 0,
        y: box.y,
        width: s.w,
        height: Math.min(box.h, 3200),
        scale: 1,
      };
    }

    const shot = await S('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip,
    });
    if (!shot.result || !shot.result.data) {
      console.log('  !! capture failed: ' + s.name);
      continue;
    }
    fs.writeFileSync(s.name + '.png', Buffer.from(shot.result.data, 'base64'));
    console.log('  ' + s.name + '.png  ' + clip.width + 'x' + Math.round(clip.height));
  }

  ws.close();
  proc.kill();
  console.log('done');
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
