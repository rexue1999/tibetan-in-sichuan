# Chengdu Journeys

Small-group journeys into Tibetan culture and the wild landscapes of Western China.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **i18n:** next-intl (EN, ZH, TH, ES)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to your browser language (falls back to English).

### Supported Locales

| Path | Language |
|------|----------|
| `/en` | English |
| `/es` | Español |
| `/th` | ไทย |
| `/zh` | 中文 |

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Nav, footer, metadata, JSON-LD
│   │   ├── page.tsx            # Home page (6 sections)
│   │   ├── booking/page.tsx    # Contact / booking page
│   │   ├── mobile-menu.tsx     # Mobile nav
│   │   ├── route-card.tsx      # Product tier card
│   │   └── routes/[slug]/
│   │       └── page.tsx        # Route detail page
│   ├── globals.css             # Tailwind + base styles
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # sitemap.xml
│   └── layout.tsx              # Root layout
├── i18n.ts                     # next-intl config
└── middleware.ts               # Locale detection
messages/
├── en.json                     # English translations
├── es.json                     # Spanish translations
├── th.json                     # Thai translations
└── zh.json                     # Chinese translations
```

## Brand Colors

| Token | Hex |
|-------|-----|
| Charcoal | `#1F1F1F` |
| Beige | `#E8E1D9` |
| Muted Red | `#8C3B2E` |

## Build & Deploy

```bash
npm run build
npm start
```
