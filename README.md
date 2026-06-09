# Professional Profile

Personal portfolio website with a JD Matcher feature. The site is served from `dist/` by an Express server that also handles the API.

## Quick start

```bash
npm install
cp .env.example .env
# Add your DeepSeek API key to .env
npm start
```

Open **http://localhost:3001**

## Environment variables

Copy `.env.example` to `.env`:

```
DEEPSEEK_API_KEY=your_key_here
PORT=3001
```

- `DEEPSEEK_API_KEY` — server-side only, never exposed to the browser
- `PORT` — optional, defaults to 3001

Never commit `.env`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Production server (serves `dist/` + `/api`) |
| `npm run dev` | Development server with auto-restart |
| `npm run check` | Start server once (smoke test) |
| `npm run build:frontend` | Rebuild `dist/` from `src/` (optional, requires devDependencies) |

## How it works

- Express serves static files from `dist/` (HTML, CSS, JS, PDFs, images)
- `POST /api/jd-match` — JD analysis (DeepSeek called server-side only)
- `GET /api/jd-match/remaining` — rate limit status
- Non-API routes fall back to `dist/index.html`
- If `DEEPSEEK_API_KEY` is missing, the site still loads; only JD Matcher shows an error

## Deployment (Replit, VPS, etc.)

```bash
npm install --production
cp .env.example .env
# set DEEPSEEK_API_KEY
npm start
```

**Do not deploy `dist/` alone** — the JD Matcher requires the Express server.

## Optional: edit frontend source

The full React source lives in `src/`. To rebuild after UI changes:

```bash
npm install          # includes devDependencies
npm run build:frontend
npm start
```

## Security

- API key is read only from `process.env.DEEPSEEK_API_KEY` in `server/jdMatcher.js`
- Frontend calls `/api/jd-match` only — no direct DeepSeek requests
- No `VITE_` prefixed secrets
