# Professional Profile

Local copy of your Replit portfolio, recovered from a Safari web archive.

## Setup

```bash
cd ~/professional-profile
npm install
cp .env.example .env
# Edit .env and add your DeepSeek API key (https://platform.deepseek.com/)
npm run dev
```

Open http://localhost:5173

### Hero JD Matcher

The hero section includes a **JD Matcher** for recruiters: paste a job description, and DeepSeek analyzes fit against Chao's profile.

1. Copy `.env.example` to `.env`
2. Set `VITE_DEEPSEEK_API_KEY` with your key from [DeepSeek Platform](https://platform.deepseek.com/)
3. Restart the dev server after changing `.env`

Never commit `.env` — it is gitignored. The API key is read at build time via Vite env vars.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

- `src/pages/Home.tsx` — main portfolio page (EN/中文 content)
- `src/components/JDMatcher.tsx` — hero JD Matcher UI
- `src/lib/jdMatcher.ts` — DeepSeek API integration
- `src/data/profile.ts` — candidate profile for matcher prompts
- `attached_assets/` — profile photo
- `public/` — static files (resumes)

## Notes

- Resume PDFs should live in `public/resume-en.pdf` and `public/resume-zh.pdf`.
- Exported from Replit dev session via Safari web archive on 2026-06-06.
