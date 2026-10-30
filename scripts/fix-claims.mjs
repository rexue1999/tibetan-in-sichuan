/**
 * Two claims that had to be corrected, plus one that had to be softened.
 *
 * 1. The second card in `land.items` promised the reader Larung Gar. Under the
 *    current rules foreign passport holders are not admitted to the viewing
 *    areas — the academy's own reservation system requires a Chinese ID — so
 *    the card was promising, on the homepage, the one thing on this side of the
 *    border that a foreign guest cannot actually see. The site's own Seda guide
 *    already said so ("Can foreign tourists visit Larung Gar in 2026? ...
 *    generally no"), which made the homepage and the guide contradict each
 *    other. Replaced with Litang, which is open, is on the G318, and makes the
 *    same point about altitude and working monastery towns.
 *
 * 2. The comparison table said driving in Kham was simply "Permitted". China
 *    does not recognise an international driving permit and a foreign licence
 *    is not valid, so a reader could reasonably arrive expecting to rent a car
 *    and drive. The row now says what is true: possible with a Chinese licence,
 *    and a driver is the norm.
 *
 * Run after editing, then re-run apply-reposition.mjs — this patches the copy
 * source, not the messages.
 */
import fs from 'node:fs';

const FILE = 'scripts/reposition-copy.json';
const copy = JSON.parse(fs.readFileSync(FILE, 'utf8'));

const litang = {
  en: {
    name: 'Litang',
    meta: '4,010 m · Garzê',
    text: 'A town at four thousand metres where the grassland reaches the main street. The monastery above it dates from 1580; in August the horse fair draws Khampa riders from every pasture.',
  },
  zh: {
    name: '理塘',
    meta: '4,010 米 · 甘孜',
    text: '四千米的县城，草原一直铺到主街。山上的长青春科尔寺建于 1580 年；八月赛马会，康巴骑手从各处牧场赶来。',
  },
  es: {
    name: 'Litang',
    meta: '4.010 m · Garzê',
    text: 'Una villa a cuatro mil metros donde la pradera llega a la calle principal. El monasterio de arriba es de 1580; en agosto la feria del caballo trae jinetes khampa de todos los pastos.',
  },
  th: {
    name: 'หลี่ถัง',
    meta: '4,010 ม. · กานจื',
    text: 'เมืองที่ความสูงสี่พันเมตร ทุ่งหญ้าไหลมาถึงถนนสายหลัก อารามบนเนินสร้างปี 1580 และงานแข่งม้าเดือนสิงหาคมดึงนักขี่คัมมาจากทุกทุ่ง',
  },
};

const driving = {
  en: 'Possible with a Chinese licence; a driver is the norm',
  zh: '持中国驾照可以自驾；通常配司机',
  es: 'Posible con carné chino; lo normal es chófer',
  th: 'ขับเองได้ถ้ามีใบขับขี่จีน ปกติมีคนขับ',
};

for (const locale of Object.keys(litang)) {
  const branch = copy[locale];

  const card = branch.land.items[2];
  const wasLarung = /Larung|色达|เซ่อต๋า/.test(`${card.name} ${card.meta}`);
  if (!wasLarung) throw new Error(`${locale}: land.items[2] is not the Larung Gar card`);
  branch.land.items[2] = { ...litang[locale] };

  const row = branch.compare.rows[3];
  // Guard the index: if the row order ever changes, fail loudly rather than
  // silently rewriting the wrong line of the table.
  if (!/Driving|自驾|Conducir|ขับรถ/.test(row.k)) {
    throw new Error(`${locale}: rows[3] is "${row.k}", expected the driving row`);
  }
  row.kham = driving[locale];
}

fs.writeFileSync(FILE, `${JSON.stringify(copy, null, 2)}\n`, 'utf8');
console.log('land card and driving row corrected in four locales');
