# Image Assets

Photographs for the site. Everything here comes from the operator's own trips —
the library under `网站素材-旅行风光/keep` in the working directory, reviewed
frame by frame rather than bulk-imported.

## Naming

`hero-*.jpg` are the homepage carousel frames. Everything else is referenced by
exact filename from a component, so a rename is a broken image at request time
rather than a compile error. Check references before deleting:
`grep -rn "hero-bg" src/ messages/`

## The hero carousel

Five frames, cycled at 6s, paused on hover and keyboard focus. They carry the
first screen, so they are the only images on the site that must survive a
high-DPI display at full-bleed size.

| File | Source | Output | Size | Quality |
|------|--------|--------|------|---------|
| `hero-batang.jpg` | Batang grassland under blue sky, 4096×2304 | 2560×1440 | ~350KB | q82 |
| `hero-gongga.jpg` | Gongga, 7,556 m from the Tudeng pass, 4096×3072 | 2560×1440 | ~430KB | q82 |
| `hero-genie.jpg` | Genie cloud sea over the ridge, 4096×3072 | 2560×1440 | ~520KB | q82 |
| `hero-ya318.jpg` | The 318, Yajiang to Litang, 4096×3072 | 2560×1440 | ~780KB | q76 |
| `hero-potala.jpg` | The Potala Palace, Lhasa, 2000×972 | 2000×1125 | ~530KB | q82 |

Two rules govern the exports, both learned the hard way:

- **Never upscale.** The Potala source is 2000px wide; rendering it at 2560 adds
  no detail, only softness and bytes.
- **Crop at export, not in the browser.** Four of the five sources are 4:3.
  Exporting the whole frame and letting `object-fit: cover` trim it would ship
  ~2.4MB of pixels the browser immediately discards. The files are already
  16:9, cropped at the anchor chosen in `export-hero-frames.py`, so the crop
  lives in exactly one place.

Quality is per-frame. `hero-ya318.jpg` is wall-to-wall gravel and tarmac, an
unusual density of high-frequency detail, and stayed at 780KB even after the
crop; it is the one frame at q76, which is not distinguishable on a photograph
of a road.

`hero-potala.jpg` is the only non-Sichuan frame and is kept deliberately: there
is a Lhasa route, and the site should not imply otherwise.

### Recropping

The vertical anchor decides whether the subject survives. Comparing options
rather than centring:

| Frame | Anchor | Why |
|-------|--------|-----|
| `hero-ya318.jpg` | 38% | the hairpin fills the frame; at 50% the bend drops to the edge and the cut lands halfway through a car's roof |
| `hero-gongga.jpg` | 46% | keeps the 7,556 m peak in frame; centred, it is pushed into the top third |
| `hero-genie.jpg` | 48% | cloud sea stays level with the ridge |
| `hero-potala.jpg` | 44% | the palace sits above the copy panel rather than behind it |

## Gallery and card images

The 13-tile gallery and the route cards are CSS `background-image: cover`
tiles, so their sources may be any proportion — centre the subject when choosing
the crop. They are exported at 1400–1600px on the long edge, which is what they
are displayed at; there is no reason to re-export them at hero resolution.

| File | Size | Used for |
|------|------|----------|
| `wuhouhengjie.jpg` | 1000×1362 | Tibetan quarter street, Chengdu |
| `walk-tour.jpg` | 1600×2133 | Tibetan walking tour |
| `highland-trip.jpg` | 1400×1050 | Highlander trip card |
| `nomad.jpg` | 1400×933 | Nomad card |
| `litang.jpg` | 1600×900 | Litang, and the gallery lead tile |
| `gongga.jpg` | 1600×1200 | Gongga Shan |
| `tagong.jpg` | 1400×1050 | Tagong grasslands |
| `serda.jpg` | 1600×1200 | Serda |
| `grassland.jpg` | 1400×1050 | Grassland |
| `lakes.jpg` | 1400×1050 | Lakes |
| `yading.jpg` | 1400×1050 | Yading |
| `danba.jpg` | 1400×1050 | Danba |
| `muya.jpg` | 1400×1867 | Muya monastery |
| `erhai-cangshan.jpg` | 2400×1800 | Gallery — Dali, on the Yunnan itinerary |
| `meili-sunrise.jpg` | 1920×887 | Gallery + the Yunnan itinerary's hero |
| `potala-panorama.jpg` | 2200×1069 | Gallery — Lhasa |
| `lugu-lake.jpg` | 2000×1500 | Gallery — Lugu Lake |
| `dali-old-town.jpg` | 1600×1200 | Gallery — Dali |
| `ranwu-lake.jpg` | 2200×1650 | Gallery — Ranwu |
| `laigu-glacier.jpg` | 2000×1500 | Gallery — Laigu |
| `jiuzhaigou-tigerlake.jpg` | 2000×1500 | Gallery — Jiuzhaigou |

## Not used

`zheduo.jpg` is in the folder and referenced by nothing. It is kept because the
Zheduo pass crossing at 4,298m is worth having when a route page needs it, and
deleting a library file that no page happens to use yet is a smaller mistake
than re-shooting it.

## Notes

- 站点照片应体现真实行程地理 —— 不要用其他地区的图（一张大理行程配甘孜草原是地理错误）
- 首屏只有第一张 hero 图是 eager 加载的，其余懒加载；换图后确认首屏体积
- 所有图片在 `/images` 下直接访问，无 CDN 重写；`?v=` 查询串用于缓存失效

