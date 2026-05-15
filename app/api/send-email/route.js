import { Resend } from "resend";

/** @type {import('resend').Resend} */
const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: { ...securityHeaders, ...corsHeaders },
  });
}

const emailStrings = {
  de: {
    subject: "Deine Geschenkideen von SurpriseHub 🎁",
    heading: "Deine Geschenkideen",
    intro: "Hier sind deine personalisierten Geschenkideen:",
    outro: "Viel Spaß beim Verschenken!",
  },
  en: {
    subject: "Your Gift Ideas from SurpriseHub 🎁",
    heading: "Your Gift Ideas",
    intro: "Here are your personalized gift ideas:",
    outro: "Happy gifting!",
  },
  fr: {
    subject: "Vos idées cadeaux de SurpriseHub 🎁",
    heading: "Vos idées cadeaux",
    intro: "Voici vos idées cadeaux personnalisées :",
    outro: "Bonne chance pour les cadeaux !",
  },
  es: {
    subject: "Tus ideas de regalo de SurpriseHub 🎁",
    heading: "Tus ideas de regalo",
    intro: "Aquí están tus ideas de regalo personalizadas:",
    outro: "¡Buena suerte con los regalos!",
  },
  it: {
    subject: "Le tue idee regalo da SurpriseHub 🎁",
    heading: "Le tue idee regalo",
    intro: "Ecco le tue idee regalo personalizzate:",
    outro: "Buon regalo!",
  },
};

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
      { status: 400, headers: { ...securityHeaders, ...corsHeaders } }
    );
  }

  try {
    const { email, ideas, lang } = body || {};

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Valid email address required" }),
        { status: 400, headers: { ...securityHeaders, ...corsHeaders } }
      );
    }

    if (!ideas?.length) {
      return new Response(
        JSON.stringify({ error: "Missing ideas" }),
        { status: 400, headers: { ...securityHeaders, ...corsHeaders } }
      );
    }

    const sanitizedIdeas = ideas
      .filter((idea) => typeof idea === "string" && idea.trim().length > 0 && idea.length <= 500)
      .slice(0, 20);

    if (sanitizedIdeas.length === 0) {
      return new Response(
        JSON.stringify({ error: "No valid ideas provided" }),
        { status: 400, headers: { ...securityHeaders, ...corsHeaders } }
      );
    }

    const strings = emailStrings[lang] ?? emailStrings.de;
    const htmlIdeas = sanitizedIdeas
      .map((idea) => `<li>${escapeHtml(idea)}</li>`)
      .join("");

    await resend.emails.send({
      from: "SurpriseHub 🎁 <hello@surprisehub.app>",
      to: email,
      subject: strings.subject,
      html: `
        <h2>🎁 ${strings.heading}</h2>
        <p>${strings.intro}</p>
        <ul>${htmlIdeas}</ul>
        <p>${strings.outro} 🎄</p>
        <hr />
        <small>SurpriseHub</small>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...securityHeaders, ...corsHeaders },
    });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500, headers: { ...securityHeaders, ...corsHeaders } }
    );
  }
}