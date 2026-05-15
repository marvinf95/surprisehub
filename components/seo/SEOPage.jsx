import styles from './SEOPage.module.css';

const faqStrings = {
  de: [
    {
      question: 'Wie finde ich die perfekte Geschenkidee?',
      answer: 'SurpriseHub nutzt KI, um personalisierte Geschenkideen basierend auf Budget, Anlass und Interessen zu generieren.',
    },
    {
      question: 'Was kostet SurpriseHub?',
      answer: 'SurpriseHub ist kostenlos. Du zahlst nur für die Geschenke, die du findest.',
    },
  ],
  en: [
    {
      question: 'How do I find the perfect gift idea?',
      answer: 'SurpriseHub uses AI to generate personalized gift ideas based on budget, occasion, and interests.',
    },
    {
      question: 'How much does SurpriseHub cost?',
      answer: 'SurpriseHub is free. You only pay for the gifts you find.',
    },
  ],
};

export default function SEOPage({ children, locale = 'de' }) {
  const faqs = faqStrings[locale] ?? faqStrings.de;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SurpriseHub',
    description: locale === 'de'
      ? 'Finde die perfekten Geschenkideen mit KI'
      : 'Find the perfect gift ideas with AI',
    url: 'https://surprisehub.app',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a href="/" className={styles.logo}>🎁 SurpriseHub</a>
          <a href="/" className={styles.ctaButton}>
            {locale === 'de' ? 'Geschenkidee finden' : 'Find a Gift Idea'}
          </a>
        </nav>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2026 SurpriseHub - {locale === 'de' ? 'Die KI für Geschenkideen' : 'AI for Gift Ideas'}</p>
          <nav className={styles.footerLinks}>
            <a href="/">{locale === 'de' ? 'Startseite' : 'Home'}</a>
            <a href="/geschenkidee-fuer-freund-30-euro">{locale === 'de' ? 'Freund Geschenke' : 'Friend Gifts'}</a>
            <a href="/gift-ideas-by-budget">{locale === 'de' ? 'Budget Geschenke' : 'Budget Gifts'}</a>
          </nav>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
