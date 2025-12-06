"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    age: "",
    relationship: "",
    budget: "",
    interests: "",
    occasion: "",
  });
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIdeas([]);
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log("Raw data from backend:", data);
      setIdeas(data.ideas || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#2c3e50",
          fontSize: "2.5rem",
        }}
      >
        🎁 SurpriseHub
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "0 auto 2rem auto",
          display: "grid",
          gap: "1rem",
        }}
      >
        {Object.keys(form).map((key) => (
          <div key={key} style={{ display: "flex", flexDirection: "column" }}>
            <label
              style={{
                marginBottom: "0.3rem",
                fontWeight: "bold",
                color: "#34495e",
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>{" "}
            <input
              key={key}
              name={key}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={form[key]}
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
          Generate Ideas{" "}
        </button>
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
              padding: "1rem 1.5rem",
              borderRadius: "12px",
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              fontSize: "1.1rem",
              color: "#2c3e50",
            }}
          >
            {" "}
            <strong>{idx + 1}.</strong> {idea}{" "}
          </div>
        ))}{" "}
        {loading && ( <div style={{ textAlign: "center", padding: "1rem", fontStyle: "italic", color: "#555", }} > Generating ideas… </div> )}
      </div>
    </div>
  );
}
