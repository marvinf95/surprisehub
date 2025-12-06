import OpenAI from "openai";

export const runtime = "edge"; // required for edge runtime

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req) {
  const { age, relationship, budget, interests, occasion } = await req.json();

  const prompt = `
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
            "Never output <think> or internal reasoning. Only output the final numbered list."
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
const ideas = (cleanText.match(/^\s*\d+\.\s*(.+)$/gim) || []).map(line =>
  line.replace(/^\d+\.\s*/, "").trim() // remove any leading "1.", "2.", etc.
);
const cleanIdeas = ideas.map(idea => idea.replace(/^\d+\.\s*/, ""));

// Take only the first 5
const firstFive = cleanIdeas.slice(0, 5);

    return new Response(JSON.stringify({ ideas: firstFive }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
