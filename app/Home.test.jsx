import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";

vi.mock("@/lib/i18n", () => ({
  translations: {
    en: {
      subtitle: "Struggling to find the perfect gift? Enter a few details and get personalized ideas instantly.",
      fields: {
        age: "How old is the person?",
        relationship: "Who is the gift for?",
        budget: "What is your budget?",
        interests: "What are the person's interests?",
        occasion: "What is the occasion?"
      }
    },
    de: {
      subtitle: "Haben Sie Schwierigkeiten das perfekte Geschenk zu finden?",
      fields: {
        age: "Wie alt ist die Person?",
        relationship: "Für wen ist das Geschenk?",
        budget: "Was ist Ihr Budget?",
        interests: "Was sind die Interessen der Person?",
        occasion: "Was ist der Anlass?"
      }
    }
  }
}));

vi.mock("@/lib/affiliateLinks");

import Home from "./Home.jsx";

test("renders subtitle", () => {
  render(<Home initialLang="en" />);
  expect(screen.getByText(/Struggling to find/)).toBeDefined();
});

test("switches language via select", () => {
  render(<Home initialLang="en" />);
  const selects = screen.getAllByDisplayValue("EN");  // ← ALLE!
  const select = selects[0];  // ← Ersten nehmen
  fireEvent.change(select, { target: { value: "de" } });
  expect(screen.getByText(/Haben Sie Schwierigkeiten/)).toBeDefined();
});

