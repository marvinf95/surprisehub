"use client";

import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { translations } from "@/lib/i18n";

export default function Home({ initialLang = "en" }) {
  const [lang, setLang] = useState(initialLang || "en");

  // Optional: beim ersten Client-Render Sprache an Browserpräferenz angleichen
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const browserLang = navigator.language.startsWith("de") ? "de" : "en";
    setLang(browserLang);
    document.cookie = `lang=${browserLang};path=/;SameSite=Lax`;
  }, []);

  const t = translations[lang];

  const locale =
    typeof navigator !== "undefined" ? navigator.language : "en-US";

  function getAmazonDomain() {
    const lang = navigator.language;

    if (lang.startsWith("de")) return "amazon.de";
    if (lang.startsWith("en-GB")) return "amazon.co.uk";
    if (lang.startsWith("us")) return "amazon.com";
    if (lang.startsWith("fr")) return "amazon.fr";
    if (lang.startsWith("it")) return "amazon.it";
    if (lang.startsWith("es")) return "amazon.es";

    return "amazon.com"; // fallback
  }

  function amazonAffiliateLink(idea) {
    const domain = getAmazonDomain();
    const query = encodeURIComponent(idea.toLowerCase().replace(/["']/g, ""));

    const tags = {
      "amazon.de": "surprisehub01-21",
      "amazon.com": "surprisehub0c-20",
      "amazon.co.uk": "surprisehub0d-21",
      "amazon.fr": "surprisehub09-21",
      "amazon.it": "surprisehub0f-21",
      "amazon.es": "surprisehub04-21",
    };

    const tag = tags[domain] || tags["amazon.com"];

    return `https://www.${domain}/s?k=${query}&tag=${tag}`;
  }

  const fieldConfig = [
    { name: "age", labelKey: "age" },
    { name: "relationship", labelKey: "relationship" },
    { name: "budget", labelKey: "budget" },
    { name: "interests", labelKey: "interests" },
    { name: "occasion", labelKey: "occasion" },
  ];

  const [form, setForm] = useState({
    age: "",
    relationship: "",
    budget: "",
    interests: "",
    occasion: "",
  });

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIdeas([]);
    setLoading(true);

    try {
      const cleanedForm = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, v.trim()])
      );

      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ ...cleanedForm, lang }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      // 🚦 Rate limit / Handle backend error
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setIdeas(data.ideas || []);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("SurpriseHub – Gift Ideas", 14, 20);

    doc.setFontSize(12);

    ideas.forEach((idea, index) => {
      doc.text(`${index + 1}. ${idea}`, 14, 35 + index * 10);
    });

    doc.save("surprisehub-gift-ideas.pdf");
  };

  const [copiedIndex, setCopiedIndex] = useState(null);
  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const iconButtonStyle = (bgColor) => ({
    padding: "0.65rem 0.9rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: bgColor,
    color: "white",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: "linear-gradient(135deg, #fdf6e3, #e0f7fa)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {" "}
      <img
        src="/surprisehub_logo.svg"
        alt="SurpriseHub Logo"
        style={{
          width: "90px",
          height: "90px",
          display: "block",
          margin: "0 auto 1.5rem auto",
        }}
      />
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#2c3e50",
          fontSize: "2.5rem",
        }}
      >
        SurpriseHub
      </h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto 2.5rem auto",
          fontSize: "1.1rem",
          color: "#555",
          lineHeight: "1.6",
        }}
      >
        {t.subtitle}
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "0 auto 2rem auto",
          display: "grid",
          gap: "1rem",
        }}
      >
        {fieldConfig.map((field) => (
          <div
            key={field.name}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              style={{
                marginBottom: "0.3rem",
                fontWeight: "bold",
                color: "#34495e",
              }}
            >
              {t.fields[field.labelKey]}
            </label>
            <input
              name={field.name}
              placeholder={t.placeholders?.[field.labelKey]}
              value={form[field.name]}
              onChange={handleChange}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
        ))}{" "}
        <button
          type="submit"
          style={{
            padding: "0.7rem 1.5rem",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#344f5eff")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#074db6ff")
          }
        >
          {" "}
          {t.generate}{" "}
        </button>
        {error && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              borderRadius: "8px",
              backgroundColor: "#fdecea",
              color: "#b71c1c",
              textAlign: "center",
              fontSize: "0.95rem",
            }}
          >
            {error}
          </div>
        )}
      </form>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        {" "}
        {ideas.map((idea, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem 1.5rem",
              borderRadius: "12px",
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            {" "}
            <strong>{idx + 1}.</strong> {idea}{" "}
            <button
              onClick={() => copyToClipboard(idea, idx)}
              title={t.titleCopy}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.2rem",
                color: copiedIndex === idx ? "#2ecc71" : "#7f8c8d",
                transition: "color 0.2s, transform 0.1s",
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.9)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {copiedIndex === idx ? "✅" : "📋"}
            </button>
            <a
              href={amazonAffiliateLink(idea)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: "0.75rem",
                display: "inline-block",
                padding: "0.4rem 0.8rem",
                borderRadius: "6px",
                backgroundColor: "#ff9900",
                color: "#111",
                fontSize: "0.9rem",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              🔍 {t.watchOnAmazon}
            </a>
          </div>
        ))}{" "}
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              fontStyle: "italic",
              color: "#555",
            }}
          >
            {" "}
            {t.generating}
          </div>
        )}
      </div>
      {ideas.length > 0 && (
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <button
              onClick={exportToPDF}
              title={t.titleExportPdf}
              style={iconButtonStyle("#27ae60")}
            >
              {t.exportPdf} 📄
            </button>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "0.65rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "0.95rem",
                minWidth: "200px",
              }}
            />
            <button
              onClick={async () => {
                setSending(true);
                setMailSent(false);

                await fetch("/api/send-email", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, ideas }),
                });

                setSending(false);
                setMailSent(true);

                setTimeout(() => setMailSent(false), 2000);
              }}
              disabled={!email || sending}
              title={t.titleSendMail}
              style={{
                ...iconButtonStyle("#2c3e50"),
                opacity: !email || sending ? 0.5 : 1,
                cursor: !email || sending ? "not-allowed" : "pointer",
              }}
            >
              {sending ? "⏳" : `${t.sendMail}✉️`}
            </button>
          </div>
          {mailSent && (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginTop: "0.5rem",
                fontSize: "0.9rem",
                color: "#27ae60",
              }}
            >
              ✔ {t.emailWasSent}
            </div>
          )}
        </div>
      )}
      <p style={{ fontSize: "0.75rem", opacity: 0.7 }}>*{t.amazonAffiliate}*</p>
    </div>
  );
}
