import OpenAI from "openai";
import { ratelimit } from "@/lib/ratelimit";
import { z } from "zod";

const securityHeaders = {
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://surprisehub.app",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const generateSchema = z.object({
  age: z.coerce.string().trim().min(1).max(3),
  relationship: z.string().trim().min(1).max(50),
  budget: z.coerce.string().trim().min(1).max(20),
  interests: z.string().trim().min(1).max(200),
  occasion: z.string().trim().min(1).max(50),
  lang: z.string().trim().min(2).max(5).optional(),
});

export const runtime = "edge"; // required for edge runtime

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      ...securityHeaders,
      ...corsHeaders,
    },
  });
}

function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded.split(",").map((ip) => ip.trim());
    const validIp = ips.find((ip) => /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip));
    if (validIp) return validIp;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(realIp)) {
    return realIp;
  }
  return "127.0.0.1";
}

export async function POST(req) {
  const ip = getClientIp(req);

  let ratelimitResult;
  try {
    ratelimitResult = await ratelimit.limit(ip);
  } catch (err) {
    console.error("Ratelimit error:", err);
    ratelimitResult = { success: true, limit: 5, remaining: 5, reset: 0 };
  }

  const { success, limit, remaining, reset } = ratelimitResult;

  if (!success) {
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please try again later.",
      }),
      {
        status: 429,
        headers: {
          ...securityHeaders,
          ...corsHeaders,
          "X-RateLimit-Limit": limit,
          "X-RateLimit-Remaining": remaining,
          "X-RateLimit-Reset": reset,
        },
      }
    );
  }

  const body = await req.json();

  const parsed = generateSchema.safeParse(body);

  if (!parsed.success) {
    return new Response(
      JSON.stringify({
        error: "Invalid input. Please check your entries.",
      }),
      {
        status: 400,
        headers: { ...securityHeaders, ...corsHeaders },
      }
    );
  }

  const { age, relationship, budget, interests, occasion, lang } = parsed.data;

  const languageInstruction =
    lang === "de"
      ? "Antworten bitte auf Deutsch."
      : "Please answer in English.";

  const prompt = `
${languageInstruction}

Give me exactly 5 creative gift ideas for a ${age}-year-old ${relationship},
budget: ${budget}, interests: ${interests}, occasion: ${occasion}.
Number them 1 to 5.
Do NOT include explanations, commentary, or "<think>".
Output only the numbered list, one idea per line.
`;

  try {
    const response = await client.chat.completions.create({
      model: "qwen/qwen3-32b",
      messages: [
        {
          role: "system",
          content:
            "Never output <think> or internal reasoning. Only output the final numbered list.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.9,
      max_tokens: 400,
    });

    // Collect the full text
    const text = response.choices?.[0]?.message?.content || "";

    // Remove any <think> blocks
    const cleanText = text.replace(/<think>[\s\S]*?<\/think>/gi, "");

    // Extract numbered lines
    const ideas = (cleanText.match(/^\s*\d+\.\s*(.+)$/gim) || []).map(
      (line) => line.replace(/^\d+\.\s*/, "").trim() // remove any leading "1.", "2.", etc.
    );
    const cleanIdeas = ideas.map((idea) => idea.replace(/^\d+\.\s*/, ""));

    // Take only the first 5
    const firstFive = cleanIdeas.slice(0, 5);

    return new Response(JSON.stringify({ ideas: firstFive }), {
      headers: { ...securityHeaders, ...corsHeaders },
    });
  } catch (err) {
    console.error("API ERROR /api/generate:", err);
    return new Response(JSON.stringify({ error: "Failed to generate ideas" }), {
      status: 500,
      headers: { ...securityHeaders, ...corsHeaders },
    });
  }
}
