import SEOPage from '../../components/seo/SEOPage';
import styles from './page.module.css';

export const metadata = {
  title: 'Personalisierte Geschenkidee | Mit KI maßgeschneidert',
  description: 'Finde personalisierte Geschenkideen, die perfekt zum Beschenkten passen. Unsere KI berücksichtigt Interessen, Budget und Anlass.',
  keywords: ['personalisierte Geschenkidee', 'individuelles Geschenk', 'maßgeschneidertes Geschenk', 'persönliches Geschenk'],
};

export default function PersonalisierteGeschenkidee() {
  return (
    <SEOPage title={metadata.title} description={metadata.description} locale="de">
      <article className={styles.article}>
        <header className={styles.hero}>
          <h1>Personalisierte Geschenkideen ✨</h1>
          <p className={styles.intro}>
            Kein generic Geschenk mehr – unsere <strong>KI erstellt personalisierte Vorschläge</strong>, 
            die genau auf deinen Beschenkten passen. Gib Interessen, Budget und Anlass ein und erhalte 
            einzigartige Ideen.
          </p>
        </header>

        <section className={styles.content}>
          <h2>Was macht ein Geschenk persönlich?</h2>
          <p>
            Ein Geschenk wird persönlich, wenn es zeigt, dass du den Beschenkten wirklich kennst:
          </p>
          <ul>
            <li><strong>Seine Leidenschaften</strong> – Hobbys und Interessen berücksichtigen</li>
            <li><strong>Persönliche Erinnerungen</strong> – gemeinsame Erlebnisse einbinden</li>
            <li><strong>Sein Stil</strong> – Ästhetik und Geschmack respektieren</li>
            <li><strong>Seine Träume</strong> – Wünsche und Ziele kennen</li>
          </ul>

          <h2>Personalisierung nach Anlass</h2>
          <p>
            Jeder Anlass verdient ein angepasstes Geschenk:
          </p>
          <ul>
            <li><strong>Geburtstag</strong> – Persönlichkeit feiern</li>
            <li><strong>Weihnachten</strong> – Familie und Tradition</li>
            <li><strong>Jubiläum</strong> – Meilensteine würdigen</li>
            <li><strong>Abschluss</strong> – Neuanfang unterstützen</li>
          </ul>

          <h2>Personalisierung nach Budget</h2>
          <p>
            Personalisierung heißt nicht teuer – kreativ zählt:
          </p>
          <ul>
            <li><strong>Unter 20€</strong> – Personalisierte Kerzen, Fotokalender</li>
            <li><strong>20-50€</strong> – Graviertes, maßgefertigte Geschenke</li>
            <li><strong>50-100€</strong> – Erlebnisgeschenke, hochwertige Artikel</li>
            <li><strong>Über 100€</strong> – Reisen, Tech-Gadgets, Schmuck</li>
          </ul>

          <div className={styles.cta}>
            <a href="/" className={styles.ctaButton}>
              Jetzt personalisierte Idee finden 🎁
            </a>
          </div>
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3>🎯 Unser Prozess</h3>
            <ul>
              <li>1. Beschreibe den Beschenkten</li>
              <li>2. Wähle Budget und Anlass</li>
              <li>3. Erhalte maßgeschneiderte Ideen</li>
              <li>4. Wähle und schenke</li>
            </ul>
          </div>
        </aside>
      </article>
    </SEOPage>
  );
}