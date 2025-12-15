import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email, ideas } = await req.json();

    if (!email || !ideas?.length) {
      return new Response(
        JSON.stringify({ error: "Missing email or ideas" }),
        { status: 400 }
      );
    }

    const htmlIdeas = ideas
      .map((idea, i) => `<li>${idea}</li>`)
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