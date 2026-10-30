/**
 * Inject the /tibet-without-permit copy into messages/*.json.
 *
 * Same contract as apply-reposition.mjs: the JSON files are the runtime source
 * of truth, this script is the way to write them, and it is idempotent — run it
 * twice and the second run changes nothing.
 *
 * It also asserts the four locales end up with identical key paths, because a
 * missing FAQ answer in Thai is invisible until a Thai reader hits it.
 */
import fs from 'node:fs';
import path from 'node:path';
import copy from './landing-copy.mjs';

const ROOT = process.cwd();
const LOCALES = ['en', 'zh', 'es', 'th'];

/** Every leaf path in an object, with array indices spelled out. */
function paths(obj, prefix = '', out = []) {
  for (const [k, v] of Object.entries(obj)) {
    const here = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (item && typeof item === 'object') paths(item, `${here}[${i}]`, out);
        else out.push(`${here}[${i}]`);
      });
    } else if (v && typeof v === 'object') {
      paths(v, here, out);
    } else {
      out.push(here);
    }
  }
  return out;
}

const expected = paths(copy.en).sort().join('\n');

for (const locale of LOCALES) {
  const file = path.join(ROOT, 'messages', `${locale}.json`);
  const messages = JSON.parse(fs.readFileSync(file, 'utf8'));

  const page = copy[locale];
  if (!page) throw new Error(`missing copy for ${locale}`);

  // A locale with a different shape would produce blank sections rather than
  // an error, so refuse to write one.
  const actual = paths(page).sort().join('\n');
  if (actual !== expected) {
    const mine = new Set(paths(page));
    const theirs = new Set(paths(copy.en));
    throw new Error(
      `${locale}: copy shape differs from en — missing ${[...theirs]
        .filter((p) => !mine.has(p))
        .slice(0, 5)}, extra ${[...mine].filter((p) => !theirs.has(p)).slice(0, 5)}`
    );
  }

  messages.permitPage = page;
  messages.seoPagesExtra = messages.seoPagesExtra || {};
  messages.seoPagesExtra.permitPageTitle = page.seo.title;
  messages.seoPagesExtra.permitPageDesc = page.seo.desc;

  fs.writeFileSync(file, `${JSON.stringify(messages, null, 2)}\n`, 'utf8');
  console.log(`${locale}: ${paths(page).length} strings injected`);
}
