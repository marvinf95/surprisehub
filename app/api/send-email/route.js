import { Resend } from "resend";

/** @type {import('resend').Resend} */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Escape HTML special characters to prevent XSS
 * @param {unknown} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Validate email address format
 * @param {unknown} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  if (typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400 }
    );
  }

  try {
    const { email, ideas } = body || {};

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Valid email address required" }),
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
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500 }
    );
  }
}