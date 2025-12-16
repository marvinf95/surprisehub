export const metadata = {
  title: 'SurpriseHub',
  description: 'Creative gift ideas generator',
  icons: {
    icon: "surprisehub_logo.svg",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
      </body>
    </html>
  )
}
