import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';

const svgSource = fs.readFileSync('public/logo.svg', 'utf8');

// A square variant of the logo for profile pictures
const squareSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="mountainGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1F1F1F"/>
      <stop offset="100%" stop-color="#3A3A3A"/>
    </linearGradient>
    <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8C3B2E"/>
      <stop offset="100%" stop-color="#B85C4E"/>
    </linearGradient>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E8E1D9"/>
      <stop offset="100%" stop-color="#F2EFEA"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bgGrad)" rx="0"/>

  <!-- Mountain range centered -->
  <polygon points="140,340 220,250 280,300 340,235 400,340" fill="#D0C8BD" opacity="0.5"/>
  <polygon points="360,340 430,260 470,290 530,240 580,340" fill="#D0C8BD" opacity="0.4"/>
  <polygon points="60,420 160,295 220,330 290,270 360,320 400,280 480,340 540,300 620,350 680,325 740,420" fill="url(#mountainGrad)"/>

  <!-- Journey path -->
  <path d="M 80,395 Q 160,380 220,340 Q 270,308 300,312 Q 340,318 380,335 Q 430,355 490,335 Q 540,318 580,340 Q 620,358 680,348"
        fill="none" stroke="url(#pathGrad)" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="80" cy="395" r="2.8" fill="#8C3B2E"/>
  <line x1="680" y1="348" x2="700" y2="345" stroke="#8C3B2E" stroke-width="1.2" stroke-linecap="round"/>

  <!-- Brand name -->
  <text x="400" y="530" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-size="40" font-weight="300" letter-spacing="10" fill="#1F1F1F"
        text-anchor="middle">CHENGDU JOURNEYS</text>

  <!-- Tagline -->
  <text x="400" y="560" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-size="12" font-weight="400" letter-spacing="5" fill="#8C3B2E"
        text-anchor="middle">WESTERN SICHUAN · BESPOKE TRAVEL</text>

  <line x1="310" y1="505" x2="490" y2="505" stroke="#1F1F1F" stroke-width="0.5" opacity="0.3"/>
</svg>`;

const formats = [
  { name: 'logo-1200x600',    svg: svgSource, width: 1200 },
  { name: 'logo-1024x1024',   svg: squareSvg, width: 1024 },
  { name: 'logo-1500x500',    svg: svgSource, width: 1500 },
  { name: 'logo-512x512',     svg: squareSvg, width: 512 },
  { name: 'logo-800x400',     svg: svgSource, width: 800 },
];

const outDir = 'public/brand';
fs.mkdirSync(outDir, { recursive: true });

for (const { name, svg, width } of formats) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
  });
  const pngData = resvg.render();
  const buf = pngData.asPng();
  const filepath = path.join(outDir, `${name}.png`);
  fs.writeFileSync(filepath, buf);
  console.log(`${name}.png — ${(buf.length / 1024).toFixed(0)} KB`);
}

console.log(`\nDone! ${formats.length} files in ${outDir}/`);
