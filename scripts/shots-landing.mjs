/**
 * Screenshots of /tibet-without-permit, for eyeballing what the assertions
 * cannot see: rhythm, the dark block, and whether the table is readable at
 * 390 px once it starts scrolling.
 *
 *   node scripts/shots-landing.mjs [baseUrl]
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';

const BASE = process.argv[2] || 'http://localhost:3000';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9338;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SHOTS = [
  { name: 'lp-01-hero-en', url: '/en/tibet-without-permit', w: 1440, h: 900, viewport: true },
  { name: 'lp-02-answer-en', url: '/en/tibet-without-permit', w: 1440, h: 900, sel: '#answer' },
  { name: 'lp-03-map-en', url: '/en/tibet-without-permit', w: 1440, h: 900, sel: '#map' },
  { name: 'lp-04-limits-en', url: '/en/tibet-without-permit', w: 1440, h: 900, sel: '#limits' },
  { name: 'lp-05-compare-en', url: '/en/tibet-without-permit', w: 1440, h: 900, sel: '#compare' },
  { name: 'lp-06-faq-en', url: '/en/tibet-without-permit', w: 1440, h: 900, sel: '#faq' },
  { name: 'lp-07-hero-zh', url: '/zh/tibet-without-permit', w: 1440, h: 900, viewport: true },
  { name: 'lp-08-limits-zh', url: '/zh/tibet-without-permit', w: 1440, h: 900, sel: '#limits' },
  { name: 'lp-09-map-390', url: '/en/tibet-without-permit', w: 390, h: 844, sel: '#map' },
  { name: 'lp-10-compare-390', url: '/en/tibet-without-permit', w: 390, h: 844, sel: '#compare' },
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
      '--user-data-dir=' + path.join(os.tmpdir(), '_lp-shots-' + process.pid),
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

  for (const s of SHOTS) {
    await S('Emulation.setDeviceMetricsOverride', {
      width: s.w,
      height: s.h,
      deviceScaleFactor: 1,
      mobile: s.w < 500,
    });
    await S('Page.navigate', { url: BASE + s.url });

    const probe = s.sel
      ? `!!document.querySelector(${JSON.stringify(s.sel)})`
      : `document.readyState === 'complete'`;
    for (let i = 0; i < 120; i++) {
      if (await evaluate(probe)) break;
      await sleep(250);
    }

    // Present is not styled; see the note in verify-landing.mjs.
    for (let i = 0; i < 60; i++) {
      const styled = await evaluate(`(() => {
        const nav = document.querySelector('nav');
        const okNav = !nav || getComputedStyle(nav).position === 'fixed';
        return okNav && document.fonts.status === 'loaded';
      })()`);
      if (styled) break;
      await sleep(250);
    }
    await sleep(300);

    let clip;
    if (s.viewport) {
      clip = { x: 0, y: 0, width: s.w, height: s.h, scale: 1 };
    } else {
      const box = await evaluate(`(function(){
        var el = document.querySelector(${JSON.stringify(s.sel)});
        if (!el) return null;
        var r = el.getBoundingClientRect();
        return { y: Math.round(r.top + window.scrollY), h: Math.round(r.height) };
      })()`);
      if (!box) {
        console.log('  !! not found: ' + s.name);
        continue;
      }
      clip = { x: 0, y: box.y, width: s.w, height: Math.min(box.h, 3000), scale: 1 };
    }

    const shot = await S('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip,
    });
    if (shot && shot.result && shot.result.data) {
      fs.writeFileSync(`${s.name}.png`, Buffer.from(shot.result.data, 'base64'));
      console.log(`  ${s.name}.png  ${clip.width}x${clip.height}`);
    } else {
      console.log(`  !! capture failed: ${s.name}`);
    }
  }

  ws.close();
  proc.kill();
  console.log('done');
  process.exit(0);
})();
