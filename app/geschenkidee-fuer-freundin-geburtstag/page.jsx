import SEOPage from '../../components/seo/SEOPage';
import styles from './page.module.css';

export const metadata = {
  title: 'Geschenk für Freundin Geburtstag | Kreative Ideen',
  description: 'Die schönsten Geschenkideen zum Geburtstag deiner Freundin. Von kreativ bis klassisch – finde das perfekte Geschenk.',
  keywords: ['Geschenk Freundin Geburtstag', 'Geburtstagsgeschenk beste Freundin', 'Geschenkideen für Frauen', 'Geburtstag Freundin'],
};

export default function GeschenkFreundinGeburtstag() {
  return (
    <SEOPage title={metadata.title} description={metadata.description} locale="de">
      <article className={styles.article}>
        <header className={styles.hero}>
          <h1>Geschenk für Freundin Geburtstag 🎂</h1>
          <p className={styles.intro}>
            Der Geburtstag deiner besten Freundin steht an und du suchst noch nach dem 
            <strong>perfekten Geschenk</strong>? Wir haben die schönsten Ideen gesammelt – 
            von kreativ bis klassisch, für jedes Budget.
          </p>
        </header>

        <section className={styles.content}>
          <h2>Klassiker, die immer funktionieren</h2>
          <p>
            Bewährte Geschenke für die Freundin, die Style und Qualität schätzt:
          </p>
          <ul>
            <li><strong>Spa-Gutschein</strong> – Entspannung vom Alltag</li>
            <li><strong>Hochwertige Düfte</strong> –Parfüm ihrer Lieblingsmarke</li>
            <li><strong>Schmuck</strong> – dezent und elegant</li>
            <li><strong>Designertasche</strong> – wenn das Budget reicht</li>
          </ul>

          <h2>Erlebnisgeschenke für Freundinnen</h2>
          <p>
            Gemeinsame Erlebnisse schweißen zusammen:
          </p>
          <ul>
            <li><strong>Brunch oder Dinner</strong> – reserviertes Restaurant mit Ambiente</li>
            <li><strong>Cocktail-Kurs</strong> – mixen lernen wie ein Profi</li>
            <li><strong>Tanzkurs</strong> – Salsa, Swing oder Standard</li>
            <li><strong>Wellness-Tag</strong> – Massage und Sauna zu zweit</li>
          </ul>

          <h2>Persönliche und selbstgemachte Geschenke</h2>
          <p>
            Selbstgemachtes zeigt, dass du dir wirklich Gedanken machst:
          </p>
          <ul>
            <li><strong>Fotoalbum</strong> – eure besten Erinnerungen</li>
            <li><strong>Spotify Playlist</strong> – "Songs unserer Freundschaft"</li>
            <li><strong>Handgeschriebener Brief</strong> – was sie dir bedeutet</li>
            <li><strong>Picknick-Korb</strong> – selbstgepackt mit Liebe</li>
          </ul>

          <div className={styles.cta}>
            <a href="/" className={styles.ctaButton}>
              Jetzt Geschenkidee finden 🎁
            </a>
          </div>
        </section>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3>💡 Goldene Regeln</h3>
            <ul>
              <li>Lieber durchdacht als teuer</li>
              <li>Erlebnisse schlagen Sachen</li>
              <li>Persönlich trumpft auf</li>
              <li>Frühzeitig planen zahlt sich aus</li>
            </ul>
          </div>
        </aside>
      </article>
    </SEOPage>
  );
}