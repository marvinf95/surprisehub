import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req) {
  try {
    const { email, ideas } = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400 }
      );
    }
    
    if (!ideas?.length) {
      return new Response(
        JSON.stringify({ error: "Missing ideas" }),
        { status: 400 }
      );
    }

    const sanitizedIdeas = ideas
      .filter((idea) => typeof idea === "string" && idea.trim().length > 0 && idea.length <= 500)
      .slice(0, 20);

    if (sanitizedIdeas.length === 0) {
      return new Response(
        JSON.stringify({ error: "No valid ideas provided" }),
        { status: 400 }
      );
    }

    const htmlIdeas = sanitizedIdeas
      .map((idea) => `<li>${escapeHtml(idea)}</li>`)
      .join("");

    await resend.emails.send({
      from: "SurpriseHub 🎁 <hello@surprisehub.app>",
      to: email,
      subject: "Deine Geschenkideen von SurpriseHub 🎁",
      html: `
        <h2>🎁 Deine Geschenkideen</h2>
        <p>Hier sind deine personalisierten Geschenkideen:</p>
        <ul>${htmlIdeas}</ul>
        <p>Viel Spaß beim Verschenken! 🎄</p>
        <hr />
        <small>SurpriseHub</small>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}