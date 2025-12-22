<div align="center">
  <img src="public/surprisehub_logo.svg" width="15%" alt="SurpriseHub Banner">

  # SurpriseHub

  [![Vercel Deployed](https://img.shields.io/badge/Vercel-Deployed-brightblack?style=flat&logo=vercel&logoColor=white)](https://surprisehub.app/)
  [![Tests](https://github.com/marvinf95/surprisehub/actions/workflows/ci.yml/badge.svg)](https://github.com/marvinf95/surprisehub/actions)
  <img src="https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Vitest-95%25-blue?style=flat&logo=vitest&logoColor=white" />
  <img src="https://img.shields.io/badge/Playwright-E2E-green?style=flat&logo=playwright&logoColor=white" />
  
  🎁 **AI-powered gift suggestions** in seconds! Enter age, interests, budget → Get personalized ideas instantly.
</div>

## Description

Struggling to find the perfect gift? Enter a few details and get personalized, creative gift suggestions instantly. Perfect for birthdays, holidays, or any special occasion! 🎁

SurpriseHub is an AI-powered gift idea generator.  
Provide age, relationship, budget, interests, and occasion, and receive personalized, creative gift ideas in seconds.

### Architecture

- Next.js frontend using React client components
- Groq OpenAI API for generating gift ideas
- Modern, card-based UI with gradient background
- Export as PDF or send ideas to an email address
- Get direct links for each idea to amazon

## Development

### Prerequisites

1. Groq as AI model

   - Create a account at [Groq](https://console.groq.com/) and generate an api key.

2. Create E-Mail

3. [Resend](https://resend.com/) for sending mails
   In my case i use resend to send emails from the app through the generated mail address to the users.

   - In resend you need to add the domain of the email.
   - In the configuration of your email you need to configure the SPF and DKIM entries.

4. Create Upstash Redis

   - Login to [Upstash](https://console.upstash.com/) and create a free redis database.

5. Vercel

   - Create Account in [Vercel](https://vercel.com/)
   - Connect Git Repository in Vercel
   - Add domain

### Setup

1. Create a `.env.local` file with your Groq API key, resend API key and redis connection information:

```bash
GROQ_API_KEY=YOUR_GROQ_API_KEY
RESEND_API_KEY=YOUR_RESEND_API_KEY
UPSTASH_REDIS_REST_URL=YOUR_UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN=YOUR_UPSTASH_REDIS_REST_TOKEN
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Structure

- `/app/page.js` → Route
- `/app/Home.jsx` → Frontend UI + client
- `/app/api/generate/route.js` → Backend API route for generating gift ideas
- `/app/api/send-email/route.js` → Backend API route for sending emails with a list of generated gifts

## Test

### Unit and coverage tests

Vitest is used for the unit and coverage tests.

```bash
npm test
npm run test:coverage
npm run test:unit
npm run test:api
```

### E2E tests

Playwright is used for the e2e browser tests.

```bash
npm run test:e2e
```

### Functions to test while developing

1. Small test to test the output of the LLM
   With the following script you can test if the llm and the apikey is working.

```bash
cd test/
node test-llm.mjs
```

2. Small script to test the output of the backend
   The following script tries to call the backend and shows the result of the backend without need of the frontend.

```bash
cd test/
node test-backend.mjs
```
