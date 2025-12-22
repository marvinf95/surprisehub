import dotenv from "dotenv";

dotenv.config({ path: "../.env.local" });

async function testBackend() {
const payload = {
age: 30,
relationship: "friend",
budget: 50,
interests: "Fußball, Tech gadgets",
occasion: "Weihnachten"
};

try {
const res = await fetch("http://localhost:3000/api/generate", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload),
});


const text = await res.text();

    console.log("✅ Raw backend output:\n", text);

    // Convert to array of ideas
    const ideas = text
      .split("\n")
      .map(line => line.trim())
      .filter(line => line); // remove empty lines

    console.log("\n✅ Parsed ideas:");
    ideas.forEach((idea, i) => console.log(`${i + 1}. ${idea}`));


} catch (err) {
console.error("❌ Error testing backend:", err);
}
}

testBackend();
