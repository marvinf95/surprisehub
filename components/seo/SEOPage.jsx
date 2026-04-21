'use client';

import { useEffect, useState } from 'react';

export default function SEOPage({ title, description, keywords, children, locale = 'de' }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SurpriseHub',
    description: 'Finde die perfekten Geschenkideen mit KI',
    url: 'https://surprisehub.app',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Wie finde ich die perfekte Geschenkidee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SurpriseHub nutzt KI, um personalisierte Geschenkideen basierend auf Budget, Anlass und Interessen zu generieren.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was kostet SurpriseHub?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SurpriseHub ist kostenlos. Du zahlst nur für die Geschenke, die du findest.',
        },
      },
    ],
  };

  const defaultTitle = locale === 'de' 
    ? 'Geschenkideen mit KI | SurpriseHub'
    : 'AI-Powered Gift Ideas | SurpriseHub';
  
  const defaultDescription = locale === 'de'
    ? 'Finde personalisierte Geschenkideen mit KI. Für jeden Anlass und Budget.'
    : 'Find personalized gift ideas with AI. For every occasion and budget.';

  return (
    <div className="seo-page">
      <header className="seo-header">
        <nav className="seo-nav">
          <a href="/" className="seo-logo">🎁 SurpriseHub</a>
          <a href="/" className="seo-cta-button">
            {locale === 'de' ? 'Geschenkidee finden' : 'Find a Gift Idea'}
          </a>
        </nav>
      </header>

      <main className="seo-main">
        {children}
      </main>

      <footer className="seo-footer">
        <div className="seo-footer-content">
          <p>© 2026 SurpriseHub - {locale === 'de' ? 'Die KI für Geschenkideen' : 'AI for Gift Ideas'}</p>
          <nav className="seo-footer-links">
            <a href="/">{locale === 'de' ? 'Startseite' : 'Home'}</a>
            <a href="/geschenkidee-fuer-freund-30-euro">{locale === 'de' ? 'Freund Geschenke' : 'Friend Gifts'}</a>
            <a href="/gift-ideas-by-budget">{locale === 'de' ? 'Budget Geschenke' : 'Budget Gifts'}</a>
          </nav>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <style jsx>{`
        .seo-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: system-ui, -apple-system, sans-serif;
          line-height: 1.6;
        }

        .seo-header {
          padding: 1rem 2rem;
          border-bottom: 1px solid #e5e7eb;
          background: white;
        }

        .seo-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .seo-logo {
          font-size: 1.5rem;
          font-weight: bold;
          text-decoration: none;
          color: #7c3aed;
        }

        .seo-cta-button {
          background: #7c3aed;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.2s;
        }

        .seo-cta-button:hover {
          background: #6d28d9;
        }

        .seo-main {
          flex: 1;
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem 1.5rem;
          width: 100%;
        }

        .seo-footer {
          background: #f9fafb;
          padding: 2rem;
          margin-top: auto;
        }

        .seo-footer-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          color: #6b7280;
        }

        .seo-footer-links {
          margin-top: 1rem;
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .seo-footer-links a {
          color: #7c3aed;
          text-decoration: none;
        }

        .seo-footer-links a:hover {
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .seo-header {
            padding: 1rem;
          }
          .seo-main {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}