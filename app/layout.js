import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "SurpriseHub – AI Gift Ideas",
  description: "Find personalized gift ideas with AI. For every occasion, budget, and person.",
  icons: { icon: "/surprisehub_logo.svg" },
  metadataBase: new URL("https://surprisehub.app"),
  openGraph: {
    title: "SurpriseHub – AI Gift Ideas",
    description: "Find personalized gift ideas with AI. For every occasion, budget, and person.",
    url: "https://surprisehub.app",
    siteName: "SurpriseHub",
    images: [{ url: "/surprisehub_logowithtext.svg", width: 1200, height: 630, alt: "SurpriseHub" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SurpriseHub – AI Gift Ideas",
    description: "Find personalized gift ideas with AI. For every occasion, budget, and person.",
    images: ["/surprisehub_logowithtext.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body
        style={{
          minHeight: "100vh",
          margin: 0,
          fontFamily: "'Arial', sans-serif",
          background: "linear-gradient(135deg, #fdf6e3, #e0f7fa)", // soft gradient
          color: "#2c3e50",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
