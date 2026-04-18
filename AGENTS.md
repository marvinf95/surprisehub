# AGENTS.md

## Quick Start
```bash
npm install       # Install dependencies
npm run dev      # Start dev server at localhost:3000
npm test        # Run unit tests (Vitest)
npm run build    # Build for production
```

## Tech Stack
- **Next.js 16** (App Router) with React 19
- **Vitest 4** for testing
- **Groq API** for AI gift suggestions
- **Upstash Redis** for rate limiting
- **Resend** for emails
- **Vercel** for deployment

## Required Dependencies
- Node.js **20.9+** (20.9 LTS or 22.x recommended)
- Set in `.env.local`: `GROQ_API_KEY`, `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

## Important Commands
```bash
npm test              # All tests
npm run test:unit     # Client-side tests only
npm run test:api       # API route tests only
npm run test:e2e      # Playwright E2E tests
npm run build        # Production build
npm run dev          # Dev server
```

## Testing Notes
- Vitest 4.x: Use `vi.fn()` inside `vi.mock()` factory, not outside:
```js
vi.mock('openai', () => ({
  default: vi.fn(() => ({ chat: { completions: { create: vi.fn()... }}))
}));
```
- Do NOT use `vi.fn()` at top level of mock factory

## CI/CD
- GitHub Actions runs on Ubuntu with Node 22
- **Deploy**: Automatically on push to `main` via Vercel action
- Tests must pass before merge (PR required)

## Project Structure
```
/app
├── page.js           # Route handler (async - Next.js 16)
├── Home.jsx          # Main UI
├── layout.js         # Root layout
├── globals.css       # Styles
└── api
    ├── generate/   # Gift ideas endpoint
    └── send-email/ # Email sending
```

## Breaking Changes to Watch
- Next.js 16: `cookies()`, `headers()`, `params`, `searchParams` return Promises - use `await`
- Vitest 4.x: Different mock syntax than 3.x