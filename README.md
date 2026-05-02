# Chengdu Journeys

Small-group journeys into Tibetan culture and the wild landscapes of Western China.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **i18n:** next-intl (EN, ZH, TH)
- **Database:** SQLite (better-sqlite3)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — defaults to Chinese locale.

### Supported Locales

| Path | Language |
|------|----------|
| `/zh` | 中文 |
| `/en` | English |
| `/th` | ไทย |

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Nav, footer, metadata
│   │   ├── page.tsx            # Home page (6 sections)
│   │   ├── route-card.tsx      # Product tier card
│   │   └── routes/[slug]/
│   │       └── page.tsx        # Route detail page
│   ├── globals.css             # Tailwind + base styles
│   └── layout.tsx              # Root layout
├── lib/
│   └── db.ts                   # SQLite queries + schema
├── i18n.ts                     # next-intl config
└── middleware.ts               # Locale detection
messages/
├── en.json                     # English translations
├── zh.json                     # Chinese translations
└── th.json                     # Thai translations
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
