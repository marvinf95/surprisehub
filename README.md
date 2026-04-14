<div align="center">
  <img src="public/surprisehub_logo.svg" width="15%" alt="SurpriseHub Banner">

  # SurpriseHub

  [![Vercel Deployed](https://img.shields.io/badge/Vercel-Deployed-brightblack?style=flat&logo=vercel&logoColor=white)](https://surprisehub.app/)
  [![Tests](https://github.com/marvinf95/surprisehub/actions/workflows/ci.yml/badge.svg)](https://github.com/marvinf95/surprisehub/actions)
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Vitest-95%25-blue?style=flat&logo=vitest&logoColor=white" />
  <img src="https://img.shields.io/badge/Playwright-E2E-green?style=flat&logo=playwright&logoColor=white" />
  
  **AI-powered gift suggestions** in seconds! Enter age, interests, budget → Get personalized ideas instantly.
</div>

## Description

Struggling to find the perfect gift? Enter a few details and get personalized, creative gift suggestions instantly. Perfect for birthdays, holidays, or any special occasion!

SurpriseHub is an AI-powered gift idea generator.  
Provide age, relationship, budget, interests, and occasion, and receive personalized, creative gift ideas in seconds.

### Features

- AI-generated gift suggestions tailored to the recipient
- Customizable filters: age, relationship, budget, interests, occasion
- Affiliate product links for easy shopping
- Export ideas as PDF
- Send gift ideas via email
- Copy individual ideas to clipboard

### Architecture

- **Frontend**: Next.js 14 with React client components
- **AI**: Groq (OpenAI-compatible API) for generating gift ideas
- **Database**: Upstash Redis for caching and rate limiting
- **Email**: Resend for transactional emails
- **Deployment**: Vercel

## Getting Started

### Prerequisites

1. **Groq API** - Create an account at [Groq Console](https://console.groq.com/) and generate an API key
2. **Resend** - Sign up at [Resend](https://resend.com/) for email sending. Configure your domain and add SPF/DKIM entries
3. **Upstash Redis** - Create a free Redis database at [Upstash Console](https://console.upstash.com/)
4. **Vercel** - Connect your Git repository and add your domain

### Setup

1. Clone the repository:
```bash
git clone https://github.com/marvinf95/surprisehub.git
cd surprisehub
```

2. Create a `.env.local` file:
```bash
GROQ_API_KEY=your_groq_api_key
RESEND_API_KEY=your_resend_api_key
UPSTASH_REDIS_REST_URL=your_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_redis_rest_token
```

3. Install dependencies:
```bash
npm install
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Project Structure

```
/app
├── page.js              # Route handler
├── Home.jsx             # Main UI component (client)
├── layout.js            # Root layout
├── globals.css          # Global styles
└── api
    ├── generate/
    │   └── route.js     # Gift idea generation endpoint
    └── send-email/
        └── route.js     # Email sending endpoint
```

## Testing

### Unit & Coverage Tests (Vitest)
```bash
npm test              # Run all tests
npm run test:coverage # Generate coverage report
npm run test:unit     # Unit tests only
npm run test:api      # API route tests
```

### E2E Tests (Playwright)
```bash
npm run test:e2e
```

### Manual Testing Scripts
```bash
# Test LLM connection
cd test && node test-llm.mjs

# Test backend API directly
cd test && node test-backend.mjs
```

## Monetization

SurpriseHub uses affiliate links to generate revenue:
- Amazon Associates Partner Program
- Etsy Affiliate Program
- Radbag.de and other gift retailers

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.
