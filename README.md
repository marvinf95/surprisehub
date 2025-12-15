# SurpriseHub 🎁

Struggling to find the perfect gift? Enter a few details and get personalized, creative gift suggestions instantly. Perfect for birthdays, holidays, or any special occasion! 🎁

SurpriseHub is an AI-powered gift idea generator.  
Provide age, relationship, budget, interests, and occasion, and receive personalized, creative gift ideas in seconds.

## Development

- Next.js 13 frontend using React client components
- Groq OpenAI API for generating gift ideas
- Modern, card-based UI with gradient background
- PDF export of results (optional) -> Future Feature

## Prerequisites

1. Create E-Mail

2. In my case i use resend to send emails from the app through the generated mail address to the users.

- In resend you need to add the domain of the email.
- In the configuration of your email you need to configure the SPF and DKIM entries

## Setup

1. Create a `.env.local` file with your Groq API key and resend API key:

```bash
GROQ_API_KEY=YOUR_GROQ_API_KEY
RESEND_API_KEY=YOUR_RESEND_API_KEY
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

## Structure

- `/app/page.js` → Frontend UI
- `/app/api/generate/route.js` → Backend API route for generating gift ideas

## Test

1. Test LLM
   With the following script you can test if the llm and the apikey is working.

```bash
cd surprisehub/test/
node test-llm.mjs
```

2. Test backend
   The following script tries to call the backend and shows the result of the backend without need of the frontend.

```bash
cd surprisehub/test/
node test-backend.mjs
```
