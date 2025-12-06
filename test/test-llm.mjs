import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: "../.env.local" });

if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY missing in .env.local");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function run() {
  console.log("🔍 Raw LLM Output:\n");

  const response = await client.chat.completions.create({
    model: "qwen/qwen3-32b",
    messages: [
      {
        role: "system",
        content:
          "Never output <think> or hidden reasoning. Only output the final answer exactly as requested.",
      },      
      {
        role: "user",
        content: "Generate exactly 5 gift ideas. Number them 1-5.",
      },
    ],
    stream: true,
  });

//  for await (const part of response) {
//    const token = part?.choices?.[0]?.delta?.content || "";
//    process.stdout.write(token);
//  }


  let buffer = "";
  const ideas = [];

for await (const part of response) {
    const token = part?.choices?.[0]?.delta?.content || "";
    buffer += token;

    // Remove <think> blocks dynamically
    buffer = buffer.replace(/<think>[\s\S]*?<\/think>/gi, "");

    // Split into lines
    const lines = buffer.split("\n");
    buffer = lines.pop() || ""; // keep last incomplete line in buffer

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Match numbered items like "1. idea"
      const match = trimmed.match(/^\d+\.\s*(.+)$/);
      if (match) {
        ideas.push(match[1].trim());
        if (ideas.length >= 5) break;
      }
    }

    if (ideas.length >= 5) break;
  }

  // Handle leftover buffer
  const finalLine = buffer.trim().replace(/^\d+\.\s*/, "");
  if (finalLine && ideas.length < 5) {
    ideas.push(finalLine);
  }

  console.log(ideas);

  console.log("\n\n✅ Finished.");
}

run();
