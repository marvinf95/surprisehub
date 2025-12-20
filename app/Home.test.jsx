import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@/lib/i18n", () => ({
  translations: {
    en: { 
      subtitle: "English subtitle",
      fields: { age: "Age", relationship: "Relationship" }
    },
    de: { 
      subtitle: "Deutscher Subtitle",
      fields: { age: "Alter", relationship: "Beziehung" }
    },
  },
}));

vi.mock("@/lib/affiliateLinks", () => ({
  amazonAffiliateLink: vi.fn(() => "https://amazon.de/test"),
}));

const TestWrapper = ({ children }) => (
  <div>{children}</div>
);

import Home from "./Home.jsx";

describe("Home", () => {
  it("renders subtitle in initial language", () => {
    render(<TestWrapper><Home initialLang="en" /></TestWrapper>);
    expect(screen.getByText("English subtitle")).toBeInTheDocument();
  });

  it("switches language via select", () => {
    render(<TestWrapper><Home initialLang="en" /></TestWrapper>);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "de" } });

    expect(screen.getByText("Deutscher Subtitle")).toBeInTheDocument();
  });
});
